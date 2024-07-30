import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

interface StakeholderInformationProps {
  data: any;
}

const StakeholderInformation: React.FC<StakeholderInformationProps> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
        <strong>{t('project.stakeholder.information')}</strong>
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.stakeholder.client')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.client}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.stakeholder.consultant')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.consultant}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {t('project.stakeholder.contractor')}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light" fontSize="14px">
          {data.contractor}
        </Typography>
      </Box>
    </Box>
  );
};

export default StakeholderInformation;
