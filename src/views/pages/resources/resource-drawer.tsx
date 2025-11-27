import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import ResourceForm from './resource-form';
import { IApiPayload } from 'src/types/requests';
import resourceApiService from 'src/services/resource/resource-service';
import { Resource } from 'src/types/resource';
import { MasterType } from 'src/types/master/master-types';
import { useTranslation } from 'react-i18next';

interface ResourceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resource: Resource;
  typeId: string;
  type: MasterType | undefined;
}

const validationSchema = yup.object().shape({
  parent_id: yup.string().nullable(),
  department_id: yup.string().nullable(),
  resourcecategory_id: yup.string().required('Resource category is required'),
  resourcesubcategory_id: yup.string().required('Resource subcategory is required'),
  name: yup.string().required('Name is required').max(100, 'Name cannot exceed 100 characters'),
  quantity_measurement_unit_id: yup.string().required('Quantity measurement unit is required'),
  quality_measurement_unit_id: yup.string().required('Quality measurement unit is required'),
  remark: yup.string().nullable()
});

const ResourceDrawer = (props: ResourceDrawerType) => {

  // ** Props
  const { open, toggle, refetch, resource, typeId,type } = props;

  const { t } = useTranslation();
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
        resourcetype_id: typeId
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
    const translatedTitle = t(`common.${isEdit ? 'edit' : 'create'}`)+" "+ type?.title+" "+t('resource.title');

  return (
    <CustomSideDrawer 
      translatedTitle={translatedTitle}
     handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
      translatedTitle={translatedTitle}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resource}
          createActionFunc={isEdit ? editResource : createResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Resource>) => {
            return <ResourceForm typeId={typeId} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceDrawer;
