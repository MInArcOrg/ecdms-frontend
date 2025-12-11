import React, { useEffect } from 'react';
import { Box, Grid, FormControl, FormLabel, FormHelperText } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { AddressType } from 'src/types/admin/address';
import Address from 'src/types/general/address';
import addressApiService from 'src/services/general/address-service';
import { dropDownConfig } from 'src/configs/api-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import addressmasterApiService from 'src/services/admin/address-master-service';

interface AddressFormProps {
  formik: FormikProps<Address>;
}

  type AddressOption = {
  value: string;
  label: string;
};
// Helper to fetch data
const useAddressData = (type: AddressType, parentId?: string): AddressOption[] => {
  const { data } = useQuery({
    queryKey: ['address-data', type, parentId],
    queryFn: () =>
      addressmasterApiService.getAll(
        dropDownConfig({
          filter: {
            type: type,
            // Only send parent_address_id if we have a valid parentId
            ...(parentId ? { parent_address_id: parentId } : {}),
          },
        })
      ),
    // Query is disabled if we need a parentId but don't have one
    enabled: type === AddressType.COUNTRY || (!!parentId && parentId !== ''),
    staleTime: 5 * 60 * 1000, // Cache for 5 mins
  });

  return (
    data?.payload?.map((item: any) => ({
      value: item.id,
      label: item.title,
    })) || []
  );
};

const AddressForm: React.FC<AddressFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();
  const { values, setFieldValue, touched, errors } = formik;

  // --- 1. Determine Parent Logic (Based on your addressTypes) ---
  
  // Sub City can belong to a City OR a City Administration (e.g., Addis Ababa -> Bole)
  const subCityParentId = values.city || values.city_administration;

  // Woreda can belong to a Sub City OR a Zone (Rural path)
  const woredaParentId = values.subcity || values.zone;

  // City can belong to a Zone OR a Region
  const cityParentId = values.zone || values.region;

  // --- 2. Fetch Data ---

  // Level 1: Country
  const countries = useAddressData(AddressType.COUNTRY);

  // Level 2: Region AND City Administration (Siblings)
  const regions = useAddressData(AddressType.REGION, values.country);
  const cityAdmins = useAddressData(AddressType.CITY_ADMINISTRATION, values.country);

  // Level 3: Zone (Child of Region)
  const zones = useAddressData(AddressType.ZONE, values.region);

  // Level 3/4: City (Child of Zone or Region)
  const cities = useAddressData(AddressType.CITY, cityParentId);

  // Level 4/5: Sub City (Child of City or City Admin)
  const subcities = useAddressData(AddressType.SUB_CITY, subCityParentId);

  // Level 5/6: Woreda & Kebele
  const woredas = useAddressData(AddressType.WOREDA, woredaParentId);

  // --- 3. Dependency Management (Auto-clearing) ---

  const resetFields = (fields: (keyof Address)[]) => {
    fields.forEach((f) => setFieldValue(f, ''));
  };

  // When Country changes, reset everything
  useEffect(() => {
    resetFields(['region', 'city_administration', 'zone', 'city', 'subcity', 'woreda', 'kebele']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.country]);

  // When Region is selected, clear City Admin (Mutually Exclusive) and children
  useEffect(() => {
    if (values.region) {
      resetFields(['city_administration']); 
      // Also reset children of the new region to force re-selection
      resetFields(['zone', 'city', 'subcity', 'woreda', 'kebele']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.region]);

  // When City Admin is selected, clear Region (Mutually Exclusive) and its specific children
  useEffect(() => {
    if (values.city_administration) {
      resetFields(['region', 'zone', 'city']); // City Admin goes straight to Sub City
      resetFields(['subcity', 'woreda', 'kebele']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.city_administration]);

  return (
    <>
      {/* --- COUNTRY --- */}
      <Box mb={2}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <CustomSelectBox
            options={countries}
            fullWidth
            name="country"
            label={transl('address.form.country')}
            size="small"
            disableClearable
          />
          {touched.country && errors.country && <FormHelperText error>{errors.country}</FormHelperText>}
        </FormControl>
      </Box>

      <Grid container columnSpacing={5} rowSpacing={3}>
        
        {/* --- REGION --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={regions}
            fullWidth
            label={transl('address.form.state-region')}
            placeholder={transl('address.form.state-region')}
            name="region"
            size="small"
            sx={{ mb: 2 }}
            // Disable if City Admin is selected
            disabled={!values.country || !!values.city_administration}
          />
        </Grid>

        {/* --- CITY ADMINISTRATION (Added Here) --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={cityAdmins}
            fullWidth
            label={transl('address.form.city_administration')} // Make sure you have this key in translations
            placeholder={transl('address.form.city_administration')}
            name="city_administration"
            size="small"
            sx={{ mb: 2 }}
            // Disable if Region is selected
            disabled={!values.country || !!values.region}
          />
        </Grid>

        {/* --- ZONE --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={zones}
            fullWidth
            label={transl('address.form.zone')}
            name="zone"
            size="small"
            sx={{ mb: 2 }}
            // Zone only exists under Region
            disabled={!values.region || zones.length === 0}
          />
        </Grid>

        {/* --- CITY --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={cities}
            fullWidth
            label={transl('address.form.city')}
            name="city"
            size="small"
            sx={{ mb: 2 }}
            // City needs Region OR Zone. It does NOT belong to City Admin.
            disabled={(!values.zone && !values.region) || cities.length === 0}
          />
        </Grid>

        {/* --- SUB CITY --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={subcities}
            fullWidth
            label={transl('address.form.subcity')}
            name="subcity"
            size="small"
            sx={{ mb: 2 }}
            // Sub City needs City OR City Admin
            disabled={(!values.city && !values.city_administration) || subcities.length === 0}
          />
        </Grid>

        {/* --- WOREDA --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={woredas}
            fullWidth
            label={transl('address.form.woreda')}
            name="woreda"
            size="small"
            sx={{ mb: 2 }}
            disabled={(!values.subcity && !values.zone) || woredas.length === 0}
          />
        </Grid>

        {/* --- KEBELE --- */}
        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('address.form.kebele')}
            name="kebele"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* --- TEXT INPUTS --- */}
        <Grid item xs={6}>
          <CustomTextBox fullWidth label={transl('address.form.street')} name="street" size="small" />
        </Grid>
     
         <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('address.form.northing')}
            name="northing"
            type='number'
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('address.form.easting')}
            name="easting"
            type='number'
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;