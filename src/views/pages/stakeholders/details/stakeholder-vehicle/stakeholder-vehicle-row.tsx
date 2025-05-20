import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderVehicle } from 'src/types/stakeholder/stakeholder-vehicle';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderVehicle;
}

export const vehicleColumns = (
  onDetail: (vehicle: StakeholderVehicle) => void,
  onEdit: (vehicle: StakeholderVehicle) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
    {
      flex: 0.2,
      minWidth: 200,
      field: 'vehicle_name',
      headerName: t('stakeholder.stakeholder-vehicle.form.vehicleName'),
      renderCell: ({ row }: CellType) => (
        <Typography
          noWrap
          component={Button}
          onClick={() => onDetail(row)} sx={{
            fontWeight: 500,
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {row.vehicle_name}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'plate_number',
      headerName: t('stakeholder.stakeholder-vehicle.form.plateNumber'),
      renderCell: ({ row }: CellType) => row.plate_number
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'brand_name',
      headerName: t('stakeholder.stakeholder-vehicle.form.brandName'),
      renderCell: ({ row }: CellType) => row.brand_name || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'model',
      headerName: t('stakeholder.stakeholder-vehicle.form.model'),
      renderCell: ({ row }: CellType) => row.model
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'year',
      headerName: t('stakeholder.stakeholder-vehicle.form.year'),
      renderCell: ({ row }: CellType) => row.year || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'chassis_number',
      headerName: t('stakeholder.stakeholder-vehicle.form.chassisNumber'),
      renderCell: ({ row }: CellType) => row.chassis_number
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'engine_number',
      headerName: t('stakeholder.stakeholder-vehicle.form.engineNumber'),
      renderCell: ({ row }: CellType) => row.engine_number
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'capacity',
      headerName: t('stakeholder.stakeholder-vehicle.form.capacity'),
      renderCell: ({ row }: CellType) => row.capacity || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'purpose',
      headerName: t('stakeholder.stakeholder-vehicle.form.purpose'),
      renderCell: ({ row }: CellType) => row.purpose || t('common.not-available')
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'quantity',
      headerName: t('stakeholder.stakeholder-vehicle.form.quantity'),
      renderCell: ({ row }: CellType) => row.quantity || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'current_situation',
      headerName: t('stakeholder.stakeholder-vehicle.form.currentSituation'),
      renderCell: ({ row }: CellType) => row.current_situation || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'location',
      headerName: t('stakeholder.stakeholder-vehicle.form.location'),
      renderCell: ({ row }: CellType) => row.location || t('common.not-available')
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
            model="StakeholderVehicle"
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
              subject: 'stakeholdervehicle'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'stakeholdervehicle'
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
