import { FormikProps } from 'formik';
import React, { useState } from 'react';
import resourcePriceApiService from 'src/services/resource/resource-price-service';
import { uploadFile, uploadableResourceFileTypes } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourcePrice } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourcePriceForm from './resource-price-form';

interface ResourcePriceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourcePrice: ResourcePrice;
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

const ResourcePriceDrawer: React.FC<ResourcePriceDrawerType> = (props) => {
  const { open, toggle, refetch, resourcePrice, resourceId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = resourcePrice?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createResourcePrice = async (body: IApiPayload<ResourcePrice>) => {
    return await resourcePriceApiService.create(body);
  };

  const editResourcePrice = async (body: IApiPayload<ResourcePrice>) => {
    return await resourcePriceApiService.update(resourcePrice?.id || '', body);
  };

  const getPayload = (values: ResourcePrice) => ({
    data: {
      ...values,
      id: resourcePrice?.id,
      resource_id: resourceId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ResourcePrice>, payload: IApiPayload<ResourcePrice>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableResourceFileTypes.resourceType, response?.payload?.id || '', '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`resource.resource-price.${isEdit ? 'edit-resource-price' : 'create-resource-price'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.resource-price.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resourcePrice}
          createActionFunc={isEdit ? editResourcePrice : createResourcePrice}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourcePrice>) => {
            return (
              <ResourcePriceForm
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

export default ResourcePriceDrawer;
