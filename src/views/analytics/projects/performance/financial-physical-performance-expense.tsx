import { useTheme, Box, Card, CardContent, Grid, Switch, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import { useAuth } from 'src/hooks/useAuth';
import departmentApiService from 'src/services/department/department-service';
import PerformanceTable from './financial-physical-performance-expense-table';
import { formatCurrency } from 'src/utils/formatter/currency';
import { ApexOptions } from 'apexcharts';
import useLocalStorage from 'src/hooks/use-local-storage';
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants';

// -------------------- Types --------------------
interface SeriesData {
    name: string;
    data: number[];
}

interface FinancialPhysicalPerformanceExpenseProps {
    title: string;
    data?: SeriesData[]; // optional to protect against undefined
}

// -------------------- Component --------------------
const FinancialPhysicalPerformanceExpense = ({ title, data = [] }: FinancialPhysicalPerformanceExpenseProps) => {
    const theme = useTheme();
    const { user } = useAuth();
    const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);

    const [checked, setChecked] = useState(false);
    const [chartSeries, setChartSeries] = useState<SeriesData[]>(data);

    const years = ['2023', '2022', '2021', '2020', '2019', '2018'];
    const [year, setYear] = useState(years[0]);

    // Fetch departments
    const { data: labels } = useQuery({
        queryKey: ['departments', user?.id],
        queryFn: () =>
            departmentApiService.getAll({ filter: { parent_department_id: user?.department_id } }),
        enabled: !!user?.id && !dummyEnabled
    });

    const dummyRegions = [
        { id: 'd-1', name: 'Addis Ababa' },
        { id: 'd-2', name: 'Oromia' },
        { id: 'd-3', name: 'Amhara' },
        { id: 'd-4', name: 'SNNPR' }
    ];

    const [region, setRegion] = useState<any>(null);

    useEffect(() => {
        if (dummyEnabled) {
            setRegion(dummyRegions[0]);
            return;
        }
        if (labels?.payload?.length) setRegion(labels.payload[0]);
    }, [labels, dummyEnabled]);

    // -------------------- Helper: calculate percent --------------------
    const calculatePercent = (planned: number[], actual: number[]) => {
        return [
            {
                name: 'Performance (%)',
                data: planned.map((p, i) => {
                    const a = actual[i] ?? 0;
                    return p === 0 ? 0 : Number(((a / p) * 100).toFixed(0));
                })
            }
        ];
    };

    // -------------------- Handle chart toggle --------------------
    useEffect(() => {
        if (checked && data.length >= 2) {
            const planned = data[0]?.data ?? [];
            const actual = data[1]?.data ?? [];
            setChartSeries(calculatePercent(planned, actual));
        } else if (data.length) {
            // fallback to raw data, ensure each has `data` array
            setChartSeries(data.map(d => ({ name: d.name, data: d.data ?? [] })));
        } else {
            setChartSeries([]);
        }
    }, [checked, data]);

    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    const chartOptions: ApexOptions = {
        chart: { type: 'bar', height: 350 },
        plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: { categories: quarters, labels: { style: { colors: theme.palette.text.disabled } } },
        yaxis: { labels: { style: { colors: theme.palette.text.disabled } } },
        fill: { opacity: 1 },
        tooltip: { y: { formatter: (val: number) => formatCurrency(val) } },
        colors: [theme.palette.primary.main, theme.palette.secondary.main],
        legend: { show: true, position: 'bottom', labels: { colors: theme.palette.text.secondary } }
    };

    return (
        <Fragment>
            <Grid container spacing={3}>
                {/* Table */}
                <Grid item xs={12} md={6}>
                    <PerformanceTable
                        title={title}
                        regions={(dummyEnabled ? dummyRegions : labels?.payload) ?? []}
                        year={year}
                        setYear={setYear}
                        region={region}
                        setRegion={setRegion}
                        years={years}
                    />
                </Grid>

                {/* Chart */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Typography variant="subtitle2" sx={{ mt: 1, mr: 1 }}>
                                    Monthly Financial Amount
                                </Typography>
                                <Switch color="primary" checked={checked} onChange={() => setChecked(prev => !prev)} />
                                <Typography variant="subtitle2" sx={{ mt: 1, ml: 1 }}>
                                    Performance
                                </Typography>
                            </Box>

                            <ReactApexcharts options={chartOptions} series={chartSeries} type="bar" height={300} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default FinancialPhysicalPerformanceExpense;
