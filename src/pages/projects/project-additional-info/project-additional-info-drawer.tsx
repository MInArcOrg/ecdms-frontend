import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import AdditionalInfoForm from './project-additional-info-form';

import { useState } from 'react';
import projectAdditionalInfoApiService from 'src/services/project/project-additional-info-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-info-and-outcome';

interface AdditionalInfoDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  additionalInfo: ProjectAdditionalInfo; 
  projectId: string;
}

const AdditionalInfoDrawer = (props: AdditionalInfoDrawerType) => {
  const { open, toggle, refetch, additionalInfo, projectId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(additionalInfo?.id);

  const createAdditionalInfo = async (body: IApiPayload<ProjectAdditionalInfo>) => 
    projectAdditionalInfoApiService.create(body);

  const editAdditionalInfo = async (body: IApiPayload<ProjectAdditionalInfo>) => 
    projectAdditionalInfoApiService.update(additionalInfo?.id || '', body);

  const getPayload = (values: ProjectAdditionalInfo) => {
    return {
      data: {
        ...values,
        id: additionalInfo?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectAdditionalInfo>, payload: IApiPayload<ProjectAdditionalInfo>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.project, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
    title={`project.additional-info.${isEdit ? 'edit-additional-info' : 'create-additional-info'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.additional-info.${isEdit ? 'edit-additional-info' : 'create-additional-info'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(additionalInfo as ProjectAdditionalInfo)
          }}
          createActionFunc={isEdit ? editAdditionalInfo : createAdditionalInfo}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectAdditionalInfo>) => {
            return <AdditionalInfoForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default AdditionalInfoDrawer;