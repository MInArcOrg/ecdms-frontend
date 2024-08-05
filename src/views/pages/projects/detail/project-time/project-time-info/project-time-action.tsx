import { Box } from '@mui/material';
import CustomChip from 'src/@core/components/mui/chip';
import Can from 'src/layouts/components/acl/Can';
import { ProjectTime } from 'src/types/project/project-time';
import ModelActionComponent from 'src/views/components/custom/model-actions';

const ProjectTimeAction = ({
  projectTime,
  refetch,
  onStatusChangeClick
}: {
  projectTime: ProjectTime;
  refetch: () => void;
  onStatusChangeClick: () => void;
}) => {
  return (
    <Box display="flex" justifyContent="end" alignItems="end">
      <Box display="flex" gap={2}>
        <Can do={'register_projectstatus'} on={'projectstatus'}>
          <CustomChip
            label="Change Status"
            color="primary"
            rounded
            size="small"
            skin="light"
            sx={{
              '& .MuiChip-label': { textTransform: 'capitalize' },
              '&:hover': { color: '#fff' },
              cursor: 'pointer',
              height: 20
            }}
            onClick={() => {
              onStatusChangeClick();
              //   setSelectedData(data?.data[0])
              //   setShow(true)
            }}
          />
        </Can>

        <ModelActionComponent
          model="ProjectTime"
          model_id={projectTime.id}
          refetchModel={refetch}
          resubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
          title={'project.project-status.project-status'}
          postAction={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Box>
    </Box>
  );
};

export default ProjectTimeAction;
