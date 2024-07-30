import { TableCell, TableRow, Typography } from '@mui/material';
import CustomChip from 'src/@core/components/mui/chip';
import { ThemeColor } from 'src/@core/layouts/types';

interface StatusRowProps {
  label: string;
  value: number | string;
  chipColor: ThemeColor;
  chipLabel: string;
  chipName?: string;
  days?: number;
  status?: string;
  t: (key: string) => string;
}

const StatusRow: React.FC<StatusRowProps> = ({ label, value, chipColor, chipLabel, chipName, days, status, t }) => (
  <TableRow>
    <TableCell>
      <Typography variant="subtitle2">{t(label)}</Typography>
    </TableCell>
    <TableCell align="right">
      <CustomChip rounded size="small" color={chipColor} label={chipLabel} />
      {chipName ? ` ${chipName}` : ''} {days} days {days && days <= 0 ? t('passed') : t('left')}
      <Typography variant="subtitle2">{value}</Typography>
    </TableCell>
  </TableRow>
);

export default StatusRow;
