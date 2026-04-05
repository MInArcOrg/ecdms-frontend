import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { MachineryInformation } from 'src/types/resource/index';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface CellType {
  row: MachineryInformation;
}

const NameCell = ({ row }: CellType) => {
  const router = useRouter();
  const { typeId } = router.query;

  return (
    <Typography
      component={Link}
      href={`/resources/${typeId}/details/${row.id}/general-info`}
      sx={{
        fontWeight: 500,
        textDecoration: 'none',
        color: 'text.secondary',
        '&:hover': { color: 'primary.main' }
      }}
    >
      {`${row.plate_no || ''}`}
    </Typography>
  );
};

export const machineryInformationColumns = (
  onEdit: (machineryInformation: MachineryInformation) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'plate_no',
    headerName: t('Plate No'),
    renderCell: ({ row }: CellType) => <NameCell row={row} />
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'type',
    headerName: t('Type'),
    renderCell: ({ row }: CellType) => row.type
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'owner_name',
    headerName: t('Owner Name'),
    renderCell: ({ row }: CellType) => row.owner_name
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'make_model',
    headerName: t('Make / Model'),
    renderCell: ({ row }: CellType) => `${row.make || ''}${row.model ? ` • ${row.model}` : ''}`
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'manufacture_year',
    headerName: t('Year'),
    renderCell: ({ row }: CellType) => row.manufacture_year
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
          model="MachineryInformation"
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
            subject: 'resource'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'resource'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
