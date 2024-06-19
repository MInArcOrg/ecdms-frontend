import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import { MasterCategory } from 'src/types/master/master-types';
import MasterCategoryForm from './master-category-form';
import masterCategoryApiService from 'src/services/master-data/master-category-service';

interface MasterCategoryDrawerType {
open: boolean;
toggle: () => void;
refetch: () => void;
masterData: MasterCategory;
model:string;
typeId?:string;
}

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required()
});

const MasterCategoryDrawer = (props: MasterCategoryDrawerType) => {
// ** Props
const { open, toggle, refetch, masterData } = props;

const isEdit = masterData?.id ? true : false;
const createMasterCategory = async (body: { data: MasterCategory; files: [] }) => {
  await masterCategoryApiService.create(props.model,body);
};
const editMasterCategory = async (body: { data: MasterCategory; files: [] }) => {
  await masterCategoryApiService.update(props.model,masterData?.id || '', body);
};

const getPayload = (values: MasterCategory) => {
  const payload = {
    data: {
      id: masterData?.id,
      title: values.title,
      description: values.description,
      [`${props.model}type_id`]:props.typeId
    },
    files: []
  };
  return payload;
};
const handleClose = () => {
  toggle();
  // formik.resetForm()
};
const onActionSuccess = () => {
  toggle();
  refetch();
  handleClose();
};
return (
  <CustomSideDrawer title={`master-data.${isEdit ? 'edit-master-category' : 'create-master-category'}`} handleClose={handleClose} open={open}>
    {() => (
      <FormPageWrapper
        edit={isEdit}
        title="master-data.master-category.master-category"
        getPayload={getPayload}
        validationSchema={validationSchema}
        initialValues={masterData as MasterCategory}
        createActionFunc={isEdit ? editMasterCategory : createMasterCategory}
        onActionSuccess={onActionSuccess}
        onCancel={handleClose}
      >
        {(formik: FormikProps<MasterCategory>) => {
          return <MasterCategoryForm formik={formik} defaultLocaleData={{} as MasterCategory} />;
        }}
      </FormPageWrapper>
    )}
  </CustomSideDrawer>
);
};

export default MasterCategoryDrawer;
