import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectOutcomeForm from './project-outcome-form';

import { useState } from 'react';
import projectOutcomeApiService from 'src/services/project/project-outcome-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProjectOutcome } from 'src/types/project/project-additional-info-and-outcome';

interface ProjectOutcomeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectOutcome: ProjectOutcome;
  projectId: string;
}

const ProjectOutcomeDrawer = (props: ProjectOutcomeDrawerType) => {
  const { open, toggle, refetch, projectOutcome, projectId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(projectOutcome?.id);

  const createProjectOutcome = async (body: IApiPayload<ProjectOutcome>) => 
    projectOutcomeApiService.create(body);

  const editProjectOutcome = async (body: IApiPayload<ProjectOutcome>) => 
    projectOutcomeApiService.update(projectOutcome?.id || '', body);

  const getPayload = (values: ProjectOutcome) => {
    return {
      data: {
        ...values,
        id: projectOutcome?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectOutcome>, payload: IApiPayload<ProjectOutcome>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.project, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.outcome.${isEdit ? 'edit-outcome' : 'create-outcome'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.outcome.${isEdit ? 'edit-outcome' : 'create-outcome'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectOutcome as ProjectOutcome)
          }}
          createActionFunc={isEdit ? editProjectOutcome : createProjectOutcome}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectOutcome>) => {
            return <ProjectOutcomeForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectOutcomeDrawer;