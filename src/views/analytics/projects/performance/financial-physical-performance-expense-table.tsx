import {
    Autocomplete,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import { formatCurrency } from 'src/utils/formatter/currency';

interface Region {
    id: string;
    name: string;
}

interface PerformanceTableProps {
    title: string;
    years: string[];
    year: string;
    setYear: (year: string) => void;
    regions: Region[];
    region: Region | null;
    setRegion: (region: Region | null) => void;
    performanceData?: {
        quarters: string[];
        planned: number[];
        actual: number[];
    };
}

const PerformanceTable = ({
    title,
    years,
    year,
    setYear,
    regions,
    region,
    setRegion,
    performanceData
}: PerformanceTableProps) => {
    const theme = useTheme();

    // Calculate percentage for each quarter
    const calculatePercent = (planned: number[], actual: number[]) =>
        planned.map((p, i) => {
            const a = actual[i] ?? 0;
            return p === 0 ? 0 : Number(((a / p) * 100).toFixed(0));
        });

    const quarters = performanceData?.quarters ?? ['Q1', 'Q2', 'Q3', 'Q4'];
    const planned = performanceData?.planned ?? [0, 0, 0, 0];
    const actual = performanceData?.actual ?? [0, 0, 0, 0];
    const percent = calculatePercent(planned, actual);

    return (
        <Card>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{title}</TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell colSpan={2}>

                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell />
                        <TableCell>Plan</TableCell>
                        <TableCell>Actual</TableCell>
                        <TableCell>%</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow sx={{ backgroundColor: theme.palette.customColors?.trackBg ?? '#f5f5f5' }}>
                        <TableCell>Total</TableCell>
                        <TableCell>{formatCurrency(planned.reduce((a, b) => a + b, 0))}</TableCell>
                        <TableCell>{formatCurrency(actual.reduce((a, b) => a + b, 0))}</TableCell>
                        <TableCell>{calculatePercent([planned.reduce((a, b) => a + b, 0)], [actual.reduce((a, b) => a + b, 0)])[0]}</TableCell>
                    </TableRow>

                    {quarters.map((q, idx) => (
                        <TableRow key={q}>
                            <TableCell>{q}</TableCell>
                            <TableCell>{formatCurrency(planned[idx])}</TableCell>
                            <TableCell>{formatCurrency(actual[idx])}</TableCell>
                            <TableCell>{percent[idx]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default PerformanceTable;
