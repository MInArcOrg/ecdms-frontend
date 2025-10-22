// src/views/project/other/railway-maintenance-facility-infrastructure-and-utility/railway-maintenance-facility-infrastructure-and-utility-form.tsx

import { Grid, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayMaintenanceFacilityInfrastructureAndUtility } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomSwitch from 'src/views/shared/form/custom-switch';


interface RailwayMaintenanceFacilityInfrastructureAndUtilityFormProps {
  formik: FormikProps<RailwayMaintenanceFacilityInfrastructureAndUtility>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayMaintenanceFacilityInfrastructureAndUtilityForm: React.FC<RailwayMaintenanceFacilityInfrastructureAndUtilityFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Locale keys for fields - will be used for both label and placeholder
  const FACILITY_NAME_KEY = 'project.other.railway-maintenance-facility-infrastructure-and-utilities.details.facility-name';
  const RAIL_TRACKS_KEY = 'project.other.railway-maintenance-facility-infrastructure-and-utilities.details.rail-tracks-and-turnout-availability';
  const FUELING_KEY = 'project.other.railway-maintenance-facility-infrastructure-and-utilities.details.fueling-and-refueling-facility-availability';
  const AIR_SYSTEM_KEY = 'project.other.railway-maintenance-facility-infrastructure-and-utilities.details.compressed-air-system-availability';
  const REMARKS_KEY = 'project.other.railway-maintenance-facility-infrastructure-and-utilities.details.remarks';


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. facility_name (String Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          required
          label={t(FACILITY_NAME_KEY)}
          placeholder={t(FACILITY_NAME_KEY)}
          name="facility_name"
          value={formik.values.facility_name}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 2. rail_tracks_and_turnout_availability (Boolean Checkbox) */}
        <CustomSwitch
          label={t(RAIL_TRACKS_KEY)}
          name="rail_tracks_and_turnout_availability"
          checked={formik.values.rail_tracks_and_turnout_availability}
          sx={{ mb: 2 }}
        />

        {/* 3. fueling_and_refueling_facility_availability (Boolean Checkbox) */}
        <CustomSwitch
          label={t(FUELING_KEY)}
          name="fueling_and_refueling_facility_availability"
          checked={formik.values.fueling_and_refueling_facility_availability}
          sx={{ mb: 2 }}
        />

        {/* 4. compressed_air_system_availability (Boolean Checkbox) */}
        <CustomSwitch
          label={t(AIR_SYSTEM_KEY)}
          name="compressed_air_system_availability"
          checked={formik.values.compressed_air_system_availability}
          sx={{ mb: 2 }}
        />

        {/* 5. remarks (Text Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          label={t(REMARKS_KEY)}
          placeholder={t(REMARKS_KEY)}
          name="remarks"
          value={formik.values.remarks}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>{t("common.form.attachment")}</Typography>

        {/* File Uploads */}
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

export default RailwayMaintenanceFacilityInfrastructureAndUtilityForm;