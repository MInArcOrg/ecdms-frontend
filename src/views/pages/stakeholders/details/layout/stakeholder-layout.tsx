import { Box, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import DetailMenu from 'src/views/components/custom/layout/detail-menu';
import menuTabs from './stakeholder-menu-items';
import DetailSubMenu from 'src/views/components/custom/layout/detail-sub-menu';

interface StakeholderLayoutProps {
  activeMenu: number;
  activeSubMenu?: number;
  subMenuItems?: Array<{ id: number; title: string; path: string }>;
  children: ReactNode;
}

const StakeholderLayout: React.FC<StakeholderLayoutProps> = ({ activeMenu, activeSubMenu, subMenuItems, children }) => {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <DetailMenu
        id={id as string}
        menuItems={menuTabs(id as string, typeId as string)}
        activeMenu={menuTabs(id as string, typeId as string)[activeMenu].id}
        setActiveMenu={(path) => {
          router.push(path);
        }}
        goBack={() => router.replace(`/stakeholders/${typeId}`)}
        typeId={String(typeId)}
      />
      <Box display="flex" flexDirection="column" gap={1} paddingTop={5}>
        {subMenuItems ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card>
                <DetailSubMenu
                  subMenuItems={subMenuItems}
                  activeSubMenu={subMenuItems[activeSubMenu || 0]?.id}
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

export default StakeholderLayout;
