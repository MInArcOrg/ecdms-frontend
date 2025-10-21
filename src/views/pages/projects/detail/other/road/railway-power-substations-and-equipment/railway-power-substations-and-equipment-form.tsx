import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSubstationAndEquipment, RailwayStationPlatformLayout } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayPowerSubstationAndEquipmentFormProps {
  formik: FormikProps<RailwayPowerSubstationAndEquipment>;
  // Default file upload (RAILWAY_POWER_SUBSTATION_AND_EQUIPMENT)
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
  // Secondary/Additional file upload (TRANSFORMER_SWITCHGEAR_OTHER_COMPONENT_FILE) - Renamed
  transformerSwitchgearFile: File | null;
  onTransformerSwitchgearFileChange: (file: File | null) => void;
}

const RailwayPowerSubstationAndEquipmentForm: React.FC<RailwayPowerSubstationAndEquipmentFormProps> = ({
  formik,
  defaultFile,
  onDefaultFileChange,
  transformerSwitchgearFile, // <--- Renamed prop
  onTransformerSwitchgearFileChange // <--- Renamed handler
}) => {
  const { t } = useTranslation();

  const { data: platformIdentifications } = useQuery({
    queryKey: ['platform-identifications'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-power-substations-and-equipment.details.railway_station_platform_layout_id')}
          name="railway_station_platform_layout_id"
          options={
            platformIdentifications?.payload.map((item) => ({
              label: item.name,
              value: item.id
            })) || []
          }
          value={formik.values.railway_station_platform_layout_id}
          size="small"
          sx={{ mb: 2 }}
        />


        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-substations-and-equipment.details.substation_capacity_and_equipment_specifications')}
          placeholder="e.g. 10MW capacity, ABB switchgear model X"
          name="substation_capacity_and_equipment_specifications"
          value={formik.values.substation_capacity_and_equipment_specifications}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-substations-and-equipment.details.remark')}
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
        <Typography variant="h6" gutterBottom>
          {t("common.form.attachment")}
        </Typography>

        {/* 1. Default File (RAILWAY_POWER_SUBSTATION_AND_EQUIPMENT) */}
        <CustomFileUpload
          label={t('common.form.file-upload')}
          file={defaultFile}
          onFileChange={onDefaultFileChange}
        />

        {/* 2. Additional File (TRANSFORMER_SWITCHGEAR_OTHER_COMPONENT_FILE) */}
        <CustomFileUpload
          label={t('project.other.railway-power-substations-and-equipment.details.transformer-component-document-upload')}
          file={transformerSwitchgearFile}
          onFileChange={onTransformerSwitchgearFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayPowerSubstationAndEquipmentForm;