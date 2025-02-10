import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderAdditionalInformation } from 'src/types/stakeholder/stakeholder-additional-information';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderAdditionalInformation;
}

export const additionalInformationColumns = (
  onDetail: (additionalInfo: StakeholderAdditionalInformation) => void,
  onEdit: (additionalInfo: StakeholderAdditionalInformation) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.3,
    minWidth: 200,
    field: 'additional_information',
    headerName: t('stakeholder.stakeholder-additional-information.additionalInformation'),
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
          {row.additional_information}
        </Typography>
      );
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'reference',
    headerName: t('stakeholder.stakeholder-additional-information.reference'),
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
          model="StakeholderAdditionalInformation"
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
            subject: 'stakeholderadditionalinformation'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholderadditionalinformation'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
