import { FormikProps } from 'formik';
import React, { useState } from 'react';
import resourceStudyFieldApiService from 'src/services/resource/resource-study-field-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceStudyField } from 'src/types/resource';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ResourceStudyFieldForm from './resource-study-field-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';

interface ResourceStudyFieldDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  resourceId: string;
  resourceStudyField: ResourceStudyField;
}

const validationSchema = yup.object().shape({
  studyfield_id: yup.string().required(),
  description: yup.string().required()
});

const ResourceStudyFieldDrawer: React.FC<ResourceStudyFieldDrawerType> = (props) => {
  const { open, toggle, refetch, resourceStudyField, resourceId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = resourceStudyField?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createResourceStudyField = async (body: IApiPayload<ResourceStudyField>) => {
    return await resourceStudyFieldApiService.create(body);
  };

  const editResourceStudyField = async (body: IApiPayload<ResourceStudyField>) => {
    return await resourceStudyFieldApiService.update(resourceStudyField?.id || '', body);
  };

  const getPayload = (values: ResourceStudyField) => ({
    data: {
      ...values,
      id: resourceStudyField?.id,
      resource_id: resourceId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ResourceStudyField>, payload: IApiPayload<ResourceStudyField>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableResourceFileTypes.resourceStudyField, response.payload.id, '', '');
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
          initialValues={resourceStudyField as ResourceStudyField}
          createActionFunc={isEdit ? editResourceStudyField : createResourceStudyField}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ResourceStudyField>) => {
            return (
              <ResourceStudyFieldForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as ResourceStudyField}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ResourceStudyFieldDrawer;
