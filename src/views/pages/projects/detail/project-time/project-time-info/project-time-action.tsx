import { Box } from '@mui/material';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectTime } from 'src/types/project/project-time';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const ProjectTimeAction = ({
  projectTime,
  refetch,
  onDelete,
  onEdit
}: {
  projectTime: ProjectTime;
  refetch: () => void;
  onEdit: (projectTime: ProjectTime) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <Box display="flex" justifyContent="end" alignItems="end">
      <Box display="flex" gap={2}>
        <FileDrawer id={projectTime.id} type={uploadableProjectFileTypes.time} /> &nbsp;
        <Box sx={{ display: 'flex' }}>
          <ModelActionComponent
            model="ProjectTime"
            model_id={projectTime.id}
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
              subject: 'projecttime'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'projecttime'
            }}
            onEdit={onEdit}
            onDelete={() => onDelete(projectTime.id)}
            item={projectTime}
            options={[]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectTimeAction;
