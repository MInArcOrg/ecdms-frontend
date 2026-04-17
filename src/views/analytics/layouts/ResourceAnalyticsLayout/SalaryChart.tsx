// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// ** React & Chart.js Imports
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

// ✅ Register everything required by the line chart
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

const PALETTE = [
  '#7367F0',
  '#00CFE8',
  '#28C76F',
  '#EA5455',
  '#FF9F43',
  '#1E9FF2',
  '#9F44D3'
];

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

type SalaryRow = {
  region: string;
  totalPublc: number;
  totalPrivate: number;
  malePblic: number;
  femalePublic: number;
  malePrivate: number;
  femalePrivate: number;
  totalAverage: number;
};

const SalaryChart = ({ years, regions, baseYear, inflation, rowsOverride, seedKey }: any) => {
  const [data, setData] = useState<any>({ labels: [], datasets: [] });
  const theme = useTheme();

  const white = '#fff';
  const success = '#d4e157';
  const borderColor = theme.palette.divider;
  const labelColor = theme.palette.text.disabled;
  const legendColor = theme.palette.text.secondary;

  const legends = [
    'Total Public Sector',
    'Male Public Sector',
    'Female Public Sector',
    'Total Average',
    'Total Private Sector',
    'Male Private Sector',
    'Female Private Sector'
  ];

  const legendToKey: Record<string, keyof SalaryRow> = {
    'Total Public Sector': 'totalPublc',
    'Male Public Sector': 'malePblic',
    'Female Public Sector': 'femalePublic',
    'Total Average': 'totalAverage',
    'Total Private Sector': 'totalPrivate',
    'Male Private Sector': 'malePrivate',
    'Female Private Sector': 'femalePrivate'
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: { color: borderColor }
      },
      y: {
        min: 0,
        max: 300,
        ticks: { stepSize: 50, color: labelColor },
        grid: { color: borderColor }
      }
    },
    plugins: {
      legend: {
        align: 'start',
        position: 'left',
        labels: {
          padding: 20,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  };

  useEffect(() => {
    if (regions?.length > 0) {
      const rows: SalaryRow[] =
        rowsOverride?.length
          ? rowsOverride
          : regions.map((region: any, index: number) => {
              const regionName = String(region.name ?? region.title ?? region.label ?? `Region ${index + 1}`);
              const baseSeed = hashString(`${seedKey || 'salary'}:${String(baseYear ?? '')}`);
              const rand = mulberry32(hashString(`${baseSeed}:${regionName}:${index}`));

              const totalPublc = 8000 + Math.floor(rand() * 17000);
              const totalPrivate = 7000 + Math.floor(rand() * 20000);
              const malePblic = Math.round(totalPublc * (0.55 + rand() * 0.15));
              const femalePublic = Math.max(0, totalPublc - malePblic);
              const malePrivate = Math.round(totalPrivate * (0.6 + rand() * 0.18));
              const femalePrivate = Math.max(0, totalPrivate - malePrivate);
              const totalAverage = Math.round((totalPublc + totalPrivate) / 2);

              return {
                region: regionName,
                totalPublc,
                totalPrivate,
                malePblic,
                femalePublic,
                malePrivate,
                femalePrivate,
                totalAverage
              };
            });

      setData({
        labels: rows.map((r) => r.region),
        datasets: legends.map((legend, index) => ({
          label: legend,
          fill: false,
          tension: 0.4,
          pointRadius: 2,
          hidden: index > 3,
          borderColor: PALETTE[index % PALETTE.length],
          backgroundColor: PALETTE[index % PALETTE.length],
          pointHoverBorderWidth: 4,
          pointHoverBorderColor: white,
          pointHoverBackgroundColor: success,
          data: rows.map((r) => r[legendToKey[legend]])
        }))
      });
    }
  }, [regions, rowsOverride, seedKey, baseYear]);

  return (
    <Card>
      <CardContent>{data?.datasets?.length > 0 && <Line data={data} height={350} options={options as any} />}</CardContent>
    </Card>
  );
};

export default SalaryChart;
