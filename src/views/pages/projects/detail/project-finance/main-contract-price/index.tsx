import { Icon } from '@iconify/react';
import { Box, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Can from 'src/layouts/components/acl/Can';
import projectFinanceApiService from 'src/services/project/project-finance-service';
import MainContractPriceCard from './main-contract-price-card';
import LoadingPlaceholder from 'src/views/components/loader';

interface ProjectFinanceData {
  mainContractPrice: number;
  rebate: number;
}

const MainContractPriceComponent = ({ projectId }: { projectId: string }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const {
    data: financeData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['projectFinanceData', projectId],
    queryFn: () => projectFinanceApiService.getAll({
      filter: {
        project_id: projectId
      }
    }), // Replace with your API call
    select: data => data.payload?.[0] ?? null // Extract the first item from the array
  });

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  const mainContractPrice = financeData?.main_contract_price_amount ?? undefined;
  const rebate = financeData?.rebate ?? 0;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {showDrawer && <></>} {/* You can add your drawer component here */}
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
      <MainContractPriceCard mainContractPrice={mainContractPrice} rebate={rebate} />
      </Box>
    </Box>
  );
};

export default MainContractPriceComponent;
