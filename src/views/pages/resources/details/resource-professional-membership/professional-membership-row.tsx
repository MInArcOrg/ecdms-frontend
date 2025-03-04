import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProfessionalMembership } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProfessionalMembership;
}

export const membershipColumns = (
  onDetail: (membership: ProfessionalMembership) => void,
  onEdit: (membership: ProfessionalMembership) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
    {
      flex: 0.25,
      minWidth: 250,
      field: 'association_name',
      headerName: t('resources.professional.association-membership.association-name'),
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
          {row.association_name}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'membership_type',
      headerName: t('resources.professional.association-membership.membership-type'),
      renderCell: ({ row }: CellType) => row.membership_type || t('common.not-available')
    },
    {
      flex: 0.2,
      minWidth: 160,
      field: 'position',
      headerName: t('resources.professional.association-membership.position'),
      renderCell: ({ row }: CellType) => row.position || t('common.not-available')
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'description',
      headerName: t('resources.professional.association-membership.description'),
      renderCell: ({ row }: CellType) => row.description.substring(0, 50) + '...' || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'created_at',
      headerName: t('common.created-at'),
      renderCell: ({ row }: CellType) => formatCreatedAt(row.created_at)
    },
    {
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction
            model="ProfessionalMembership"
            model_id={row?.id || ''}
            refetchModel={() => { }}
            resubmit={() => { }}
            title=""
            postAction={() => { }}
          />
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row?.id || '')}
            item={row}
            deletePermissionRule={{
              action: 'delete',
              subject: 'ProfessionalMembership'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'ProfessionalMembership'
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
