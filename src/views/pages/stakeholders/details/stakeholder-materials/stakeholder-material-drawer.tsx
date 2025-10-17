import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MaterialForm from './stakeholder-material-form';
import stakeholderMaterialApiService from 'src/services/stakeholder/stakeholder-material-service';
import type { StakeholderMaterial } from 'src/types/stakeholder/stackholder-material';

interface MaterialDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  material: StakeholderMaterial;
  stakeholderId: string;
  materialCategories: StakeholderMaterial[];
}

const MaterialDrawer = (props: MaterialDrawerType) => {
  const { open, toggle, refetch, material, stakeholderId, materialCategories } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    material_category: yup.string().required('Material category is required'),
    material_subcategory: yup.string(),
    description: yup.string(),
    purpose: yup.string(),
    quantity: yup.number().integer('Quantity must be an integer').positive('Quantity must be positive'),
    unit_price: yup.number().positive('Unit price must be positive'),
    current_situation: yup.string(),
    location: yup.string()
  });

  const isEdit = Boolean(material?.id);

  const createMaterial = async (body: IApiPayload<StakeholderMaterial>) => stakeholderMaterialApiService.create(body);

  const editMaterial = async (body: IApiPayload<StakeholderMaterial>) => stakeholderMaterialApiService.update(material?.id || '', body);

  const getPayload = (values: StakeholderMaterial) => ({
    data: {
      ...values,
      id: material?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = () => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.material.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.material.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(material as StakeholderMaterial)
          }}
          createActionFunc={isEdit ? editMaterial : createMaterial}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderMaterial>) => <MaterialForm formik={formik} materialCategories={materialCategories} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MaterialDrawer;
