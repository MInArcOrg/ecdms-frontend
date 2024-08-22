import { FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import resourceSpecificationApiService from 'src/services/resource/resource-specification-service';
import { deletePhoto, useGetMultiplePhotos, uploadImage } from 'src/services/utils/file-utils';
import { FileWithId } from 'src/types/general/file';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceSpecification } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourceSpecificationForm from './resource-specification-form';

interface ResourceSpecificationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceSpecification: ResourceSpecification;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  datasource: yup.string().required(),
  description: yup.string().required()
});

const ResourceSpecificationDrawer: React.FC<ResourceSpecificationDrawerType> = (props) => {
  const { open, toggle, refetch, resourceSpecification, resourceId } = props;

  const { data: fetchedImages } = useGetMultiplePhotos({ filter: { model_id: resourceSpecification?.id || '' } });
  const [uploadableFiles, setUploadableFiles] = useState<FileWithId[]>([]);
  const [fetchedImageIds, setFetchedImageIds] = useState<string[]>([]);

  const isEdit = resourceSpecification?.id ? true : false;

  const createResourceSpecification = async (body: IApiPayload<ResourceSpecification>) => {
    return await resourceSpecificationApiService.create(body);
  };

  const editResourceSpecification = async (body: IApiPayload<ResourceSpecification>) => {
    return await resourceSpecificationApiService.update(resourceSpecification?.id || '', body);
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

  const getPayload = (values: ResourceSpecification) => ({
    data: {
      ...values,
      id: resourceSpecification?.id,
      resource_id: resourceId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
    setUploadableFiles([]);
  };

  const onActionSuccess = async (response: IApiResponse<ResourceSpecification>, payload: IApiPayload<ResourceSpecification>) => {
    const uploadableFilesToUpload = uploadableFiles.filter((file) => !file.isFetched);
    const uploadPromises = uploadableFilesToUpload.map((file) => uploadImage(file.file, 'resourcespecification', response.payload.id));
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
      title={`resource.resource-specification.${isEdit ? 'edit-resource-specification' : 'create-resource-specification'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.resource-specification.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resourceSpecification as ResourceSpecification}
          createActionFunc={isEdit ? editResourceSpecification : createResourceSpecification}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceSpecification>) => {
            return (
              <ResourceSpecificationForm
                files={uploadableFiles}
                onFilesChange={onFilesChange}
                formik={formik}
                defaultLocaleData={{} as ResourceSpecification}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceSpecificationDrawer;
