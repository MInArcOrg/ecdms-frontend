import { ReactNode, memo } from 'react';
import { useRouter } from 'next/router';
import { Box, Card, Grid } from '@mui/material';

interface OtherLayoutProps {
  layoutComponent: React.FC<{ activeMenu: number; children: ReactNode }>;
  subMenuComponent: React.FC<{
    typeId: string;
    subMenuItems: any[];
    activeSubMenu?: number | null;
    setActiveType: (path: string) => void;
    activeType?: number;
  }>;
  activeMenu: number;
  activeSubMenu?: number | null;
  subMenuItems: any[];
  children: ReactNode;
  activeType?: number;
  baseUrl: string;
}

// Memoized layout to prevent rerendering unless relevant props change
const OtherLayout: React.FC<OtherLayoutProps> = memo(
  ({ layoutComponent: LayoutComponent, subMenuComponent: SubMenuComponent, activeMenu, activeSubMenu, subMenuItems, children, activeType, baseUrl }) => {
    const router = useRouter();
    const { typeId } = router.query;

    return (
      <LayoutComponent activeMenu={activeMenu}>
        <Box display="flex" flexDirection="column" gap={2} paddingY={4}>
          <Grid container spacing={3}>
            {/* Sidebar with SubMenu */}
            <Grid item xs={12} md={3}>
              <Card elevation={1}>
                <SubMenuComponent
                  typeId={String(typeId)}
                  subMenuItems={subMenuItems}
                  activeSubMenu={activeSubMenu}
                  setActiveType={(path) => router.push(path)}
                  activeType={activeType}
                />
              </Card>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={9}>
              {children}
            </Grid>
          </Grid>
        </Box>
      </LayoutComponent>
    );
  },
  (prevProps, nextProps) => {
    // Prevent re-rendering if activeMenu, activeSubMenu, subMenuItems, and baseUrl haven’t changed
    return (
      prevProps.activeMenu === nextProps.activeMenu &&
      prevProps.activeSubMenu === nextProps.activeSubMenu &&
      prevProps.subMenuItems === nextProps.subMenuItems &&
      prevProps.baseUrl === nextProps.baseUrl &&
      prevProps.children === nextProps.children // Only rerender if children change
    );
  }
);

export default OtherLayout;
