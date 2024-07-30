import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from 'src/configs/i18n';
import { ProjectStatus } from 'src/types/project';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import DescCollapse from 'src/views/pages/resources/detail/desc-collapse';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import ProjectStatusChip from '../general-info/project-status-chip';

const ProjectStatusDetail = ({
  projectStatus,
  toggleDrawer,
  open,
  refetch
}: {
  projectStatus: ProjectStatus;
  toggleDrawer: () => void;
  open: boolean;
  refetch: () => void;
}) => {
  const { t: transl } = useTranslation();
  return (
    <CustomSideDrawer title={`project.project-status.project-status`} handleClose={toggleDrawer} open={open}>
      {() => (
        <>
          <Box display="flex" gap={3}>
            <Typography variant="body1" mb={1}>
              <strong>{transl('project.project-status.project-status')}:</strong>
            </Typography>
            <Box>
              <ProjectStatusChip data={projectStatus?.status?.title} />
            </Box>
          </Box>
          <Box display="flex" gap={3}>
            <Typography variant="body1" mb={1}>
              <strong>{transl('Modified Date')} :</strong>
            </Typography>
            <Typography variant="body1" mb={1}>
              {getDynamicDate(i18n, projectStatus?.created_at).toDateString()}
            </Typography>
          </Box>
          <Box display="flex" gap={3}>
            <Box mb={4}>
              <Typography variant="body1" display="flex">
                <strong>{transl('project.project-status.form.description')}:</strong>
              </Typography>
            </Box>
            <Box>
              <DescCollapse desc={projectStatus?.description || ''} />
            </Box>
          </Box>
          <Box display="flex" alignSelf="flex-end" justifyContent="end">
            <ModelActionComponent
              model="ProjectStatus"
              model_id={projectStatus.id}
              refetchModel={refetch}
              resubmit={function (): void {
                throw new Error('Function not implemented.');
              }}
              title={'project.project-status.project-status'}
              postAction={function (): void {
                throw new Error('Function not implemented.');
              }}
            />{' '}
          </Box>
        </>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectStatusDetail;
