import React from 'react';
import { Box, Button, FormControl, FormLabel, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

interface CustomMultiFileUploadProps {
  label: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const CustomMultiFileUpload: React.FC<CustomMultiFileUploadProps> = ({ label, files, onFilesChange }) => {
  const { t } = useTranslation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesChange(Array.from(event.target.files));
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
      <FormLabel component="legend">{t(label)}</FormLabel>
      {files.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
          {files.map((file, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Icon icon="mdi:file-document-outline" color="#ffcc00" width={25} height={25} />
              <Typography variant="body1">{file.name}</Typography>
              <Icon
                icon="tabler:trash"
                color="#f33"
                width={20}
                height={20}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRemoveFile(index)}
              />
            </Box>
          ))}
        </Box>
      )}
      <Button variant="outlined" component="label" size="large" color="secondary">
        <Icon icon="tabler:paperclip" width={20} height={20} /> {t('Upload File')}
        <input
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </Button>
    </FormControl>
  );
};

export default CustomMultiFileUpload;
