import { FormikProps } from 'formik';
import { useState } from 'react';
import projectStakeholderApiService from 'src/services/project/project-stakeholder-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';

import { ProjectStakeholder } from 'src/types/project/project-stakeholder';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectStakeholderForm from './project-stakeholder-form';

interface ProjectStakeholderDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectStakeholder: ProjectStakeholder;
  projectId: string;
}

const ProjectStakeholderDrawer = (props: ProjectStakeholderDrawerType) => {
  const { open, toggle, refetch, projectStakeholder, projectId } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    stakeholder_id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    remark: yup.string().required()
  });

  const isEdit = Boolean(projectStakeholder?.id);

  const createProjectStakeholder = async (body: IApiPayload<ProjectStakeholder>) => projectStakeholderApiService.create(body);

  const editProjectStakeholder = async (body: IApiPayload<ProjectStakeholder>) =>
    projectStakeholderApiService.update(projectStakeholder?.id || '', body);

  const getPayload = (values: ProjectStakeholder) => ({
    data: {
      ...values,
      id: projectStakeholder?.id,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ProjectStakeholder>, payload: IApiPayload<ProjectStakeholder>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.stakeholder, response.payload.id, '', '');
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.stakeholder.${isEdit ? `edit-project-stakeholder` : `create-project-stakeholder`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.stakeholder.${isEdit ? `edit-project-stakeholder` : `create-project-stakeholder`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectStakeholder as ProjectStakeholder)
          }}
          createActionFunc={isEdit ? editProjectStakeholder : createProjectStakeholder}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectStakeholder>) => {
            return <ProjectStakeholderForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectStakeholderDrawer;
