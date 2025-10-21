import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query'; // Keeping useQuery for potential dropdowns
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { GeneralMaster } from 'src/types/general/general-master';
import type { RailwayPowerSupplyConfiguration, } from 'src/types/project/other'; // Using a placeholder type for the FK
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayPowerSupplyConfigurationFormProps {
  formik: FormikProps<RailwayPowerSupplyConfiguration>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayPowerSupplyConfigurationForm: React.FC<RailwayPowerSupplyConfigurationFormProps> = ({
  formik,
  defaultFile,
  onDefaultFileChange
}) => {
  const { t } = useTranslation();

  // Assuming 'PowerSupplySystemType' is a lookup entity for the required FK
  const { data: powerSupplySystemTypes } = useQuery({
    queryKey: ['power-supply-system-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig(
        {
          filter: {
            model: projectMasterModels.powerSupplySystemType.model
          }
        }
      ))
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. power_supply_system_type_id (Required FK) */}
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-power-supply-configuration.details.power_supply_system_type_id')}
          name="power_supply_system_type_id"
          options={
            powerSupplySystemTypes?.payload.map((item) => ({
              label: item.title,
              value: item.id
            })) || []
          }
          value={formik.values.power_supply_system_type_id}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 2. voltage_level_and_frequency */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-supply-configuration.details.voltage_level_and_frequency')}
          placeholder="e.g. 25 kV AC, 50 Hz"
          name="voltage_level_and_frequency"
          value={formik.values.voltage_level_and_frequency}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 3. power_supply_capacity_and_load_requirements (Multiline Text) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-supply-configuration.details.power_supply_capacity_and_load_requirements')}
          placeholder="e.g. Total capacity 50 MVA, peak load 40 MVA"
          name="power_supply_capacity_and_load_requirements"
          value={formik.values.power_supply_capacity_and_load_requirements}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        {/* 4. remark (Multiline Text) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-supply-configuration.details.remark')}
          placeholder={t('common.form.remark-placeholder')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />
      </Grid>

      {/* File Attachment */}
      <Grid item xs={12}>
        <CustomFileUpload
          label={t('common.form.file-upload')}
          file={defaultFile}
          onFileChange={onDefaultFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayPowerSupplyConfigurationForm;