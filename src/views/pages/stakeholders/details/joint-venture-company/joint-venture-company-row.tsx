import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { JointVentureCompany } from 'src/types/stakeholder/joint-venture-company';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: JointVentureCompany;
}

export const jointVentureCompanyColumns = (
  onDetail: (jointVentureCompany: JointVentureCompany) => void,
  onEdit: (jointVentureCompany: JointVentureCompany) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'company_name',
    headerName: t('stakeholder.joint-venture-company.companyName'),
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
          {row.company_name}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'specialization',
    headerName: t('stakeholder.joint-venture-company.specialization'),
    renderCell: ({ row }: CellType) => row.specialization || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'ownership_percentage',
    headerName: t('stakeholder.joint-venture-company.ownershipPercentage'),
    renderCell: ({ row }: CellType) => (row.ownership_percentage ? `${row.ownership_percentage}%` : t('common.not-available'))
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: 'description',
    headerName: t('stakeholder.joint-venture-company.description'),
    renderCell: ({ row }: CellType) => row.description
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
          model="JointVentureCompany"
          model_id={row?.id || ''}
          refetchModel={() => {}}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row?.id || '')}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'jointventurecompany'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'jointventurecompany'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
