import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import CustomChip from 'src/@core/components/mui/chip';
import { formatCurrency } from 'src/utils/formatter/currency';

interface FinanceInformationProps {
  data: any;
}

const FinanceInformation: React.FC<FinanceInformationProps> = ({ data }) => {
  const { t } = useTranslation();

  const percentof = (a: number, b: number): string => {
    return ((a / b) * 100).toFixed(2);
  };

  const remainingIpc = data.total_contract_amount - data.paid_ipc;

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
        <strong>{t('project.finance.information')}</strong>
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.finance.total-contract-amount')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          <CustomChip
            label={data.total_contract_amount ? formatCurrency(data.total_contract_amount) : '0'}
            color="primary"
            rounded
            size="small"
            skin="light"
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, height: 20 }}
          />
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.finance.paid-ipc')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          <CustomChip
            label={`${data.paid_ipc ? percentof(data.paid_ipc, data.total_contract_amount) : '0'} %`}
            color="primary"
            rounded
            size="small"
            skin="light"
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, height: 20 }}
          />{' '}
          ({data.paid_ipc ? formatCurrency(data.paid_ipc) : '0'})
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.finance.remaining-ipc')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          <CustomChip
            label={`${data.total_contract_amount ? percentof(remainingIpc, data.total_contract_amount) : '0'} %`}
            color="primary"
            rounded
            size="small"
            skin="light"
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, height: 20 }}
          />{' '}
          ({data.total_contract_amount ? formatCurrency(remainingIpc) : '0'})
        </Typography>
      </Box>
    </Box>
  );
};

export default FinanceInformation;
