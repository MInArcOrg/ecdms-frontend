import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProfessionalAdditionalInfo } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProfessionalAdditionalInfo;
}

export const additionalInfoColumns = (
  onDetail: (additionalInfo: ProfessionalAdditionalInfo) => void,
  onEdit: (additionalInfo: ProfessionalAdditionalInfo) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.3,
    minWidth: 200,
    field: 'additional_information',
    headerName: t('resources.professional.additional-info.information'),
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
        {row.additional_information || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'reference',
    headerName: t('resources.professional.additional-info.reference'),
    renderCell: ({ row }: CellType) => row.reference || t('common.not-available')
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
          model="ProfessionalAdditionalInfo"
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
            subject: 'professionaladditionalinformation'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'professionaladditionalinformation'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
