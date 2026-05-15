import { FormikProps } from 'formik';
import React, { useState } from 'react';
import resourceQuantityApiService from 'src/services/resource/resource-quantity-service';
import { uploadFile, uploadableResourceFileTypes } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceQuantity } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourceQuantityForm from './resource-quantity-form';

interface ResourceQuantityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceQuantity: ResourceQuantity;
}

const validationSchema = yup.object().shape({
  resource_brand_id: yup.string().required('Brand is required'),
  resource_specification_id: yup.string().required('Specification is required'),
  supplier_name_id: yup.string().required('Supplier Name is required'),
  supplier_address_id: yup.string().required('Supplier Address is required'),
  quality_id: yup.string().required('Quality is required'),
  total_quantity_available: yup.number().nullable(),
  price_date: yup.date().nullable(),
  unit_price_id: yup.string().nullable(),
  remark: yup.string().nullable()
});

const ResourceQuantityDrawer: React.FC<ResourceQuantityDrawerType> = (props) => {
  const { open, toggle, refetch, resourceQuantity, resourceId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = resourceQuantity?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createResourceQuantity = async (body: IApiPayload<ResourceQuantity>) => {
    return await resourceQuantityApiService.create(body);
  };

  const editResourceQuantity = async (body: IApiPayload<ResourceQuantity>) => {
    return await resourceQuantityApiService.update(resourceQuantity?.id || '', body);
  };

  const getPayload = (values: ResourceQuantity) => ({
    data: {
      ...values,
      id: resourceQuantity?.id,
      resource_id: resourceId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ResourceQuantity>, payload: IApiPayload<ResourceQuantity>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableResourceFileTypes.resourceQuantity, response?.payload?.id || '', '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`resource.resource-quantity.${isEdit ? 'edit-resource-quantity' : 'create-resource-quantity'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.resource-quantity.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resourceQuantity}
          createActionFunc={isEdit ? editResourceQuantity : createResourceQuantity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceQuantity>) => {
            return (
              <ResourceQuantityForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                resourceId={resourceId}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceQuantityDrawer;
