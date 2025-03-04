import { FormikProps } from 'formik';
import React, { useState } from 'react';
import projectSafetyStatusApiService from 'src/services/project/project-safety-status-service';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ProjectSafetyStatus } from 'src/types/project/project-safety-status ';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectSafetyStatusForm from './project-safety-status-form';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';

interface ProjectSafetyStatusDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectId: string;
  projectSafetyStatus: ProjectSafetyStatus;
}

const validationSchema = yup.object().shape({
  measures_taken: yup.string().required(),
  lesson_learned: yup.string().required(),
});

const ProjectSafetyStatusDrawer: React.FC<ProjectSafetyStatusDrawerType> = (props) => {
  const { open, toggle, refetch, projectSafetyStatus, projectId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const isEdit = projectSafetyStatus?.id ? true : false;
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const createProjectSafetyStatus = async (body: IApiPayload<ProjectSafetyStatus>) => {
    return await projectSafetyStatusApiService.create(body);
  };

  const editProjectSafetyStatus = async (body: IApiPayload<ProjectSafetyStatus>) => {
    return await projectSafetyStatusApiService.update(projectSafetyStatus?.id || '', body);
  };

  const getPayload = (values: ProjectSafetyStatus) => ({
    data: {
      ...values,
      id: projectSafetyStatus?.id,
      project_id: projectId,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ProjectSafetyStatus>, payload: IApiPayload<ProjectSafetyStatus>) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.project_safety_status, response.payload.id, '', '');
      }
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.safety-status.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.safety-status.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={projectSafetyStatus}
          createActionFunc={isEdit ? editProjectSafetyStatus : createProjectSafetyStatus}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectSafetyStatus>) => {
            return (
              <ProjectSafetyStatusForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                projectId={projectId}
                defaultLocaleData={{} as ProjectSafetyStatus}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectSafetyStatusDrawer;