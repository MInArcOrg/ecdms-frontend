import React, { useEffect } from 'react';
import { Box, Grid, FormControl, FormLabel, FormHelperText } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { AddressType } from 'src/types/admin/address';
import Address from 'src/types/general/address';
import addressApiService from 'src/services/general/address-service';
import { dropDownConfig } from 'src/configs/api-constants';
import countriesList from 'src/constants/countries';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import addressmasterApiService from 'src/services/admin/address-master-service';

// --- Types & Interfaces ---

interface AddressFormProps {
  formik: FormikProps<Address>;
}

type AddressOption = {
  value: string;
  label: string;
};

// --- Helper Hook ---

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

  // --- 1. Determine Parent IDs (Priority Logic) ---
  // Based on your addressTypes config, some fields have multiple possible parents.
  // We prioritize the most specific parent (e.g., Zone over Region).

  // City: Parent is [ZONE, REGION]
  const cityParentId = values.zone || values.region;

  // Sub City: Parent is [CITY, CITY_ADMINISTRATION]
  const subCityParentId = values.city || values.city_administration;

  // Woreda: Parent is [SUB_CITY, ZONE] (Urban vs Rural path)
  const woredaParentId = values.subcity || values.zone;

  // Kebele: Parent is [WOREDA]
  const kebeleParentId = values.woreda;

  // --- 2. Fetch Data ---

  // Level 1
  const countryOptions = useAddressData(AddressType.COUNTRY);

  // Level 2 (Branch Split)
  const regions = useAddressData(AddressType.REGION, values.country);
  const cityAdmins = useAddressData(AddressType.CITY_ADMINISTRATION, values.country);

  // Level 3
  const zones = useAddressData(AddressType.ZONE, values.region);

  // Level 3/4 (Dynamic Parent)
  const cities = useAddressData(AddressType.CITY, cityParentId);

  // Level 4/5
  const subcities = useAddressData(AddressType.SUB_CITY, subCityParentId);

  // Level 5/6
  const woredas = useAddressData(AddressType.WOREDA, woredaParentId);
  const kebeles = useAddressData(AddressType.KEBELE, kebeleParentId);

  // --- 3. Manage Dependencies & Resets ---

  // Helper to reset fields
  const resetFields = (fields: string[]) => {
    fields.forEach((field) => setFieldValue(field, ''));
  };

  // Watch: Country change
  useEffect(() => {
    resetFields(['region', 'city_administration', 'zone', 'city', 'subcity', 'woreda', 'kebele']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.country]);

  // Watch: Mutual Exclusivity (Region vs City Admin)
  // If user picks City Admin, clear Region branch
  useEffect(() => {
    if (values.city_administration) {
      resetFields(['region', 'zone', 'city']); // Clear conflicting path
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.city_administration]);

  // If user picks Region, clear City Admin branch
  useEffect(() => {
    if (values.region) {
      resetFields(['city_administration']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.region]);

  // Watch: Region change (Reset children)
  useEffect(() => {
    resetFields(['zone', 'city', 'subcity', 'woreda', 'kebele']);
  }, [values.region]);

  // Watch: Zone change
  useEffect(() => {
    resetFields(['city', 'woreda', 'kebele']);
    // Note: We don't clear subcity here immediately because Zone -> Woreda is valid
  }, [values.zone]);

  return (
    <>
      {/* --- COUNTRY --- */}
      <Box mb={2}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <CustomSelectBox
            options={countryOptions}
            name="country"
            label={transl('address.form.country')}
            placeholder={transl('address.form.country')}
            size="small"
            disableClearable
          />
          {touched.country && errors.country && <FormHelperText error>{errors.country}</FormHelperText>}
        </FormControl>
      </Box>

      <Grid container columnSpacing={5} rowSpacing={3}>

        {/* --- LEVEL 2: REGION vs CITY ADMIN --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={regions}
            fullWidth
            label={transl('address.form.state-region')}
            placeholder={transl('address.form.state-region')}
            name="region"
            size="small"
            sx={{ mb: 2 }}
            // Disable if City Admin is selected to enforce one path
            disabled={!values.country || !!values.city_administration}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomSelectBox
            options={cityAdmins}
            fullWidth
            label={transl('address.form.city_administration')}
            placeholder={transl('address.form.city_administration')}
            name="city_administration"
            size="small"
            sx={{ mb: 2 }}
            // Disable if Region is selected
            disabled={!values.country || !!values.region}
          />
        </Grid>

        {/* --- LEVEL 3: ZONE (Only if Region selected) --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={zones}
            fullWidth
            label={transl('address.form.zone')}
            placeholder={transl('address.form.zone')}
            name="zone"
            size="small"
            sx={{ mb: 2 }}
            disabled={!values.region || zones.length === 0}
          />
        </Grid>

        {/* --- CITY (Depends on Zone OR Region) --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={cities}
            fullWidth
            label={transl('address.form.city')}
            placeholder={transl('address.form.city')}
            name="city"
            size="small"
            sx={{ mb: 2 }}
            // Disabled if no parent available (Neither Zone nor Region)
            disabled={(!values.zone && !values.region) || cities.length === 0}
          />
        </Grid>

        {/* --- SUB CITY (Depends on City OR City Admin) --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={subcities}
            fullWidth
            label={transl('address.form.subcity')}
            placeholder={transl('address.form.subcity')}
            name="subcity"
            size="small"
            sx={{ mb: 2 }}
            disabled={(!values.city && !values.city_administration) || subcities.length === 0}
          />
        </Grid>

        {/* --- WOREDA (Depends on SubCity OR Zone) --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={woredas}
            fullWidth
            label={transl('address.form.woreda')}
            placeholder={transl('address.form.woreda')}
            name="woreda"
            size="small"
            sx={{ mb: 2 }}
            disabled={(!values.subcity && !values.zone) || woredas.length === 0}
          />
        </Grid>

        {/* --- KEBELE (Depends on Woreda) --- */}
        <Grid item xs={6}>
          <CustomSelectBox
            options={kebeles}
            fullWidth
            label={transl('address.form.kebele')}
            placeholder={transl('address.form.kebele')}
            name="kebele"
            size="small"
            sx={{ mb: 2 }}
            disabled={!values.woreda || kebeles.length === 0}
          />
        </Grid>

        {/* --- TEXT INPUTS --- */}
        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('address.form.street')}
            name="street"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('address.form.house_number')}
            name="house_number"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('address.form.block_number')}
            name="block_number"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('address.form.northing')}
            name="northing"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('address.form.easting')}
            name="easting"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;