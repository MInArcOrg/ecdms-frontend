import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from 'src/utils/formatter/money';

interface MainContractPriceCardProps {
  mainContractPrice?: number;
  rebate: number;
}

const MainContractPriceCard: React.FC<MainContractPriceCardProps> = ({ mainContractPrice, rebate }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('contract.price-details')}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1">{t('contract.main-contract-price')}:</Typography>
          <Typography variant="h6" color="primary">
            {mainContractPrice !== undefined ? formatCurrency(mainContractPrice) : t('contract.add-main-contract-price')}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="subtitle1">{t('contract.rebate')}:</Typography>
          <Typography variant="h6" color="secondary">
            {formatCurrency(rebate)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MainContractPriceCard;
