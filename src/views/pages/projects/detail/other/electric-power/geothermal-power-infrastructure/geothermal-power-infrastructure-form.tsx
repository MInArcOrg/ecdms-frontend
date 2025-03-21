import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { GeothermalPowerInfrastructure } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface GeothermalPowerInfrastructureFormProps {
  formik: FormikProps<GeothermalPowerInfrastructure>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const GeothermalPowerInfrastructureForm: React.FC<GeothermalPowerInfrastructureFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  const { data: turbineTypes } = useQuery({
    queryKey: ['turbine-type', projectMasterModels.turbinType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.turbinType.model
          }
        })
      )
  });
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-infrastructure.details.turbine-type-id')}
          placeholder={transl('project.other.geothermal-power-infrastructure.details.turbine-type-id')}
          name="turbine_type_id"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-infrastructure.details.turbine-manufacturer')}
          placeholder={transl('project.other.geothermal-power-infrastructure.details.turbine-manufacturer')}
          name="turbine_manufacturer"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-infrastructure.details.turbine-model')}
          placeholder={transl('project.other.geothermal-power-infrastructure.details.turbine-model')}
          name="turbine_model"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-infrastructure.details.turbine-type-id')}
          placeholder={transl('project.other.geothermal-power-infrastructure.details.turbine-type-id')}
          name="turbine_type_id"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-infrastructure.details.each-turbine-capacity')}
          placeholder={transl('project.other.geothermal-power-infrastructure.details.each-turbine-capacity')}
          name="each_turbine_capacity"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-infrastructure.details.remark')}
          placeholder={transl('project.other.geothermal-power-infrastructure.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default GeothermalPowerInfrastructureForm;
