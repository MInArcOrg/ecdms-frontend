import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { EmployeeEducation } from 'src/types/stakeholder/employee-education';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: EmployeeEducation;
}

export const employeeEducationColumns = (
  onEdit: (employeeEducation: EmployeeEducation) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
) =>
  [
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.employee-education.form.year'),
      field: 'year',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{new Date(row.year).getFullYear()}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.employee-education.form.domain'),
      field: 'domain',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.domain}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.employee-education.form.nationality'),
      field: 'nationality',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.nationality as string}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.employee-education.form.male'),
      field: 'male',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.male}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.employee-education.form.female'),
      field: 'female',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.female}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('stakeholder.employee-education.form.total_employees'),
      field: 'total_employees',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.total_employees}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('common.table-columns.created-at'),
      field: 'created_at',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>;
      }
    },
    {
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction
            model="EmployeeEducation"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => {
              /* Handle resubmit action */
            }}
            title=""
            postAction={() => {
              /* Handle post action */
            }}
          />
          <RowOptions onEdit={() => onEdit(row)} onDelete={() => onDelete(row.id)} item={row} options={[]} />
        </Fragment>
      )
    }
  ] as GridColDef[];
