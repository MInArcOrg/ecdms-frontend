import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import Icon from 'src/@core/components/icon';
import CustomChip from 'src/@core/components/mui/chip';
import authConfig from 'src/configs/auth';
import i18n from 'src/configs/i18n';
import { getStaticFile } from 'src/services/utils/file-utils';
import { FileModel } from 'src/types/general/file';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const ProjectFileCard = ({
  projectFile,
  refetch,
  onEdit,
  type,
  onDelete
}: {
  type: string;
  projectFile: FileModel;
  refetch: () => void;
  onEdit: (projectFile: FileModel) => void;
  onDelete: (id: string) => void;
}) => {
  const getDownloadFileName = () => {
    const baseName = (projectFile.title || 'file').trim() || 'file';
    const ext = (projectFile.extension || '').trim();
    if (!ext) return baseName;

    const lowerBase = baseName.toLowerCase();
    const lowerExt = ext.toLowerCase();
    if (lowerBase.endsWith(`.${lowerExt}`)) return baseName;

    return `${baseName}.${ext}`;
  };

  const handleDownload = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const url = getStaticFile(projectFile?.url || '');
    const fileName = getDownloadFileName();

    try {
      const token =
        typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem(authConfig.storageTokenKeyName) : null;

      const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });

      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box display="flex" flexWrap="wrap">
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2} pb={2}>
              <Typography component={Icon} icon="mdi:file-document-outline" fontSize={35} color="primary" />
              <Typography variant="body1">
                {projectFile.title.length > 10 ? `${projectFile.title.substr(0, 10)} ...` : projectFile.title}
              </Typography>
            </Box>
            <IconButton>
              <Icon icon="tabler:more-vertical" fontSize={18} />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="end" px={3}>
            <Typography variant="body2" color="text.secondary">
              {projectFile.size} kb
            </Typography>
            <CustomChip label={getDynamicDate(i18n, projectFile?.updated_at).toDateString()} rounded size="small" skin="light"></CustomChip>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" pt={3}>
            <IconButton color="primary" onClick={handleDownload}>
              <Icon icon="tabler:download" fontSize="1.5rem" />
            </IconButton>
            <Box display="flex" alignItems="end" justifyContent="end" gap={4}>
              <Box sx={{ display: 'flex' }}>
                <ModelActionComponent
                  model="File"
                  model_id={projectFile.id}
                  refetchModel={refetch}
                  resubmit={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  title={''}
                  postAction={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <RowOptions
                  deletePermissionRule={{
                    action: 'delete',
                    subject: 'file'
                  }}
                  editPermissionRule={{
                    action: 'update',
                    subject: 'file'
                  }}
                  onEdit={onEdit}
                  onDelete={() => onDelete(projectFile.id)}
                  item={projectFile}
                  options={[]}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectFileCard;
