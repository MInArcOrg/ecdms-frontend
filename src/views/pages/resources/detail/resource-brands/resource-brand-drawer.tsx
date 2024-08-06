import { FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import resourceBrandApiService from 'src/services/resource/resource-brand-service';
import { deletePhoto, useGetMultiplePhotos, uploadImage } from 'src/services/utils/file-utils';
import { FileWithId } from 'src/types/general/file';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceBrand } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourceBrandForm from './resource-brand-form';

interface ResourceBrandDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceBrand: ResourceBrand;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  datasource: yup.string().required(),
  description: yup.string().required()
});

const ResourceBrandDrawer: React.FC<ResourceBrandDrawerType> = (props) => {
  const { open, toggle, refetch, resourceBrand, resourceId } = props;

  const { data: fetchedImages } = useGetMultiplePhotos({ filter: { model_id: resourceBrand?.id || '' } });
  const [uploadableFiles, setUploadableFiles] = useState<FileWithId[]>([]);
  const [fetchedImageIds, setFetchedImageIds] = useState<string[]>([]);

  const isEdit = resourceBrand?.id ? true : false;

  const createResourceBrand = async (body: IApiPayload<ResourceBrand>) => {
    return await resourceBrandApiService.create(body);
  };

  const editResourceBrand = async (body: IApiPayload<ResourceBrand>) => {
    return await resourceBrandApiService.update(resourceBrand?.id || '', body);
  };

  useEffect(() => {
    const fetchAndConvertImages = async () => {
      if (fetchedImages) {
        const fetchedFiles = fetchedImages.payload.map(async (image) => {
          const response = await fetch(image.url);
          const blob = await response.blob();
          return { id: image.id, file: new File([blob], image.title || 'image', { type: blob.type }), isFetched: true };
        });
        const convertedFiles = await Promise.all(fetchedFiles);
        setUploadableFiles(convertedFiles);
        setFetchedImageIds(fetchedImages.payload.map((image) => image.id));
      }
    };

    if (open) {
      fetchAndConvertImages();
    }
  }, [fetchedImages, open]);

  const onFilesChange = (files: FileWithId[] | null) => {
    if (files) {
      setUploadableFiles(files);
    }
  };

  const getPayload = (values: ResourceBrand) => ({
    data: {
      ...values,
      id: resourceBrand?.id,
      resource_id: resourceId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
    setUploadableFiles([]);
  };

  const onActionSuccess = async (response: IApiResponse<ResourceBrand>, payload: IApiPayload<ResourceBrand>) => {
    const uploadableFilesToUpload = uploadableFiles.filter((file) => !file.isFetched);
    const uploadPromises = uploadableFilesToUpload.map((file) => uploadImage(file.file, 'RESOURCE_BRAND', response.payload.id));
    await Promise.all(uploadPromises);

    const uploadableFileIds = uploadableFiles.map((file) => file.id);
    const idsToRemove = fetchedImageIds.filter((id) => !uploadableFileIds.includes(id));

    const removePromises = idsToRemove.map((id) => deletePhoto(id));
    await Promise.all(removePromises);

    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`resource.resource-brand.${isEdit ? 'edit-resource-brand' : 'create-resource-brand'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.resource-brand.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resourceBrand as ResourceBrand}
          createActionFunc={isEdit ? editResourceBrand : createResourceBrand}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceBrand>) => {
            return (
              <ResourceBrandForm
                files={uploadableFiles}
                onFilesChange={onFilesChange}
                formik={formik}
                defaultLocaleData={{} as ResourceBrand}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceBrandDrawer;
