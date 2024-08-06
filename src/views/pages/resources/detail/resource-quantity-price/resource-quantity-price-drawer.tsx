import { FormikProps } from 'formik';
import React, { useState } from 'react';
import resourceQuantityPriceApiService from 'src/services/resource/resource-quantity-price-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceQuantityPrice } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourceQuantityPriceForm from './resource-quantity-price-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';

interface ResourceQuantityPriceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceQuantityPrice: ResourceQuantityPrice;
}

const validationSchema = yup.object().shape({
  detailresourcetype_id: yup.string().required(),
  resourcebrand_id: yup.string().required(),
  quantity: yup.number().required(),
  unit_price: yup.number().required(),
  store_address: yup.string().required(),
  datasource: yup.string().required()
});

const ResourceQuantityPriceDrawer: React.FC<ResourceQuantityPriceDrawerType> = (props) => {
  const { open, toggle, refetch, resourceQuantityPrice, resourceId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = resourceQuantityPrice?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createResourceQuantityPrice = async (body: IApiPayload<ResourceQuantityPrice>) => {
    return await resourceQuantityPriceApiService.create(body);
  };

  const editResourceQuantityPrice = async (body: IApiPayload<ResourceQuantityPrice>) => {
    return await resourceQuantityPriceApiService.update(resourceQuantityPrice?.id || '', body);
  };

  const getPayload = (values: ResourceQuantityPrice) => ({
    data: {
      ...values,
      id: resourceQuantityPrice?.id,
      resource_id: resourceId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ResourceQuantityPrice>, payload: IApiPayload<ResourceQuantityPrice>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableResourceFileTypes.resourceQuantityPrice, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`resource.resource-quantity-price.${isEdit ? 'edit-resource-quantity-price' : 'create-resource-quantity-price'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.resource-quantity-price.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resourceQuantityPrice as ResourceQuantityPrice}
          createActionFunc={isEdit ? editResourceQuantityPrice : createResourceQuantityPrice}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceQuantityPrice>) => {
            return (
              <ResourceQuantityPriceForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                resourceId={resourceId}
                defaultLocaleData={{} as ResourceQuantityPrice}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceQuantityPriceDrawer;
