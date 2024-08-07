import { FormikProps } from 'formik';
import React, { useState } from 'react';
import resourceStudyLevelApiService from 'src/services/resource/resource-study-level-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceStudyLevel } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourceStudyLevelForm from './resource-study-level-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';

interface ResourceStudyLevelDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceStudyLevel: ResourceStudyLevel;
}

const validationSchema = yup.object().shape({
  studylevel_id: yup.string().required(),
  description: yup.string().required()
});

const ResourceStudyLevelDrawer: React.FC<ResourceStudyLevelDrawerType> = (props) => {
  const { open, toggle, refetch, resourceStudyLevel, resourceId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = resourceStudyLevel?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createResourceStudyLevel = async (body: IApiPayload<ResourceStudyLevel>) => {
    return await resourceStudyLevelApiService.create(body);
  };

  const editResourceStudyLevel = async (body: IApiPayload<ResourceStudyLevel>) => {
    return await resourceStudyLevelApiService.update(resourceStudyLevel?.id || '', body);
  };

  const getPayload = (values: ResourceStudyLevel) => ({
    data: {
      ...values,
      id: resourceStudyLevel?.id,
      resource_id: resourceId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ResourceStudyLevel>, payload: IApiPayload<ResourceStudyLevel>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableResourceFileTypes.resourceStudyLevel, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`resource.resource-study-level.${isEdit ? 'edit-resource-study-level' : 'create-resource-study-level'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="resource.resource-study-level.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={resourceStudyLevel as ResourceStudyLevel}
          createActionFunc={isEdit ? editResourceStudyLevel : createResourceStudyLevel}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceStudyLevel>) => {
            return (
              <ResourceStudyLevelForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as ResourceStudyLevel}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceStudyLevelDrawer;
