import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

import Icon from 'src/@core/components/icon';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectExtensionTime } from 'src/types/project/project-time';

const ProjectExtensionTimeCard = ({
  projectExtensionTime,
  refetch,
  onEdit,
  onDelete
}: {
  projectExtensionTime: ProjectExtensionTime;
  refetch: () => void;
  onEdit: (projectExtensionTime: ProjectExtensionTime) => void;
  onDelete: (id: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {t(`project.project-extension-time.title`)} {1}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {projectExtensionTime?.reason}
          </Typography>
        </Box>
        <Box mt={2} display="flex">
          <Icon icon="mdi:calendar-blank" fontSize={20} />
          <Typography mr="0.5rem">{projectExtensionTime?.number_of_days} </Typography>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={projectExtensionTime.id} type={uploadableProjectFileTypes.extension_time} /> &nbsp;
        <Box sx={{ display: 'flex' }}>
          <ModelActionComponent
            model="ExtensionTime"
            model_id={projectExtensionTime.id}
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
            onEdit={onEdit}
            onDelete={() => onDelete(projectExtensionTime.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'projectextensiontime'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'projectextensiontime'
            }}
            item={projectExtensionTime}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectExtensionTimeCard;
