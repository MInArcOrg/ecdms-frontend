import { Table, TableBody } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ThemeColor } from 'src/@core/layouts/types';
import StatusRow from './status-row';
interface Data {
  cpi?: number;
  cv?: number;
  spi?: number;
  sv?: number;
  repaid?: number;
  repaid_percent?: number;
  advance_bond?: number;
  performance_bond?: number;
  bid_bond?: number;
  advance_status?: { status: string; days: number };
  performance_status?: { status: string; days: number };
  bid_status?: { status: string; days: number };
  total_contract_amount?: number;
  paid_ipc?: number;
  financial_percent?: number;
  financial?: number;
  paid_percent?: number;
  paid?: number;
  time_percent?: number;
  time?: number;
}
interface StatusTableProps {
  projectData: Data;
  performanceConstants: {
    from: number;
    to: number;
    color: string;
    name: string;
    colorClass: string;
  }[];
}

const StatusTable: React.FC<StatusTableProps> = ({ projectData, performanceConstants }) => {
  const { t } = useTranslation();

  const color = (status?: string) => {
    switch (status) {
      case 'danger':
        return 'error';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      default:
        return 'primary';
    }
  };

  const cpiPer = performanceConstants.find((item) => item.from <= (projectData.cpi ?? 0) && item.to >= (projectData.cpi ?? 0));
  const spiPer = performanceConstants.find((item) => item.from <= (projectData.spi ?? 0) && item.to >= (projectData.spi ?? 0));
  const repaidPer = performanceConstants.find((item) => item.from <= (projectData.repaid ?? 0) && item.to >= (projectData.repaid ?? 0));

  return (
    <Table>
      <TableBody>
        <StatusRow
          label="CPI"
          value={projectData.cv ?? 0}
          chipColor={(cpiPer?.colorClass as ThemeColor) ?? 'primary'}
          chipLabel={`${projectData.cpi ? projectData.cpi.toFixed(2) : ''}%`}
          chipName={cpiPer?.name && projectData.cpi ? cpiPer.name : ''}
          t={t}
        />
        <StatusRow
          label="SPI"
          value={projectData.sv ?? 0}
          chipColor={(spiPer?.colorClass as ThemeColor) ?? 'primary'}
          chipLabel={`${projectData.spi ? projectData.spi.toFixed(2) : ''}%`}
          chipName={spiPer?.name && projectData.spi ? spiPer.name : ''}
          t={t}
        />
        <StatusRow
          label="Repaid Advanced"
          value={projectData.repaid ?? 0}
          chipColor={(repaidPer?.colorClass as ThemeColor) ?? 'primary'}
          chipLabel={`${projectData.repaid_percent ? projectData.repaid_percent : ''}%`}
          chipName={repaidPer?.name && projectData.repaid ? repaidPer.name : ''}
          t={t}
        />
        <StatusRow
          label="Advanced Bond"
          value={projectData.advance_bond ?? 0}
          chipColor={color(projectData.advance_status?.status)}
          chipLabel={projectData.advance_status?.status ?? ''}
          days={projectData.advance_status?.days}
          t={t}
        />
        <StatusRow
          label="Performance Bond"
          value={projectData.performance_bond ?? 0}
          chipColor={color(projectData.performance_status?.status)}
          chipLabel={projectData.performance_status?.status ?? ''}
          days={projectData.performance_status?.days}
          t={t}
        />
        <StatusRow
          label="Bid Bond"
          value={projectData.bid_bond ?? 0}
          chipColor={color(projectData.bid_status?.status)}
          chipLabel={projectData.bid_status?.status ?? ''}
          days={projectData.bid_status?.days}
          t={t}
        />
      </TableBody>
    </Table>
  );
};

export default StatusTable;
