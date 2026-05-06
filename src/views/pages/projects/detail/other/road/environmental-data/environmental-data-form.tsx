import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { EnvironmentalData } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import { ENVIRONMENTAL_DATA_FILE_TYPES, EnvironmentalDataFileKey } from './filet-type-config';

interface EnvironmentalDataFormProps {
  formik: FormikProps<EnvironmentalData>;
  files: Record<EnvironmentalDataFileKey, File | null>;
  onFileChange: (fileType: EnvironmentalDataFileKey, file: File | null) => void;
}

const EnvironmentalDataForm: React.FC<EnvironmentalDataFormProps> = ({ formik, files, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.environmental-data.details.remark')}
          placeholder={transl('project.other.environmental-data.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        {ENVIRONMENTAL_DATA_FILE_TYPES.map((fileType) => (
          <CustomFileUpload
            key={fileType.key}
            label={transl(fileType.titleTKey)}
            file={files[fileType.key]}
            onFileChange={(file) => onFileChange(fileType.key, file)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default EnvironmentalDataForm;
