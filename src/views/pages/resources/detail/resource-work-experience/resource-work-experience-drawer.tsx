import { FormikProps } from 'formik';
import React, { useState } from 'react';
import resourceWorkExperienceApiService from 'src/services/resource/resource-work-experience-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceWorkExperience } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourceWorkExperienceForm from './resource-work-experience-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';

interface ResourceWorkExperienceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceWorkExperience: ResourceWorkExperience;
}

const validationSchema = yup.object().shape({
  workexperience_id: yup.string().required(),
  description: yup.string().required()
});

const ResourceWorkExperienceDrawer: React.FC<ResourceWorkExperienceDrawerType> = (props) => {
  const { open, toggle, refetch, resourceWorkExperience, resourceId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = resourceWorkExperience?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createResourceWorkExperience = async (body: IApiPayload<ResourceWorkExperience>) => {
    return await resourceWorkExperienceApiService.create(body);
  };

  const editResourceWorkExperience = async (body: IApiPayload<ResourceWorkExperience>) => {
    return await resourceWorkExperienceApiService.update(resourceWorkExperience?.id || '', body);
  };

  const getPayload = (values: ResourceWorkExperience) => ({
    data: {
      ...values,
      id: resourceWorkExperience?.id,
      resource_id: resourceId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ResourceWorkExperience>, payload: IApiPayload<ResourceWorkExperience>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableResourceFileTypes.resourceWorkExperience, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`resource.resource-study-field.${isEdit ? 'edit-resource-study-field' : 'create-resource-study-field'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.resource-study-field.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resourceWorkExperience as ResourceWorkExperience}
          createActionFunc={isEdit ? editResourceWorkExperience : createResourceWorkExperience}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceWorkExperience>) => {
            return (
              <ResourceWorkExperienceForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as ResourceWorkExperience}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceWorkExperienceDrawer;
