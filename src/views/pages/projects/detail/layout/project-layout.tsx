import { Box, Card, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';
import DetailMenu from 'src/views/components/custom/layout/detail-menu';
import DetailSubMenu from 'src/views/components/custom/layout/detail-sub-menu';
import menuTabs from './project-menu-items';

interface ProjectLayoutProps {
  activeMenuId: string;
  activeSubMenuId?: string;
  subMenuItems?: DetailSubMenuItem[];
  children: ReactNode;
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ activeMenuId, activeSubMenuId, subMenuItems, children }) => {
  const router = useRouter();
  const { id, typeId } = router.query;
  const isProject = true;

  const { data: masterType } = useQuery({
    queryKey: ['masterType', 'project'],
    queryFn: () => masterTypeApiService.getOne('project', String(typeId), {})
  });

  return (
    <Box>
      <DetailMenu
        id={id as string}
        menuItems={menuTabs(id as string, typeId as string).filter((item) => !item.type || item.type === masterType?.payload.flag)}
        activeMenuId={activeMenuId}
        setActiveMenu={(path) => {
          router.push(path);
        }}
        goBack={() => router.replace(`/projects/${typeId}`)}
        typeId={String(typeId)}
        isProject={isProject}
      />
      <Box display="flex" flexDirection="column" gap={1} paddingTop={5}>
        {subMenuItems ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card>
                <DetailSubMenu
                  subMenuItems={subMenuItems.filter((item) => !item.type || item.type === masterType?.payload.flag)}
                  activeSubMenuId={activeSubMenuId}
                  setActiveSubMenu={(path) => {
                    router.push(path);
                  }}
                />
              </Card>
            </Grid>
            <Grid item md={9} xs={12}>
              {children}
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {children}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ProjectLayout;
