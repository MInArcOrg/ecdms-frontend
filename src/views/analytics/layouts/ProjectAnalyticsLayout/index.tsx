import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import DetailMenu from "./DetailMenu";
import { menuItems } from "./tabs";

function ProjectAnalyticsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { } = router.query;
  const baseUrl = "/analytics/project";

  return (
    <Box>
      <DetailMenu
        menuItems={menuItems(baseUrl)}
        activeMenu={router.pathname}
        setActiveMenu={(path) => {
          router.push(path);
        }}
      />
      <Box display="flex" flexDirection="column" gap={1} paddingTop={5}>
        <Grid item md={12} xs={12}>
          {children}
        </Grid>
      </Box>
    </Box>
  );
}

export default ProjectAnalyticsLayout;
