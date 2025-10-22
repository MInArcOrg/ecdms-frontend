// src/views/project/other/railway-maintenance-facility-layout-and-design/railway-maintenance-facility-layout-and-design-form.tsx

import { Grid, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayMaintenanceFacilityLayoutAndDesign } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomSwitch from 'src/views/shared/form/custom-switch';


interface RailwayMaintenanceFacilityLayoutAndDesignFormProps {
  formik: FormikProps<RailwayMaintenanceFacilityLayoutAndDesign>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayMaintenanceFacilityLayoutAndDesignForm: React.FC<RailwayMaintenanceFacilityLayoutAndDesignFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. facility_name (String Field) */}
        <CustomTextBox
          fullWidth
          required
          label={t('project.other.railway-maintenance-facility-layout-and-design.details.facility-name')}
          placeholder={t('common.form.facility-name-placeholder')}
          name="facility_name"
          value={formik.values.facility_name}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 2. facility_layout_and_dimension (Text Field) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-maintenance-facility-layout-and-design.details.facility-layout-and-dimension')}
          placeholder={t('project.other.railway-maintenance-facility-layout-and-design.details.facility-layout-and-dimension')}
          name="facility_layout_and_dimension"
          value={formik.values.facility_layout_and_dimension}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        {/* 3. maintenance_bays_number_and_size (String Field) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-maintenance-facility-layout-and-design.details.maintenance-bays-number-and-size')}
          placeholder={t('project.other.railway-maintenance-facility-layout-and-design.details.maintenance-bays-number-and-size')}
          name="maintenance_bays_number_and_size"
          value={formik.values.maintenance_bays_number_and_size}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 4. spare_parts_and_equipment_storage_areas (String Field) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-maintenance-facility-layout-and-design.details.spare-parts-and-equipment-storage-areas')}
          placeholder={t('project.other.railway-maintenance-facility-layout-and-design.details.spare-parts-and-equipment-storage-areas')}
          name="spare_parts_and_equipment_storage_areas"
          value={formik.values.spare_parts_and_equipment_storage_areas}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 5. office_and_administrative_areas_availability (Boolean Checkbox) */}
        <CustomSwitch
          label={t('project.other.railway-maintenance-facility-layout-and-design.details.office-and-administrative-areas-availability')}
          name="office_and_administrative_areas_availability"
          sx={{ mb: 2 }}
        />

        {/* 6. remark (Text Field) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-maintenance-facility-layout-and-design.details.remark')}
          placeholder={t('project.other.railway-maintenance-facility-layout-and-design.details.remark')}
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

export default RailwayMaintenanceFacilityLayoutAndDesignForm;