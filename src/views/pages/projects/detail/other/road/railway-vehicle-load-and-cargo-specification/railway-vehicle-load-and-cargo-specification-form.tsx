import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayVehicleIdentification, RailwayVehicleLoadAndCargoSpecification } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayVehicleLoadAndCargoSpecificationFormProps {
  formik: FormikProps<RailwayVehicleLoadAndCargoSpecification>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayVehicleLoadAndCargoSpecificationForm: React.FC<RailwayVehicleLoadAndCargoSpecificationFormProps> = ({
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
          label={t('project.other.railway-vehicle-load-and-cargo-specification.details.railway_vehicle_identification_id')}
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
          label={t('project.other.railway-vehicle-load-and-cargo-specification.details.load_capacity_and_weight_limits')}
          placeholder="e.g. Max load 80 tons, even distribution"
          name="load_capacity_and_weight_limits"
          value={formik.values.load_capacity_and_weight_limits}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-load-and-cargo-specification.details.cargo_restrictions_or_special_requirements')}
          placeholder="e.g. No hazardous materials, must be secured with 4 straps"
          name="cargo_restrictions_or_special_requirements"
          value={formik.values.cargo_restrictions_or_special_requirements}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomSwitch
          label={t('project.other.railway-vehicle-load-and-cargo-specification.details.coupling_and_uncoupling_procedures')}
          name="coupling_and_uncoupling_procedures"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-vehicle-load-and-cargo-specification.details.remark')}
          placeholder={t('common.form.remark-placeholder')}
          name="project.other.railway-vehicle-load-and-cargo-specification.details.remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={defaultFile} onFileChange={onDefaultFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayVehicleLoadAndCargoSpecificationForm;
