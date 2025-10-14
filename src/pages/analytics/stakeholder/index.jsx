// ** Custom Component Imports
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import { getTypes } from "src/store/master/stakeholders";
import ApexPolarChart from "src/views/analytics/Charts/ApexPolarChart";
import GeneralTypeGrowthRate from "src/views/analytics/Charts/General/GeneralTypeGrowthRate GeneralTypeGrowthRate";
import ReginalDistributionBarChart from "src/views/analytics/Charts/General/ReginalDistributionBarChart";
import GeneralCategoriesBarChart from "src/views/analytics/Charts/GeneralCategories";
import GeneralSubCategories from "src/views/analytics/General/SubCategories";
import TypeCardStat from "src/views/analytics/General/TypeCards";
import StakeholderAnalyticsLayout from "src/views/analytics/layouts/StakeholderAnalyticsLayout";
import { Box, useMediaQuery, Grid } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";

const CrmDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  const theme = useTheme();

  const { types } = useSelector((state) => state.masterStakeholder);
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const subCategories = [
    {
      progress: 67,
      percentage: "54.4%",
      title: "Level 1",
      progressColor: "primary",
    },
    {
      progress: 40,
      percentage: "14.6%",
      title: "Level 2",
      progressColor: "success",
    },
    {
      progress: 30,
      percentage: "6.1%",
      title: "Level 3",
      progressColor: "secondary",
    },
    {
      progress: 20,
      percentage: "8.0%",
      title: "Level 4",
      progressColor: "info",
    },
  ];

  return (
    <StakeholderAnalyticsLayout>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} spacing={6}>
            <div style={{ width: "100%", height: "auto" }}>
              <PerfectScrollbar options={{}}>
                <Box
                  sx={
                    desktop
                      ? {
                          display: "flex",
                          flexDirection: "row", // horizontal stacking
                          alignItems: "center", // vertical centering
                          gap: "20px", // gap between components
                        }
                      : {
                          display: "flex",
                          flexDirection: "column", // vertical stacking
                          gap: "20px", // gap between components
                        }
                  }
                  container
                  direction="row"
                  spacing={6}
                >
                  {types?.map((type, index) => {
                    return index ? (
                      <div item key={index}>
                        <TypeCardStat
                          sx={{
                            width: desktop ? "210px" : "100%",
                          }}
                          stats="24.67k"
                          chipText="+25.2%"
                          avatarColor="info"
                          chipColor="default"
                          title={type.title}
                          subtitle="Last week"
                          avatarIcon="tabler:chart-bar"
                        />
                      </div>
                    ) : null;
                  })}
                </Box>
              </PerfectScrollbar>
            </div>
          </Grid>
          <Grid item xs={12} sm={8} lg={4}>
            <GeneralTypeGrowthRate title={"Suppliers"} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ApexPolarChart
              title={"Suppliers"}
              labels={["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <GeneralCategoriesBarChart
              series={[
                {
                  name: "Level 1",
                  data: [90, 120, 55, 100, 80, 125, 175, 70, 88],
                },
                {
                  name: "Level 2",
                  data: [85, 100, 30, 40, 95, 90, 30, 110, 62],
                },
                {
                  name: "Level 3",
                  data: [85, 100, 30, 40, 95, 90, 30, 110, 62],
                },
                {
                  name: "Level 4",
                  data: [85, 100, 30, 40, 95, 90, 30, 110, 62],
                },
                {
                  name: "Level 5",
                  data: [85, 100, 30, 40, 95, 90, 30, 110, 62],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <GeneralSubCategories data={subCategories} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <ReginalDistributionBarChart title={"Level 1"} />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </StakeholderAnalyticsLayout>
  );
};

export default CrmDashboard;
