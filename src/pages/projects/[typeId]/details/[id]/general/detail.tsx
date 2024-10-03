import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomChip from 'src/@core/components/mui/chip';
import projectApiService from 'src/services/project/project-service';
import { formatCurrency } from 'src/utils/formatter/currency';
import LoadingPlaceholder from 'src/views/components/loader';
import ProfileCard from 'src/views/pages/projects/detail/general-info/project-profile-card';
import ProjectStatusChip from 'src/views/pages/projects/detail/general-info/project-status-chip';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';

function ProjectGeneralInformation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  const {
    data: projectGeneralInformation,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['project-general-information', id],
    queryFn: () => projectApiService.getProjectGeneralInformation(String(id), {})
  });
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  const { t } = useTranslation();

  return (
    <ProjectLayout activeMenu={0} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      {' '}
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <Card
            sx={{
              mb: 3
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <ProfileCard
                  projectInfo={{ ...projectGeneralInformation?.payload, id: id as string }}
                  time={projectGeneralInformation?.payload?.time}
                />
              </Grid>
            </Grid>
          </Card>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} display="flex" gap={5}>
                  <Box>
                    <Typography variant="subtitle1">{t('project.general-information.client')}</Typography>
                    <Typography variant="subtitle1">{t('project.general-information.contractor')}</Typography>
                    <Typography variant="subtitle1">{t('project.general-information.consultant')}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">
                      {projectGeneralInformation?.payload?.client != null
                        ? projectGeneralInformation?.payload?.client
                        : t('project.general-information.please-add-client')}
                    </Typography>
                    <Typography variant="subtitle1">
                      {projectGeneralInformation?.payload?.contractor != null
                        ? projectGeneralInformation?.payload?.contractor
                        : t('project.general-information.please-add-contractor')}
                    </Typography>
                    <Typography variant="subtitle1">
                      {projectGeneralInformation?.payload?.consultant != null
                        ? projectGeneralInformation?.payload?.consultant
                        : t('project.general-information.please-add-consultant')}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  gap={5}
                  sx={{
                    justifyContent: {
                      md: 'end'
                    }
                  }}
                  display="flex"
                >
                  <Box>
                    <Typography variant="h6">{t('project.general-information.contractPrice')}</Typography>
                    <Typography variant="subtitle1" pt={3}>
                      {t('project.general-information.projectStatus')}
                    </Typography>
                  </Box>
                  <Box>
                    <CustomChip
                      rounded
                      size="small"
                      color="primary"
                      label={
                        projectGeneralInformation?.payload?.main_contract_price_amount != null
                          ? formatCurrency(projectGeneralInformation?.payload?.main_contract_price_amount)
                          : t('project.general-information.please-add-main-contract-price')
                      }
                    />
                    <Box pt={3}>
                      <ProjectStatusChip data={projectGeneralInformation?.payload?.project_status} onClick={function (): void {}} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </ProjectLayout>
  );
}

ProjectGeneralInformation.acl = {
  subject: 'projectinfo',
  action: 'view_projectinfo'
};

export default ProjectGeneralInformation;
