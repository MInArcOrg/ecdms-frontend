import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { MobileNetwork } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: MobileNetwork;
}

export const mobileNetworkColumns = (
  onDetail: (mobileNetwork: MobileNetwork) => void,
  onEdit: (mobileNetwork: MobileNetwork) => void,
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
          {row?.name || `$t('common.table-columns.details')`}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('project.other.mobile-network.details.name'),
      field: 'name',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.name || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.mobile-network.details.mobile-network-type'),
      field: 'mobile_network_type_id',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.mobilenetworktype.title || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 100,
      headerName: t('project.other.mobile-network.details.cell-towers'),
      field: 'cell_towers',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.cell_towers ? t('common.yes') : t('common.no')}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 100,
      headerName: t('project.other.mobile-network.details.antennas'),
      field: 'antennas',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.antennas ? t('common.yes') : t('common.no')}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 100,
      headerName: t('project.other.mobile-network.details.base-stations'),
      field: 'base_stations',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.base_stations ? t('common.yes') : t('common.no')}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 100,
      headerName: t('project.other.mobile-network.details.repeaters'),
      field: 'repeaters',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.repeaters ? t('common.yes') : t('common.no')}</Typography>
      )
    },
    {
      flex: 0.12,
      minWidth: 100,
      headerName: t('project.other.mobile-network.details.switches'),
      field: 'switches',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.switches ? t('common.yes') : t('common.no')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.mobile-network.details.others'),
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
            model="MobileNetwork"
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
              subject: 'mobilenetwork'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'mobilenetwork'
            }}
          />
        </Fragment>
      )
    }
  ];
