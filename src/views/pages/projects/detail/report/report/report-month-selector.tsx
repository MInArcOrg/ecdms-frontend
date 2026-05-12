import { Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import type { RefetchOptions } from '@tanstack/react-query';
import type { ProjectPlan } from 'src/types/project/project-plan';

interface ReportMonthSelectorProps {
  fetchData: (options?: RefetchOptions | undefined) => any;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  quarter: number | undefined;
  setQuarter: React.Dispatch<React.SetStateAction<number | undefined>>;
  availableYears: number[];
  projectPlans: ProjectPlan[];
  projectPlansLoading: boolean;
  selectedPlan: ProjectPlan | null;
  setSelectedPlan: React.Dispatch<React.SetStateAction<ProjectPlan | null>>;
}

const ReportMonthSelector = ({
  fetchData,
  date,
  setDate,
  quarter,
  setQuarter,
  availableYears,
  projectPlans,
  projectPlansLoading,
  selectedPlan,
  setSelectedPlan
}: ReportMonthSelectorProps) => {
  const selectedYear = date ? date.getFullYear() : undefined;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Select Report Year</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              style={{ width: 150 }}
              id="year"
              size="small"
              disableClearable
              options={availableYears}
              value={selectedYear}
              getOptionLabel={(option) => String(option)}
              onChange={(_event, newValue) => {
                const year = Number(newValue);
                setDate(new Date(year, 0, 1));
                setQuarter(undefined);
                setSelectedPlan(null);
              }}
              renderInput={(params) => <TextField {...params} placeholder="Year" />}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              style={{
                width: 150
              }}
              id="project-plan"
              size={'small'}
              disableClearable
              disabled={!selectedYear}
              options={projectPlans}
              loading={projectPlansLoading}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) => {
                const q = (option as any)?.quarter;
                const qLabel = q ? `Q${String(q)}` : '';
                return option.title ? `${qLabel} - ${option.title}` : qLabel || option.id;
              }}
              value={selectedPlan ?? undefined}
              onChange={(_event, newValue) => {
                setSelectedPlan(newValue);
                const q = newValue ? Number((newValue as any)?.quarter) : undefined;
                setQuarter(Number.isFinite(q) ? q : undefined);
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder={selectedYear ? 'Project Plan' : 'Select year first'} />
              )}
            />
          </Grid>
        </Grid>
        <Box display="flex" gap={1} pt={3}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={!selectedYear || !quarter}
            onClick={() => fetchData()}
          >
            Select
          </Button>
          <Button variant="contained" color="secondary" size="small">
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportMonthSelector;
