import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import { MasterType } from 'src/types/master/master-types';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import MasterTypeForm from './master-type-form';

interface MasterTypeDrawerType {
open: boolean;
toggle: () => void;
refetch: () => void;
masterData: MasterType;
model:string;
}

const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required()
});

const MasterTypeDrawer = (props: MasterTypeDrawerType) => {
// ** Props
const { open, toggle, refetch, masterData } = props;

const isEdit = masterData?.id ? true : false;
const createMasterType = async (body: { data: MasterType; files: [] }) => {
  await masterTypeApiService.create(props.model,body);
};
const editMasterType = async (body: { data: MasterType; files: [] }) => {
  await masterTypeApiService.update(props.model,masterData?.id || '', body);
};

const getPayload = (values: MasterType) => {
  const payload = {
    data: {
      id: masterData?.id,
      title: values.title,
      description: values.description,
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
  <CustomSideDrawer title={`master-data.${isEdit ? 'edit-master-type' : 'create-master-type'}`} handleClose={handleClose} open={open}>
    {() => (
      <FormPageWrapper
        edit={isEdit}
        title="master-data.title"
        getPayload={getPayload}
        validationSchema={validationSchema}
        initialValues={masterData as MasterType}
        createActionFunc={isEdit ? editMasterType : createMasterType}
        onActionSuccess={onActionSuccess}
        onCancel={handleClose}
      >
        {(formik: FormikProps<MasterType>) => {
          return <MasterTypeForm formik={formik} defaultLocaleData={{} as MasterType} />;
        }}
      </FormPageWrapper>
    )}
  </CustomSideDrawer>
);
};

export default MasterTypeDrawer;
