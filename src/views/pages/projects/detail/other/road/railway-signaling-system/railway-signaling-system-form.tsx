import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwaySignalingSystem } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector'; // Using the updated import path from your example
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';

interface RailwaySignalingSystemFormProps {
  formik: FormikProps<RailwaySignalingSystem>;
  defaultFile: File | null; // This will receive otherSubMenu?.id as its file type
  onDefaultFileChange: (file: File | null) => void;
}

const RailwaySignalingSystemForm: React.FC<RailwaySignalingSystemFormProps> = ({
  formik,

  defaultFile,
  onDefaultFileChange
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-signaling-system.details.railway_line_section_name')}
          placeholder={t('project.other.railway-signaling-system.details.railway_line_section_name')}
          name="railway_line_section_name"
          value={formik.values.railway_line_section_name}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-signaling-system.details.signaling_system_type')}
          name="signaling_system_type"
          value={formik.values.signaling_system_type}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_name')}
          placeholder={t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_name')}
          name="signaling_system_manufacturer_or_supplier_name"
          value={formik.values.signaling_system_manufacturer_or_supplier_name}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomPhoneInput
          fullWidth
          label={t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_phone')}
          placeholder={t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_phone')}
          name="signaling_system_manufacturer_or_supplier_phone"
          value={formik.values.signaling_system_manufacturer_or_supplier_phone}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-signaling-system.details.signaling_system_components')}
          placeholder={t('project.other.railway-signaling-system.details.signaling_system_components')}
          name="signaling_system_components"
          value={formik.values.signaling_system_components}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-signaling-system.details.remark')}
          placeholder={t('project.other.railway-signaling-system.details.remark')}
          name="remark"
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

export default RailwaySignalingSystemForm;
