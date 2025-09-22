import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwayFasteningSystemCharacteristic } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector'; // Import CustomFileUpload

interface RailwayFasteningSystemCharacteristicFormProps {
  formik: FormikProps<RailwayFasteningSystemCharacteristic>;
  file: File | null; // Add file prop
  onFileChange: (file: File | null) => void; // Add onFileChange prop
}

const RailwayFasteningSystemCharacteristicForm: React.FC<RailwayFasteningSystemCharacteristicFormProps> = ({
  formik,
  file, // Destructure file
  onFileChange // Destructure onFileChange
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-characteristic.details.railway_line_section_name')}
          placeholder={t('project.other.railway-fastening-system-characteristic.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-characteristic.details.used_fastening_system_type')}
          placeholder={t('project.other.railway-fastening-system-characteristic.details.used_fastening_system_type')}
          name="used_fastening_system_type"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-characteristic.details.fastening_system_manufacturer_supplier')}
          placeholder={t('project.other.railway-fastening-system-characteristic.details.fastening_system_manufacturer_supplier')}
          name="fastening_system_manufacturer_supplier"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-characteristic.details.fastening_system_specifications')}
          placeholder={t('project.other.railway-fastening-system-characteristic.details.fastening_system_specifications')}
          name="fastening_system_specifications"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-characteristic.details.rail_clips_or_clamps_details')}
          placeholder={t('project.other.railway-fastening-system-characteristic.details.rail_clips_or_clamps_details')}
          name="rail_clips_or_clamps_details"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-characteristic.details.bolts_and_nuts_specifications')}
          placeholder={t('project.other.railway-fastening-system-characteristic.details.bolts_and_nuts_specifications')}
          name="bolts_and_nuts_specifications"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-characteristic.details.other_fastening_system')}
          placeholder={t('project.other.railway-fastening-system-characteristic.details.other_fastening_system')}
          name="other_fastening_system"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-characteristic.details.remark')}
          placeholder={t('project.other.railway-fastening-system-characteristic.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayFasteningSystemCharacteristicForm;