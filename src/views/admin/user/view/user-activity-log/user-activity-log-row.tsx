import type { GridColDef } from '@mui/x-data-grid';
import { UserActivityLog } from 'src/types/admin/user';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: UserActivityLog;
}

export const userActivityLogColumns = (t: any): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 150,
    field: 'action',
    headerName: t('department.user.activity-log.action'),
    renderCell: ({ row }: CellType) => row.action || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'module',
    headerName: t('department.user.activity-log.module'),
    renderCell: ({ row }: CellType) => row.module || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'target_type',
    headerName: t('department.user.activity-log.target-type'),
    renderCell: ({ row }: CellType) => row.target_type || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'target_id',
    headerName: t('department.user.activity-log.target-id'),
    renderCell: ({ row }: CellType) => row.target_id || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'ip_address',
    headerName: t('department.user.activity-log.ip-address'),
    renderCell: ({ row }: CellType) => row.ip_address || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'created_at',
    headerName: t('common.created-at'),
    renderCell: ({ row }: CellType) => formatCreatedAt(row.created_at)
  }
];
