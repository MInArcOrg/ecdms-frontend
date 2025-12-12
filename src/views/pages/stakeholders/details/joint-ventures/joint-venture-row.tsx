import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { JointVenture } from 'src/types/stakeholder/joint-venture';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: JointVenture;
}

export const jointVentureColumns = (
  onDetail: (jointVenture: JointVenture) => void,
  onEdit: (jointVenture: JointVenture) => void,
  onDelete: (id: string) => void,
  t: any,
  model: string
): GridColDef[] => [
    {
      flex: 0.2,
      minWidth: 200,
      field: 'name',
      headerName: t('stakeholder.joint-venture.name'),
      renderCell: ({ row }: CellType) => {
        return (
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
            {row.name}
          </Typography>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'member_companies_no',
      headerName: t('stakeholder.joint-venture.memberCompaniesNo'),
      renderCell: ({ row }: CellType) => row.member_companies_no
    },
    {
      flex: 0.3,
      minWidth: 200,
      field: 'description',
      headerName: t('stakeholder.joint-venture.description'),
      renderCell: ({ row }: CellType) => row.description
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'reference',
      headerName: t('stakeholder.joint-venture.reference'),
      renderCell: ({ row }: CellType) => row.reference || 'N/A'
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
            model="JointVenture"
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
              subject: model
            }}
            editPermissionRule={{
              action: 'update',
              subject: model
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
