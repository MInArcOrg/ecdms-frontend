import { CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import ReportDetailCard from './expense-detail-card';
import { useTranslation } from 'react-i18next';

// Define types for the props
interface Data {
  physical?: {
    actual?: number;
    planned?: number;
    percent?: number | string;
  };
  financial?: {
    actual?: number;
    planned?: number;
    percent?: number | string;
  };
  expense?: {
    actual?: number;
    planned?: number;
    percent?: number | string;
  };
  loss?: {
    actual?: number;
    planned?: number;
    percent?: number | string;
  };
}

interface ReportSummaryViewCardProps {
  data?: Data;
  detailData?: any;
  loading?: boolean;
}

function ReportSummaryViewCard({ data, detailData, loading }: ReportSummaryViewCardProps) {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | undefined>(undefined);
  const { t } = useTranslation();

  return (
    <CardContent>
      {open && <ReportDetailCard show={open} toggleDrawer={() => setOpen(!open)} data={selectedData} />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight="bold">{t('Report')}-2023</Typography>
            </TableCell>
            <TableCell>{t('Actual')}</TableCell>
            <TableCell>{t('Planned')}</TableCell>
            <TableCell>%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{t('Physical')}</TableCell>
            <TableCell>{data?.physical?.actual?.toFixed(2)}</TableCell>
            <TableCell>{data?.physical?.planned?.toFixed(2)}</TableCell>
            <TableCell>{data?.physical?.percent !== 'NaN' ? data?.physical?.percent : 0}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('Financial')}</TableCell>
            <TableCell>{data?.financial?.actual?.toFixed(2)}</TableCell>
            <TableCell>{data?.financial?.planned?.toFixed(2)}</TableCell>
            <TableCell>{data?.financial?.percent !== 'NaN' ? data?.financial?.percent : 0}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="primary.main"
                variant="body2"
                sx={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedData(detailData);
                  setOpen(!open);
                }}
              >
                {`${t('Project')} ${t('Expense')}`}
              </Typography>
            </TableCell>
            <TableCell>{data?.expense?.actual?.toFixed(2)}</TableCell>
            <TableCell>{data?.expense?.planned?.toFixed(2)}</TableCell>
            <TableCell>{data?.expense?.percent !== 'NaN' ? data?.expense?.percent : 0}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{`${t('Project')} ${t('Loss')}`}</TableCell>
            <TableCell>{data?.loss?.actual?.toFixed(2)}</TableCell>
            <TableCell>{data?.loss?.planned?.toFixed(2)}</TableCell>
            <TableCell>{data?.loss?.percent !== 'NaN' ? data?.loss?.percent : 0}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  );
}

export default ReportSummaryViewCard;
