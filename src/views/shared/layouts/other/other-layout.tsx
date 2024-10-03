import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box, Card, Grid } from '@mui/material';

interface OtherLayoutProps {
  layoutComponent: React.FC<{ activeMenu: number; children: ReactNode }>;
  subMenuComponent: React.FC<{
    typeId: string;
    subMenuItems: any[];
    activeSubMenu?: number | null; // Allow it to be null or undefined
    setActiveType: (path: string) => void;
    activeType?: number;
  }>;
  activeMenu: number;
  activeSubMenu?: number | null; // Change this to match the type in OtherSubMenuProps
  subMenuItems: (baseUrl: string) => any[];
  children: ReactNode;
  activeType?: number;
  baseUrl: string;
}

const OtherLayout: React.FC<OtherLayoutProps> = ({
  layoutComponent: LayoutComponent,
  subMenuComponent: SubMenuComponent,
  activeMenu,
  activeSubMenu,
  subMenuItems,
  children,
  activeType,
  baseUrl
}) => {
  const router = useRouter();
  const { typeId } = router.query;

  return (
    <LayoutComponent activeMenu={activeMenu}>
      <Box display="flex" flexDirection="column" gap={1} paddingTop={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3.4}>
            <Card>
              <SubMenuComponent
                typeId={String(typeId)}
                subMenuItems={subMenuItems(baseUrl)}
                activeSubMenu={activeSubMenu}
                setActiveType={(path) => {
                  router.push(path);
                }}
                activeType={activeType}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8.6}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </LayoutComponent>
  );
};

export default OtherLayout;
