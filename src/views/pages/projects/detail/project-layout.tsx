import { Box, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import DetailSubMenu from './detail-sub-menu';
import menuTabs from './project-menu-items';
import DetailMenu from './detail-menu';
import { ReactNode } from 'react';

interface ProjectLayoutProps {
  toggleForm: () => void;
  activeMenu: number;
  activeSubMenu: number;
  subMenuItems: Array<{ id: string; label: string; path: string }>;
  children: ReactNode;
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({
  toggleForm,
  activeMenu,
  activeSubMenu,
  subMenuItems,
  children,
}) => {
  const router = useRouter();
  const { id, typeid } = router.query;
  const isProject = true;

  return (
    <Box>
      <DetailMenu
        id={id as string}
        menuItems={menuTabs(id as string, typeid as string)}
        activeMenu={menuTabs(id as string, typeid as string)[activeMenu].id}
        setActiveMenu={(path) => {
          router.push(path);
        }}
        goBack={() => router.replace(`/projects/${typeid}`)}
        isProject={isProject}
      />
      <Box display="flex" flexDirection="column" gap={1} paddingTop={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <DetailSubMenu
                subMenuItems={subMenuItems}
                activeSubMenu={subMenuItems[activeSubMenu]?.id}
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
      </Box>
    </Box>
  );
};

export default ProjectLayout;
