import { Icon } from '@iconify/react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Can from 'src/layouts/components/acl/Can';
import projectFinanceApiService from 'src/services/project/project-finance-service';
import MainContractPriceCard from './main-contract-price-card';

const MainContractPriceComponent = ({ projectId }: { projectId: string }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const {
    data: financeData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['financeData', projectId],
    queryFn: () => projectFinanceApiService.getOne(projectId, {}) // Replace with your API call
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  const mainContractPrice = financeData?.mainContractPrice ?? undefined;
  const rebate = financeData?.rebate ?? 0;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {showDrawer && <></>}
      {(!financeData || financeData.mainContractPrice === undefined) && (
        <Can do="register_projectfinance" on="projectfinance">
          <Box alignSelf="end">
            <IconButton onClick={() => setShowDrawer(true)}>
              <Icon icon="tabler:plus" width="25" height="25" />
            </IconButton>
          </Box>
        </Can>
      )}
      <MainContractPriceCard mainContractPrice={mainContractPrice} rebate={rebate} />
    </Box>
  );
};

export default MainContractPriceComponent;
