// ** React Imports
import { ReactElement, cloneElement, useContext, useMemo } from 'react';

// ** MUI Imports
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Grid, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AbilityContext } from 'src/layouts/components/acl/Can';
import TabsRoute from 'src/pages/departments/tab-routes';
import CentersTabRoutesWithId from 'src/pages/departments/tab-routes-with-id';
import departmentApiService from 'src/services/department/department-service';
import Department from 'src/types/department/department';
import LoadingPlaceholder from 'src/views/components/loader';
import CompanyCard from './centers-card';
import ProfileCard from './profile-card';

interface CentersLayoutProps {
  children: ReactElement;
  value: string;
  routes: typeof CentersTabRoutesWithId | typeof TabsRoute;
}

const CentersLayout = ({ children, value, routes }: CentersLayoutProps) => {
  // ** State
  const router = useRouter();
  const { id } = router.query;
  const ability = useContext(AbilityContext);
  const { t } = useTranslation();

  // routes(id)[0]

  // const [{ data: department, loading, error }, refetch] = getDepartmentById(id);
  const {
    data: department,
    isLoading: isDepartmentLoading,
    error: departmentError,
    refetch
  } = useQuery({
    queryKey: ['department', id],
    queryFn: () => departmentApiService.getById(id ? String(id) : undefined, {})
  });

  const {
    data: departmentsTree,
    isLoading: isTreeLoading,
    error: treeError
  } = useQuery({
    queryKey: ['department-tree', id],
    queryFn: () => departmentApiService.getAllParentDepartmentsTree(id ? String(id) : ''),
    enabled: !!id
  });

  const currentRoutes = useMemo(() => (id ? routes(String(id)) : routes()), [id, routes]);

  if (departmentError || treeError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{t('common.errors.loadingError')}</Typography>
      </Box>
    );
  }

  if (isDepartmentLoading || isTreeLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <LoadingPlaceholder />
      </Box>
    );
  }

  const renderBreadcrumbs = () => {
    if (!departmentsTree?.payload) return null;

    return (
      <Typography variant="subtitle1" sx={{ alignSelf: 'end', textDecoration: 'none' }} paddingBottom={7} fontSize={13}>
        {departmentsTree.payload.map((item: Department) => (
          <span key={item.id}>
            <Typography component={Link} href={`/departments/sub-departements/${item.id}`} sx={{ textDecoration: 'none' }}>
              {item.name}/
            </Typography>
            &nbsp;&nbsp;
          </span>
        ))}
      </Typography>
    );
  };

  return (
    <Box display="flex" flexDirection="column" paddingTop={1}>
      {renderBreadcrumbs()}

      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <ProfileCard refetch={refetch} department={department?.payload as Department} loading={isDepartmentLoading} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <CompanyCard name="Department" count="34" iconName="tabler:book-2" />
            </Grid>
            <Grid item xs={12} md={4}>
              <CompanyCard name="Position" count="14" iconName="tabler:note" />
            </Grid>
            <Grid item xs={12} md={4}>
              <CompanyCard name="Professional" count="15" iconName="tabler:message-dots" />
            </Grid>
            <Grid item xs={12} md={12}>
              <TabContext value={value}>
                <TabList variant="fullWidth">
                  {ability.can('view', 'department') && (
                    <Tab value="1" component={Link} label={t('department.tabs.sub-departments')} href={currentRoutes[0].path} />
                  )}
                  {ability.can('view', 'position') && (
                    <Tab value="2" component={Link} label={t('department.tabs.positions')} href={currentRoutes[1].path} />
                  )}
                  {ability.can('view', 'professional') && (
                    <Tab value="3" component={Link} label={t('department.tabs.professionals')} href={currentRoutes[2].path} />
                  )}
                  <Tab value="4" component={Link} label={t('department.tabs.documents')} href={currentRoutes[3].path} />
                  <Tab value="5" component={Link} label={t('department.tabs.structure')} href={currentRoutes[4].path} />
                </TabList>
                {cloneElement(children, { parentDepartment: department?.payload })}
              </TabContext>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CentersLayout;
