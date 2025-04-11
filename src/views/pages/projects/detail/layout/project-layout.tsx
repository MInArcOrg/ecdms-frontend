import { Box, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import DetailMenu from 'src/views/components/custom/layout/detail-menu';
import menuTabs from './project-menu-items';
import DetailSubMenu from 'src/views/components/custom/layout/detail-sub-menu';
import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

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

  return (
    <Box>
      <DetailMenu
        id={id as string}
        menuItems={menuTabs(id as string, typeId as string)}
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
                  subMenuItems={subMenuItems}
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
