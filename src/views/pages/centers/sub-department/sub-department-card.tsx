import { Typography } from '@mui/material';
import Link from 'next/link';
import Department from 'src/types/department/department';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

const DepartmentCard = ({
  department,
  onEdit,
  onDelete,
  refetch,
  t
}: {
  department: Department;
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}) => {
  return (
    <SharedItemViewCard
      createdAt={department.created_at}
      t={t}
      actions={
        <>
          <FileDrawer id={department.id} type="DEPARTMENT" />
          <ModelActionComponent
            model="Department"
            model_id={department.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(department.id)}
            item={department}
            deletePermissionRule={{ action: 'delete', subject: 'department' }}
            editPermissionRule={{ action: 'update', subject: 'department' }}
            options={[]}
          />
        </>
      }
    >
      <Typography
        variant="h5"
        component={Link}
        href={`/departments/sub-departements/${department.id}`}
        sx={{ textDecoration: 'none', color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        {department?.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '1rem', lineHeight: 1.5 }}>
        {department.description || t('common.not-available')}
      </Typography>
    </SharedItemViewCard>
  );
};

export default DepartmentCard;
