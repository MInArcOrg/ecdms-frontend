import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import ResourceForm from './resource-form';
import { IApiPayload } from 'src/types/requests';
import resourceApiService from 'src/services/resource/resource-service';
import { Resource } from 'src/types/resource';

interface ResourceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resource: Resource;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const ResourceDrawer = (props: ResourceDrawerType) => {
  // ** Props
  const { open, toggle, refetch, resource } = props;

  const isEdit = resource?.id ? true : false;
  const createResource = async (body: IApiPayload<Resource>) => {
    return await resourceApiService.create(body);
  };
  const editResource = async (body: IApiPayload<Resource>) => {
    return await resourceApiService.update(resource?.id || '', body);
  };

  const getPayload = (values: Resource) => {
    const payload = {
      data: {
        ...values,
        id: resource?.id,
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
    <CustomSideDrawer title={`department.resource.${isEdit ? 'edit-resource' : 'create-resource'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="department.resource.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resource as Resource}
          createActionFunc={isEdit ? editResource : createResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Resource>) => {
            return <ResourceForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceDrawer;
