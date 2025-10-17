import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';

interface TimeInformationProps {
  data: any;
  i18n: any;
}

const TimeInformation: React.FC<TimeInformationProps> = ({ data, i18n }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
        <strong>{t('project.project-time.information')}</strong>
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.project-time.commencement-date')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.commencement_date ? getDynamicDate(i18n, data.commencement_date).toDateString() : ''}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.project-time.completion-date')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.completion_date ? getDynamicDate(i18n, data.completion_date).toDateString() : ''}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.project-time.total-duration')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.contract_duration ?? '0'} {t('project.project-time.days')}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.project-time.elapsed-time')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.elapsed_time ?? '0'} {t('project.project-time.days')}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeInformation;
