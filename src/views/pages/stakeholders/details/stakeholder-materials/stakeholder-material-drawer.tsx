import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MaterialForm from './stakeholder-material-form';
import stakeholderMaterialApiService from 'src/services/stakeholder/stakeholder-material-service';
import type { StakeholderMaterial } from 'src/types/stakeholder/stackholder-material';
import type { StakeholderGeneralMaster } from 'src/types/general/general-master';

interface MaterialDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  material: StakeholderMaterial;
  stakeholderId: string;
  materialCategories: StakeholderGeneralMaster[];
  materialSubcategories: StakeholderGeneralMaster[];
}

const MaterialDrawer = (props: MaterialDrawerType) => {
  const { open, toggle, refetch, material, stakeholderId, materialCategories, materialSubcategories } = props;

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    material_category_id: yup
      .string()
      .required('Material category is required')
      .matches(uuidRegex, 'Material category must be a valid UUID'),
    material_subcategory_id: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(uuidRegex, { message: 'Material subcategory must be a valid UUID', excludeEmptyString: true }),
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

  const getPayload = (values: StakeholderMaterial) => {
    const { material_category, material_subcategory, ...rest } = values;

    return {
      data: {
        ...rest,
        id: material?.id,
        stakeholder_id: stakeholderId,
        material_subcategory_id: values.material_subcategory_id === '' ? null : values.material_subcategory_id
      },
      files: []
    };
  };

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
            ...(material as StakeholderMaterial),
            material_category_id: material.material_category_id || material.material_category || '',
            material_subcategory_id: material.material_subcategory_id || material.material_subcategory || ''
          }}
          createActionFunc={isEdit ? editMaterial : createMaterial}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderMaterial>) => (
            <MaterialForm formik={formik} materialCategories={materialCategories} materialSubcategories={materialSubcategories} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MaterialDrawer;
