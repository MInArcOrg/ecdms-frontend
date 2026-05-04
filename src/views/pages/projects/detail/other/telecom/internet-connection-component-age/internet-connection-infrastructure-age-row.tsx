import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { InternetConnectionInfrastructureAge } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: InternetConnectionInfrastructureAge;
}

export const internetConnectionInfrastructureAgeColumns = (
  onDetail: (internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge) => void,
  onEdit: (internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge) => void,
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
    headerName: t('project.other.internet-connection-infrastructure-age.details.internet-connection-id'),
    field: 'internet_connection_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.internetConnection?.internetConnectionType?.title || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.internet-connection-infrastructure-age.details.routers'),
    field: 'routers',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.routers?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.internet-connection-infrastructure-age.details.switches'),
    field: 'switches',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.switches?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.internet-connection-infrastructure-age.details.modems'),
    field: 'modems',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.modems?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.12,
    minWidth: 100,
    headerName: t('project.other.internet-connection-infrastructure-age.details.cables'),
    field: 'cables',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.cables?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.internet-connection-infrastructure-age.details.others'),
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
          model="InternetConnectionInfrastructureAge"
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
            subject: 'internetconnectioninfrastructureage'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'internetconnectioninfrastructureage'
          }}
        />
      </Fragment>
    )
  }
];
