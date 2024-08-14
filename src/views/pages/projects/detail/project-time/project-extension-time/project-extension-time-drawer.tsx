import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectExtensionTimeForm from './project-extension-time-form';

import { useState } from 'react';
import projectExtensionTimeApiService from 'src/services/project/project-extension-time-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProjectExtensionTime } from 'src/types/project/project-time';

interface ProjectExtensionTimeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectExtensionTime: ProjectExtensionTime;
  projectId: string;
}

const ProjectExtensionTimeDrawer = (props: ProjectExtensionTimeDrawerType) => {
  const { open, toggle, refetch, projectExtensionTime, projectId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(projectExtensionTime?.id);

  const createProjectExtensionTime = async (body: IApiPayload<ProjectExtensionTime>) => projectExtensionTimeApiService.create(body);

  const editProjectExtensionTime = async (body: IApiPayload<ProjectExtensionTime>) =>
    projectExtensionTimeApiService.update(projectExtensionTime?.id || '', body);

  const getPayload = (values: ProjectExtensionTime) => ({
    data: {
      ...values,
      id: projectExtensionTime?.id,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectExtensionTime>, payload: IApiPayload<ProjectExtensionTime>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-extension-time.${isEdit ? `edit-project-extension-time` : `create-project-extension-time`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.project-extension-time.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectExtensionTime as ProjectExtensionTime)
          }}
          createActionFunc={isEdit ? editProjectExtensionTime : createProjectExtensionTime}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectExtensionTime>) => {
            return <ProjectExtensionTimeForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectExtensionTimeDrawer;
