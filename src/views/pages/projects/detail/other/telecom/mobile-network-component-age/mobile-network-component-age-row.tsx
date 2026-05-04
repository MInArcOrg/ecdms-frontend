import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { MobileNetworkComponentAge } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: MobileNetworkComponentAge;
}

export const mobileNetworkComponentAgeColumns = (
  onDetail: (mobileNetworkComponentAge: MobileNetworkComponentAge) => void,
  onEdit: (mobileNetworkComponentAge: MobileNetworkComponentAge) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
    renderCell: ({ row }: CellType) => (
      <Typography
        noWrap
        component={Button}
        onClick={() => onDetail(row)}
        sx={{
          fontWeight: 500,
          textDecoration: 'none',
          color: 'text.secondary',
          '&:hover': { color: 'primary.main' }
        }}
      >
        t('common.table-columns.details')
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.mobile-network-component-age.details.mobile-network-id'),
    field: 'mobile_network_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.mobile_network_id || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.mobile-network-component-age.details.cell'),
    field: 'cell',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.cell?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.mobile-network-component-age.details.towers'),
    field: 'towers',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.towers?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.mobile-network-component-age.details.antennas'),
    field: 'antennas',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.antennas?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.mobile-network-component-age.details.base-stations'),
    field: 'base_stations',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.base_stations?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.mobile-network-component-age.details.repeaters'),
    field: 'repeaters',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.repeaters?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.mobile-network-component-age.details.switches'),
    field: 'switches',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.switches?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.mobile-network-component-age.details.others'),
    field: 'others',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.others || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="MobileNetworkComponentAge"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
          title=""
          postAction={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'mobilenetworkcomponentage'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'mobilenetworkcomponentage'
          }}
        />
      </Fragment>
    )
  }
];
