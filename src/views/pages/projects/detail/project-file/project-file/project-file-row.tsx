import { Button, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import type { ProjectFile } from 'src/types/project/project-file';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectFile;
}

export const projectFileColumns = (
  onEdit: (item: ProjectFile) => void,
  onDelete: (id: string) => void,
  t: any,
  type: string
): GridColDef[] => {
  return [
    {
      flex: 0.25,
      minWidth: 200,
      headerName: t('Title'),
      field: 'title',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.title}</Typography>
    },
    {
      flex: 0.35,
      minWidth: 250,
      headerName: t('Description'),
      field: 'description',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.description ?? '-'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('Created At'),
      field: 'created_at',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.created_at ? formatCreatedAt(row.created_at) : '-'}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 130,
      headerName: t('File'),
      field: 'file',
      sortable: false,
      renderCell: ({ row }: CellType) => (
        <Button size="small">
          <FileDrawer id={row.id} type={type} />
        </Button>
      )
    },
    {
      flex: 0.15,
      minWidth: 100,
      headerName: t('Actions'),
      field: 'actions',
      sortable: false,
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'projectdocument'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'projectdocument'
          }}
          options={[]}
        />
      )
    }
  ];
};
