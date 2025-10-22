// src/views/project/other/railway-maintenance-facility-equipment-and-tool/railway-maintenance-facility-equipment-and-tool-form.tsx

import { Grid, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayMaintenanceFacilityEquipmentAndTool } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomSwitch from 'src/views/shared/form/custom-switch';


interface RailwayMaintenanceFacilityEquipmentAndToolFormProps {
  formik: FormikProps<RailwayMaintenanceFacilityEquipmentAndTool>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayMaintenanceFacilityEquipmentAndToolForm: React.FC<RailwayMaintenanceFacilityEquipmentAndToolFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Locale keys for fields
  const FACILITY_NAME_KEY = 'project.other.railway-maintenance-facility-equipment-and-tool.details.facility-name';
  const AVAILABLE_TYPES_KEY = 'project.other.railway-maintenance-facility-equipment-and-tool.details.maintenance-equipment-and-tool-available-type';
  const DIAGNOSTIC_EQUIPMENT_KEY = 'project.other.railway-maintenance-facility-equipment-and-tool.details.diagnostic-and-testing-equipment';
  const SPECIFIC_TOOLS_KEY = 'project.other.railway-maintenance-facility-equipment-and-tool.details.tools-and-machinery-specific-to-maintenance-activities';
  const REMARK_KEY = 'project.other.railway-maintenance-facility-equipment-and-tool.details.remark';
  const HOISTS_CRANES_KEY = 'project.other.railway-maintenance-facility-equipment-and-tool.details.hoists-cranes-and-lifting-equipment';


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. facility_name (String Field) */}
        <CustomTextBox
          fullWidth
          required
          label={t(FACILITY_NAME_KEY)}
          placeholder={t(FACILITY_NAME_KEY)} // Applied New Convention
          name="facility_name"
          value={formik.values.facility_name}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 2. maintenance_equipment_and_tool_available_type (String Field) */}
        <CustomTextBox
          fullWidth
          label={t(AVAILABLE_TYPES_KEY)}
          placeholder={t(AVAILABLE_TYPES_KEY)} // Applied New Convention
          name="maintenance_equipment_and_tool_available_type"
          value={formik.values.maintenance_equipment_and_tool_available_type}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 3. hoists_cranes_and_lifting_equipment (Boolean Checkbox) */}
        <CustomSwitch
          label={t(HOISTS_CRANES_KEY)}
          name="hoists_cranes_and_lifting_equipment"
          sx={{ mb: 2 }}
        />

        {/* 4. diagnostic_and_testing_equipment (String Field) */}
        <CustomTextBox
          fullWidth
          label={t(DIAGNOSTIC_EQUIPMENT_KEY)}
          placeholder={t(DIAGNOSTIC_EQUIPMENT_KEY)} // Applied New Convention
          name="diagnostic_and_testing_equipment"
          value={formik.values.diagnostic_and_testing_equipment}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 5. tools_and_machinery_specific_to_maintenance_activities (String Field) */}
        <CustomTextBox
          fullWidth
          label={t(SPECIFIC_TOOLS_KEY)}
          placeholder={t(SPECIFIC_TOOLS_KEY)} // Applied New Convention
          name="tools_and_machinery_specific_to_maintenance_activities"
          value={formik.values.tools_and_machinery_specific_to_maintenance_activities}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 6. remark (Text Field) */}
        <CustomTextBox
          fullWidth
          label={t(REMARK_KEY)}
          placeholder={t(REMARK_KEY)} // Applied New Convention (As requested for consistency)
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>{t("common.form.attachment")}</Typography>

        {/* Dynamic File Uploads (Only one in this case) */}
        {fileTypesConfig.map((fileConfig) => (
          <CustomFileUpload
            key={fileConfig.key}
            label={t(fileConfig.titleTKey)}
            file={fileStates[fileConfig.key]}
            onFileChange={(file) => onFileChange(fileConfig.key, file)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default RailwayMaintenanceFacilityEquipmentAndToolForm;