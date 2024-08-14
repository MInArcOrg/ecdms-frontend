import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import Icon from 'src/@core/components/icon';
import CustomChip from 'src/@core/components/mui/chip';
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
            <Typography component="a" color="primary" href={`${getStaticFile(projectFile?.url || '')}`} target="_blank" rel="noreferrer">
              <Icon icon="tabler:download" fontSize="1.5rem" />
            </Typography>
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
                    action: 'edit',
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
