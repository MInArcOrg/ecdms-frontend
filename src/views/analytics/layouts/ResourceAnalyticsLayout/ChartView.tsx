// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material';

// ** React Imports
import { useEffect, useState } from 'react';

// ** Third Party Imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// ** Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// --- Random color generator (ensures variety & readability)
const usedColors: string[] = [];

function randomColor() {
  let r: number, g: number, b: number;
  let colorDiff = Infinity;
  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    colorDiff = usedColors.reduce((minDiff, usedColor) => {
      const [ur, ug, ub] = usedColor.slice(4, -1).split(',').map(Number);
      const dr = Math.abs(r - ur);
      const dg = Math.abs(g - ug);
      const db = Math.abs(b - ub);
      const diff = Math.sqrt(dr ** 2 + dg ** 2 + db ** 2);
      return Math.min(minDiff, diff);
    }, Infinity);
  } while (
    (r <= 80 && g <= 80 && b <= 80) || // avoid too dark
    colorDiff < 40 // avoid too close colors
  );
  const newColor = `rgb(${r}, ${g}, ${b})`;
  usedColors.push(newColor);
  return newColor;
}

interface ChartViewProps {
  years: { id: number; name: string }[]; // from labels
  data: { label: string; data: number[] }[]; // from API
  baseYear: number; // index
  inflation?: boolean; // toggle for inflation calculation
}

const ChartView = ({ years, data, baseYear, inflation }: ChartViewProps) => {
  const theme = useTheme();
  const white = '#fff';
  const success = '#d4e157';
  const borderColor = theme.palette.divider;
  const labelColor = theme.palette.text.disabled;
  const legendColor = theme.palette.text.secondary;

  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });
  const [colors, setColors] = useState<string[]>([]);

  // Normalize or inflation calculation
  const computeValues = (values: number[]) => {
    const base = values[baseYear];
    if (!base || base === 0) return values.map(() => 0);
    return values.map((v) => {
      const val = inflation
        ? ((v - base) / base) * 100 // inflation difference %
        : (v / base) * 100; // growth ratio %
      return Number(val.toFixed(1));
    });
  };

  // Chart configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    scales: {
      x: {
        type: 'category',
        ticks: { color: labelColor },
        grid: { color: borderColor }
      },
      y: {
        type: 'linear',
        ticks: { stepSize: 50, color: labelColor },
        grid: { color: borderColor }
      }
    },
    plugins: {
      legend: {
        align: 'start' as const,
        position: 'left' as const,
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
    if (data?.length > 0 && years?.length > 0) {
      const newColors =
        colors.length > 0 ? colors : data.map(() => randomColor());

      const datasets = data.map((item, idx) => {
        const computed = computeValues(item.data);
        return {
          label: item.label,
          data: computed,
          fill: false,
          tension: 0.4,
          hidden: idx > 5, // hide all except first few by default
          pointRadius: 3,
          pointHoverRadius: 6,
          pointStyle: 'circle',
          borderColor: newColors[idx],
          backgroundColor: newColors[idx],
          pointBorderColor: 'transparent',
          pointHoverBackgroundColor: success,
          pointHoverBorderColor: white,
          pointHoverBorderWidth: 4
        };
      });

      setChartData({
        labels: years.map((y) => y.name),
        datasets
      });

      setColors(newColors);
    }
  }, [data, years, baseYear, inflation]);

  return (
    <Card>
      <CardContent>
        <Line data={chartData} height={350} options={options as any} />
      </CardContent>
    </Card>
  );
};

export default ChartView;
