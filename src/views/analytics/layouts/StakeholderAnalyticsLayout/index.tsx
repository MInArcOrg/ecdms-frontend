import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import DetailMenu from "./DetailMenu";
import { menuItems } from "./tabs";

interface StakeholderAnalyticsLayoutProps {
  toggleForm?: () => void;
  activeMenu?: string;
  activeSubMenu?: string;
  subMenuItems?: any[];
  children: React.ReactNode;
}

const StakeholderAnalyticsLayout = ({
  toggleForm,
  activeMenu,
  activeSubMenu,
  subMenuItems,
  children,
}: StakeholderAnalyticsLayoutProps) => {
  const router = useRouter();

  const handleSetActiveMenu = (path: string) => {
    if (path && path !== router.pathname) {
      router.push(path);
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <DetailMenu
        menuItems={menuItems()}
        activeMenu={router.pathname}
        setActiveMenu={handleSetActiveMenu}
      />

      <Box sx={{ pt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StakeholderAnalyticsLayout;
