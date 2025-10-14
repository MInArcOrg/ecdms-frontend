import {
  Box,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import Select from "@mui/material/Select";
import {
  getGeneralAnalysisByDepartment,
  getGeneralAnalytics,
} from "src/services/analytics/general";
import GeneralInfoApexChart from "src/views/analytics/Charts/generalInfo";
import { useEffect, useState } from "react";
import GeneralInfoByDepartment from "../Charts/general-department";
import { isArray } from "lodash";

const GeneralAnalysis = ({ module, types }) => {
  const [optionValue, setOptionValue] = useState(types[0].id);

  const [{ data, isLoading, error }] = getGeneralAnalytics(
    module.identifier,
    optionValue
  );

  const [
    {
      data: departmentData,
      isLoading: departmentLoading,
      error: departmentError,
    },
  ] = getGeneralAnalysisByDepartment(module.identifier, optionValue);

  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <CardContent
          sx={{
            gap: 4,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              gap: 4,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <FormControl size="small">
              <InputLabel id="invoice-status-select">Select Type</InputLabel>
              <Select
                sx={{ pr: 4 }}
                value={optionValue}
                label="Select Type"
                labelId="invoice-status-select"
                onChange={(e) => setOptionValue(e.target.value)}
              >
                {types.map((type, index) => (
                  <MenuItem key={index} value={type.id}>
                    {type.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <Grid container spacing={6} className="match-height">
          {/* <PageHeader
              title={<Typography variant='h5'>React ApexCharts</Typography>}
              subtitle={<Typography variant='body2'>React Component for ApexCharts</Typography>}
            /> */}

          <Grid item xs={12} md={4}>
            <GeneralInfoApexChart
              labels={data?.list ? Object.keys(data.list) : []}
              series={data?.list ? Object.values(data.list) : []}
              title={data?.type}
              total={data?.total}
              subtitle=""
            />{" "}
          </Grid>
          <Grid item xs={12} md={8}>
            {departmentData?.departments && (
              <AnalaysisByDepartment
                loading={departmentError}
                error={departmentError}
                data={departmentData}
              />
            )}
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  );
};

const AnalaysisByDepartment = ({ data, loading, error }) => {
  const labels = data?.departments?.map(
    (department) => department.split(" ")[0]
  );

  const series = Object.entries(data?.list || {}).map(
    ([key, { departments }]) => ({
      name: key,
      data: Object.values(departments || {}),
    })
  );

  return (
    <div>
      {series?.length > 1 && (
        <GeneralInfoByDepartment
          loading={loading}
          error={error}
          series={series}
          labels={labels}
        />
      )}
    </div>
  );
};

export default GeneralAnalysis;
