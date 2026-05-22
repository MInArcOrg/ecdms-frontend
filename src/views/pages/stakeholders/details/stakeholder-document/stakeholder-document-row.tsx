// src/views/stakeholder/document/document-row.tsx

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { parseISO } from 'date-fns';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import type { FileTypeConfig } from './file-type-config';
import { StakeholderDocument } from 'src/types/stakeholder/other';

interface CellType {
  row: StakeholderDocument;
}

const entitySubject = 'stakeholder-document';

export const stakeholderDocumentColumns = (
  onDetail: (row: StakeholderDocument) => void,
  onEdit: (row: StakeholderDocument) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  model?: string,
  fileTypesConfig?: FileTypeConfig[]
): GridColDef[] => {
  const PRIMARY_FILE_TYPE = fileTypesConfig?.[0]?.type || 'STAKEHOLDER_DOCUMENT';


  return [
    {
      flex: 0.1,
      minWidth: 80,
      field: 'id',
      headerName: t('common.table-columns.id'),
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
          {t('common.table-columns.details') || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'title',
      headerName: t('stakeholder.document.details.title'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.title || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'document_type',
      headerName: t('stakeholder.document.details.document-type'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.document_type || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'author',
      headerName: t('stakeholder.document.details.author'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.author || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'publication_date',
      headerName: t('stakeholder.document.details.publication-date'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.publication_date ? formatDynamicDate((row.publication_date)) : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={PRIMARY_FILE_TYPE} />}</>
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      minWidth: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          <ModelAction
            model="StakeholderDocument"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'stakeholderdocument'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'stakeholderdocument'
            }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id as string)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];
};