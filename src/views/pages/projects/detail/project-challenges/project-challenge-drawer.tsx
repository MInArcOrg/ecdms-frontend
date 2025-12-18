import { FormikProps } from 'formik';
import React from 'react';
import projectChallengeApiService from 'src/services/project/project-challenge-service';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { ProjectChallenge } from 'src/types/project/project-challenge';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProjectChallengeForm from './project-challenge-form';

interface ProjectChallengeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectId: string;
  projectChallenge: ProjectChallenge;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is Required')
});

const ProjectChallengeDrawer: React.FC<ProjectChallengeDrawerType> = (props) => {
  const { open, toggle, refetch, projectChallenge, projectId } = props;

  const isEdit = projectChallenge?.id ? true : false;

  const createProjectChallenge = async (body: IApiPayload<ProjectChallenge>) => {
    return await projectChallengeApiService.create(body);
  };

  const editProjectChallenge = async (body: IApiPayload<ProjectChallenge>) => {
    return await projectChallengeApiService.update(projectChallenge?.id || '', body);
  };

  const getPayload = (values: ProjectChallenge): IApiPayload<ProjectChallenge> => ({
    data: {
      ...values,
      id: projectChallenge?.id,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<ProjectChallenge>, payload: IApiPayload<ProjectChallenge>) => {
    refetch();
    toggle();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`project.challenges.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.challenges.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={projectChallenge}
          createActionFunc={isEdit ? editProjectChallenge : createProjectChallenge}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectChallenge>) => {
            return <ProjectChallengeForm formik={formik} projectId={projectId} defaultLocaleData={{} as ProjectChallenge} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectChallengeDrawer;
