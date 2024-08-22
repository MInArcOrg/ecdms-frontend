import Icon from 'src/@core/components/icon';
import { Box, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Can from 'src/layouts/components/acl/Can';
import projectFinanceApiService from 'src/services/project/project-finance-service';
import MainContractPriceCard from './main-contract-price-card';
import LoadingPlaceholder from 'src/views/components/loader';
import MainContractPriceDrawer from './main-contract-price-drawer';
import { ProjectFinance } from 'src/types/project';

const MainContractPriceComponent = ({ projectId }: { projectId: string }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const {
    data: financeData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['projectFinanceData', projectId],
    queryFn: () =>
      projectFinanceApiService.getAll({
        filter: {
          project_id: projectId
        }
      }), // Replace with your API call
    select: (data) => data.payload?.[0] ?? null // Extract the first item from the array
  });

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const handleEdit = (address: ProjectFinance) => {
    toggleDrawer();
  };

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  const mainContractPrice = financeData?.main_contract_price_amount ?? undefined;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {showDrawer && (
        <MainContractPriceDrawer
          projectId={projectId}
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          projectFinance={financeData as ProjectFinance}
        ></MainContractPriceDrawer>
      )}{' '}
      {/* You can add your drawer component here */}
      {(!financeData || mainContractPrice === undefined) && (
        <Can do="register_projectfinance" on="projectfinance">
          <Box alignSelf="end">
            <IconButton onClick={() => setShowDrawer(true)}>
              <Icon icon="tabler:plus" width="25" height="25" />
            </IconButton>
          </Box>
        </Can>
      )}
      <Box>
        <MainContractPriceCard onEdit={handleEdit} projectFinance={financeData as ProjectFinance} refetch={refetch} />
      </Box>
    </Box>
  );
};

export default MainContractPriceComponent;
