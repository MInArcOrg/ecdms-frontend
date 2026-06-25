import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderMaterial } from 'src/types/stakeholder/stackholder-material';
import type { StakeholderGeneralMaster } from 'src/types/general/general-master';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderMaterial;
}

export const materialColumns = (
  onDetail: (material: StakeholderMaterial) => void,
  onEdit: (material: StakeholderMaterial) => void,
  onDelete: (id: string) => void,
  t: any,
  materialCategories: StakeholderGeneralMaster[],
  materialSubcategories: StakeholderGeneralMaster[]
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'name',
    headerName: t('stakeholder.material.name'),
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
        {row.name}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'material_category_id',
    headerName: t('stakeholder.material.category'),
    renderCell: ({ row }: CellType) => {
      const categoryId = row.material_category_id || row.material_category || '';
      const category = materialCategories.find((cat) => cat.id === categoryId);
      return category?.title || t('common.not-available');
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'material_subcategory_id',
    headerName: t('stakeholder.material.subcategory'),
    renderCell: ({ row }: CellType) => {
      const subCategoryId = row.material_subcategory_id || row.material_subcategory || '';
      const subCategory = materialSubcategories.find((cat) => cat.id === subCategoryId);
      return subCategory?.title || t('common.not-available');
    }
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'quantity',
    headerName: t('stakeholder.material.quantity'),
    renderCell: ({ row }: CellType) => row.quantity || t('common.not-available')
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'unit_price',
    headerName: t('stakeholder.material.unit-price'),
    renderCell: ({ row }: CellType) => row.unit_price || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'location',
    headerName: t('stakeholder.material.location'),
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
          model="StakeholderMaterial"
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
            subject: 'stakeholdermaterial'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholdermaterial'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
