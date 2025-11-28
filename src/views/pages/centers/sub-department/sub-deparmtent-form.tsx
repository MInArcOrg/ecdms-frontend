import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import addressmasterApiService from 'src/services/admin/address-master-service';
import departmentApiService from 'src/services/department/department-service';
import Department from 'src/types/department/department';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface SubDepartmentFormProps {
  formik: FormikProps<Department>;
  parentDepartmentId: string;
  defaultLocaleData?: Department;
}

const SubDepartmentForm: React.FC<SubDepartmentFormProps> = ({ formik, defaultLocaleData, parentDepartmentId }) => {
  const { t: transl } = useTranslation();
  const { data: parentDepartment } = useQuery({
    queryKey: ['parent-department', parentDepartmentId],
    queryFn: () => departmentApiService.getOne(parentDepartmentId, {})
  });
  const { data: addresses } = useQuery({
    queryKey: ['general-master', parentDepartment?.payload?.address_id],
    queryFn: () => addressmasterApiService.getAll(dropDownConfig({ filter: { parent_address_id: parentDepartment?.payload?.address_id, is_root: parentDepartment?.payload?.address_id ? 0 : 1 } }))
  });
  console.log('parentDepartment?.payload?.address_id', parentDepartment?.payload?.address_id)
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('department.sub-department.form.name')}
        placeholder={transl('department.sub-department.form.name')}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomSelectBox
        fullWidth
        label={transl('department.sub-department.form.address')}
        placeholder={transl('department.sub-department.form.address')}
        name="address_id"
        size="small"
        options={
          addresses?.payload?.map((address) => ({
            value: address.id,
            label: address.title
          })) || []
        }
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('department.sub-department.form.description')}
        placeholder={transl('department.sub-department.form.description')}
        name="description"
        multiline
        rows={3}
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default SubDepartmentForm;
