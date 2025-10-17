import { Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { RefetchOptions } from '@tanstack/react-query';
import moment from 'moment';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

interface ReportMonthSelectorProps {
  fetchData: (options?: RefetchOptions | undefined) => any;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  quarter: number | undefined;
  setQuarter: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const ReportMonthSelector = ({ fetchData, date, setDate, quarter, setQuarter }: ReportMonthSelectorProps) => {
  const CustomInput = forwardRef((props: any, ref: any) => {
    return <TextField size="small" fullWidth {...props} inputRef={ref} label={props.label || ''} autoComplete="off" />;
  });

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Select Report Month</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePickerWrapper width={150}>
              <DatePicker
                selected={date}
                required
                showYearDropdown
                showYearPicker
                dateFormat="yyyy"
                id="form-layouts-tabs-date"
                placeholderText="Year"
                customInput={<CustomInput />}
                onChange={(selectedDate) => {
                  setDate(moment(selectedDate).toDate());
                }}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              style={{
                width: 150
              }}
              id="quarter"
              size={'small'}
              disableClearable
              options={[1, 2, 3, 4]}
              getOptionLabel={(option) => (option ? `Q${option.toString()}` : '')}
              value={quarter}
              onChange={(event, newValue) => {
                setQuarter(newValue);
              }}
              renderInput={(params) => <TextField {...params} placeholder="Quarter" />}
            />
          </Grid>
        </Grid>
        <Box display="flex" gap={1} pt={3}>
          <Button variant="contained" color="primary" size="small" onClick={() => fetchData()}>
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
