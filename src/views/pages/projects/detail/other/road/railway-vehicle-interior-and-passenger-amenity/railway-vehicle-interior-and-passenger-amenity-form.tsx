import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayVehicleIdentification, RailwayVehicleInteriorAndPassengerAmenity } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayVehicleInteriorAndPassengerAmenityFormProps {
  formik: FormikProps<RailwayVehicleInteriorAndPassengerAmenity>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayVehicleInteriorAndPassengerAmenityForm: React.FC<RailwayVehicleInteriorAndPassengerAmenityFormProps> = ({
  formik,
  defaultFile,
  onDefaultFileChange
}) => {
  const { t } = useTranslation();

  const { data: vehicleIdentifications } = useQuery({
    queryKey: ['vehicle-identifications'],
    queryFn: () => projectOtherApiSecondService<RailwayVehicleIdentification>().getAll('railway-vehicle-identifications', dropDownConfig())
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-vehicle-specification.details.railway_vehicle_identification_id')}
          name="railway_vehicle_identification_id"
          options={
            vehicleIdentifications?.payload.map((item) => ({
              label: item.vehicle_type + ' - ' + item.manufacturer_supplier_name + ' - ' + item.manufacture_year,
              value: item.id
            })) || []
          }
          value={formik.values.railway_vehicle_identification_id}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-interior-and-passenger-amenity.details.seating_capacity')}
          placeholder="e.g. 150"
          name="seating_capacity"
          value={formik.values.seating_capacity}
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-interior-and-passenger-amenity.details.passenger_amenities_availability')}
          placeholder="e.g. Wi-Fi, power outlets, dining area"
          name="passenger_amenities_availability"
          value={formik.values.passenger_amenities_availability}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomSwitch
          label={t(
            'project.other.railway-vehicle-interior-and-passenger-amenity.details.accessibility_features_for_passengers_with_disabilities'
          )}
          name="accessibility_features_for_passengers_with_disabilities"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-interior-and-passenger-amenity.details.remark')}
          placeholder={t('common.form.remark-placeholder')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.interior-amenity-document-upload')} file={defaultFile} onFileChange={onDefaultFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayVehicleInteriorAndPassengerAmenityForm;
