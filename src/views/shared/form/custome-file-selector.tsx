import React from 'react';
import { Box, Button, FormControl, FormLabel, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';

interface CustomFileUploadProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const blockedFileExtensions = new Set([
  'svg',
  'svgz',
  'html',
  'htm',
  'xhtml',
  'xml',
  'js',
  'mjs',
  'cjs',
  'vbs',
  'vbe',
  'wsf',
  'wsh',
  'hta',
  'cmd',
  'bat',
  'ps1',
  'psm1',
  'sh',
  'exe',
  'dll',
  'msi',
  'com',
  'scr',
  'jar'
]);

const blockedMimeTypes = new Set([
  'image/svg+xml',
  'text/html',
  'application/xhtml+xml',
  'text/xml',
  'application/xml',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-dosexec',
  'application/x-sh',
  'text/javascript',
  'application/javascript'
]);

const getFileExtension = (name: string) => {
  const value = (name || '').trim();
  if (!value) return '';
  const idx = value.lastIndexOf('.');
  if (idx === -1) return '';
  return value.slice(idx + 1).toLowerCase();
};

const isUnsafeFile = (file: File) => {
  const ext = getFileExtension(file?.name || '');
  const mime = (file?.type || '').toLowerCase().trim();
  if (mime && blockedMimeTypes.has(mime)) return true;
  if (ext && blockedFileExtensions.has(ext)) return true;
  return false;
};

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ label, file, onFileChange }) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
      <FormLabel component="legend">{t(label)}</FormLabel>
      {file && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
          <Icon icon="mdi:file-document-outline" color="#ffcc00" width={25} height={25} />
          <Typography variant="body1">{file.name}</Typography>
          <Icon icon="tabler:trash" color="#f33" width={20} height={20} style={{ cursor: 'pointer' }} onClick={() => onFileChange(null)} />
        </Box>
      )}
      <Button variant="outlined" component="label" size="large" color="secondary">
        <Icon icon="tabler:paperclip" width={20} height={20} /> {t('Upload File')}
        <input
          type="file"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const selectedFile = e.target.files[0];
              if (isUnsafeFile(selectedFile)) {
                toast.error('Unsupported or unsafe file type');
                e.target.value = '';
                return;
              }
              onFileChange(selectedFile);
            }
          }}
        />
      </Button>
    </FormControl>
  );
};

export default CustomFileUpload;
