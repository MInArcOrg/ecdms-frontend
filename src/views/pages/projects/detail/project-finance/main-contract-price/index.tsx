import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Can from 'src/layouts/components/acl/Can';
import LoadingPlaceholder from 'src/views/components/loader';
import { AddButton } from 'src/views/shared/listing/header';
import MainContractPriceDrawer from './main-contract-price-drawer';
import MainContractPriceCard from './main-contract-price-card';
import { ProjectFinance } from 'src/types/project';
import { ProjectGeneralFinance } from 'src/types/project/project-finance';
import projectFinanceApiService from 'src/services/project/project-finance-service';

interface ProjectFinanceComponentProps {
  projectId: string;
}

const ProjectFinanceComponent: React.FC<ProjectFinanceComponentProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const {
    data: projectFinance,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['project-status', projectId],
    queryFn: () => projectFinanceApiService.getAll({ filter: { project_id: projectId } }),
    select: (data) => data.payload?.[0] ?? null // Extract the first item from the array
  });

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectFinance: ProjectFinance) => {
    toggleDrawer();
  };
  const handleDelete = async (projectFinanceId: string) => {
    await projectFinanceApiService.delete(projectFinanceId);
    refetch();
  };
  const { data: projectGeneralFinance } = useQuery({
    queryKey: ['projectFinanceData', projectId],
    queryFn: () => projectFinanceApiService.getProjectGeneralFinance(projectId, {})
  });
  return isLoading ? (
    <LoadingPlaceholder />
  ) : (
    <>
      <Box display="flex" flexDirection="column" gap={3}>
        {!projectFinance && (
          <Can do="create" on="projectfinance">
            <Box alignSelf="end">
              <AddButton onClick={() => setShowDrawer(true)} onlyIcon={false} />
            </Box>
          </Can>
        )}
        {showDrawer && (
          <MainContractPriceDrawer
            open={showDrawer}
            toggle={toggleDrawer}
            refetch={refetch}
            projectId={projectId}
            projectFinance={projectFinance as ProjectFinance}
            projectGeneralFinance={projectGeneralFinance?.payload as ProjectGeneralFinance}
          />
        )}

        {projectFinance && <MainContractPriceCard projectFinance={projectFinance as ProjectFinance} refetch={refetch} onEdit={handleEdit} onDelete={handleDelete} />}

      </Box>
    </>
  );
};

export default ProjectFinanceComponent;
