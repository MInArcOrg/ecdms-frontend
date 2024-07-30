import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomChip from 'src/@core/components/mui/chip';
import { useTranslation } from 'react-i18next';

interface EarnedValueAnalysisProps {
  data: any;
}

const EarnedValueAnalysis: React.FC<EarnedValueAnalysisProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
        <strong>{t('project.earned-value-analysis.earned-value-analysis')}</strong>
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.earned-value-analysis.planned-value')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.planned_revenue}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.earned-value-analysis.earned-value')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.earned_revenue}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.earned-value-analysis.actual-cost')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.actual_cost}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          CPI
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          <CustomChip
            label={`${data.cpi ? data.cpi.toFixed(2) : '0'}`}
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
          CV
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.cv}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          SPI
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          <CustomChip
            label={`${data.spi ? data.spi.toFixed(2) : '0'} %`}
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
          SV
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.sv}
        </Typography>
      </Box>
    </Box>
  );
};

export default EarnedValueAnalysis;
