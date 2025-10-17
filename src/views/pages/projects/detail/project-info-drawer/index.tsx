import { Fragment, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from 'src/@core/components/icon';
import { CardContent, CircularProgress, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import projectApiService from 'src/services/project/project-service';
import { useQuery } from '@tanstack/react-query';
import StakeholderInformation from './stakeholder-information';
import TimeInformation from './time-information';
import FinanceInformation from './finance-information';
import EarnedValueAnalysis from './earned-value-analysis';
import i18n from 'src/configs/i18n';

interface ProjectInfoProps {
  show: boolean;
  toggleDrawer: () => void;
  id: string;
  title: string;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ show, toggleDrawer, id, title }) => {
  const {
    data: projectGeneralInformation,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['project-general-information', id],
    queryFn: () => projectApiService.getProjectDetailInformation(id, {})
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  return (
    <Fragment>
      <Drawer
        anchor="right"
        open={show}
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              xs: '100%',
              md: '36%',
              lg: '30%'
            },
            boxSizing: 'border-box'
          }
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: 1,
              p: 3
            }}
          >
            <Typography variant="h6">{t(title)}</Typography>
            <Icon icon="tabler:x" fontSize="20" cursor="pointer" onClick={toggleDrawer} />
          </Box>
        </Box>
        <CardContent>
          {isLoading && (
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
              <CircularProgress />
            </Box>
          )}
          {!isLoading && projectGeneralInformation?.payload && (
            <Box alignContent="center" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                <strong>{projectGeneralInformation?.payload?.name}</strong>
              </Typography>
              <Divider />
              <StakeholderInformation data={projectGeneralInformation?.payload} />
              <Divider />
              <TimeInformation data={projectGeneralInformation?.payload} i18n={i18n} />
              <Divider />
              <FinanceInformation data={projectGeneralInformation?.payload} />
              <Divider />
              <EarnedValueAnalysis data={projectGeneralInformation?.payload} />
            </Box>
          )}
        </CardContent>
      </Drawer>
    </Fragment>
  );
};

export default ProjectInfo;
