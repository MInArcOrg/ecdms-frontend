import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import ResourceSpecificationForm from './resource-specification-form';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import resourceSpecificationApiService from 'src/services/resource/resource-specification-service';
import { Resource, ResourceSpecification } from 'src/types/resource';
import { useEffect, useState } from 'react';
import { getMultiplePhotos, uploadImage } from 'src/services/utils/file-service';
import { useQuery } from '@tanstack/react-query';

interface ResourceSpecificationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceSpecification: ResourceSpecification;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  datasource:yup.string().required(),
  description: yup.string().required()
});

const ResourceSpecificationDrawer = (props: ResourceSpecificationDrawerType) => {
  // ** Props
  const { open, toggle, refetch, resourceSpecification } = props;
  const { data: fetchedImages, isLoading: isImageLoading }=getMultiplePhotos({filter:{model_id:resourceSpecification?.id}})

  const [uploadableFiles, setUploadableFiles] = useState<File[] | null>(null);

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
        const convertedFiles = await Promise.all(
          fetchedImages.payload.map(async (image) => {
            const response = await fetch(image.url);
            const blob = await response.blob();
            return new File([blob],  || 'image', { type: blob.type });
          })
        );
        setUploadableFiles((prevFiles) => [...prevFiles||[], ...convertedFiles]);
      }
    };

    fetchAndConvertImages();
  }, [fetchedImages]);

  const onFilesChange = (files: FileList | null) => {
    if (files) {
      setUploadableFiles((prevFiles) => [...prevFiles||[], ...Array.from(files)]);
    }
  };

  const getPayload = (values: ResourceSpecification) => {
    const payload = {
      data: {
        ...values,
        id: resourceSpecification?.id,
        resource_id: props.resourceId
      },
      files: []
    };
    return payload;
  };
  const handleClose = () => {
    toggle();
    // formik.resetForm()
  };
  const onActionSuccess = async (response: IApiResponse<ResourceSpecification>, payload: IApiPayload<ResourceSpecification>) => {
    if (uploadableFiles && uploadableFiles.length > 0) {
      // Create an array of upload promises
      const uploadPromises = uploadableFiles.map(file => 
        uploadImage(file, 'resourcespecification', response.payload.id)
      );

      // Wait for all the uploads to complete
      await Promise.all(uploadPromises);
    }
  
    toggle();
    refetch();
    handleClose();
  };
  
  return (
    <CustomSideDrawer title={`resource.resource-specification.${isEdit ? 'edit-resource-specification' : 'create-resource-specification'}`} handleClose={handleClose} open={open}>
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
            return <ResourceSpecificationForm files={uploadableFiles||[]} onFilesChange={onFilesChange} formik={formik} defaultLocaleData={{} as ResourceSpecification} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceSpecificationDrawer;
