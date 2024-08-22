import { CardContent, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';

interface ReportDetailCardProps {
  show: boolean;
  toggleDrawer: () => void;
  data?: {
    totalManPower?: number;
    totalMaterial?: number;
    totalMachinery?: number;
    totalOtherExpense?: number;
    totalSubContractorCost?: number;
    totalSubtotalExpense?: number;
    totalOverHeadCost?: number;
    totalProfitOrLoss?: number;
    totalProjectExpense?: number;
  };
  handleFormSubmit?: () => void;
}

const ReportDetailCard: React.FC<ReportDetailCardProps> = ({ show, toggleDrawer, data }) => {
  const { t } = useTranslation();

  return (
    <CustomSideDrawer title={`project.report.summary-expense`} handleClose={toggleDrawer} open={show}>
      {() => (
        <CardContent>
          <Box alignContent="center" justifyContent="space-between">
            {[
              { label: t('Manpower'), value: data?.totalManPower },
              { label: t('Material'), value: data?.totalMaterial },
              { label: t('Machinery'), value: data?.totalMachinery },
              { label: t('Other Expense'), value: data?.totalOtherExpense },
              { label: t('Subcontractor Expense'), value: data?.totalSubContractorCost },
              { label: `${t('Subtotal')}`, value: data?.totalSubtotalExpense, isStrong: true },
              { label: t('Overhead Cost'), value: data?.totalOverHeadCost },
              { label: t('Profit - Loss'), value: data?.totalProfitOrLoss },
              { label: `${t('Project')} ${t('Expense')}`, value: data?.totalProjectExpense, isStrong: true }
            ].map(({ label, value, isStrong }, index) => (
              <Fragment key={index}>
                <Box display="flex" justifyContent="space-between" alignItems="center" m={2}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    {isStrong ? <strong>{label}</strong> : label}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    {isStrong ? <strong>{value}</strong> : value}
                  </Typography>
                </Box>
                {index < 8 && <Divider />}
              </Fragment>
            ))}
          </Box>
        </CardContent>
      )}
    </CustomSideDrawer>
  );
};

export default ReportDetailCard;
