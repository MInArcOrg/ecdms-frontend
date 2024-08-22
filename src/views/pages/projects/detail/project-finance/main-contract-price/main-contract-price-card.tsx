import React, { Fragment } from 'react';
import { Card, CardContent, Typography, Box, Divider, CardActions } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from 'src/utils/formatter/currency';
import { formatPercent } from 'src/utils/formatter/number';
import FileDrawer from 'src/views/components/custom/files-drawer';
import { ProjectFinance } from 'src/types/project';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const MainContractPriceCard = ({
  projectFinance,
  refetch,
  onEdit
}: {
  projectFinance: ProjectFinance;
  refetch: () => void;
  onEdit: (address: ProjectFinance) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('project.main-contract-price.price-details')}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1">{t('project.main-contract-price.title')}:</Typography>
          <Typography variant="h6" color="primary">
            {projectFinance?.main_contract_price_amount !== undefined
              ? formatCurrency(projectFinance.main_contract_price_amount)
              : t('project.main-contract-price.add-main-contract-price')}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="subtitle1">{t('project.main-contract-price.form.rebate')}:</Typography>
          <Typography variant="h6" color="secondary">
            {projectFinance?.rebate !== undefined ? formatPercent(projectFinance.rebate) : ''}{' '}
          </Typography>
        </Box>
      </CardContent>
      {projectFinance && (
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Fragment>
            <Box>
              <FileDrawer id={projectFinance?.id} type={'RESOURCE'} /> &nbsp;
              <Box sx={{ display: 'flex' }}>
                <ModelActionComponent
                  model="Address"
                  model_id={projectFinance?.id}
                  refetchModel={refetch}
                  resubmit={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  title={''}
                  postAction={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <RowOptions onEdit={onEdit} item={projectFinance} options={[]} />
              </Box>
            </Box>
          </Fragment>
        </CardActions>
      )}
    </Card>
  );
};

export default MainContractPriceCard;
