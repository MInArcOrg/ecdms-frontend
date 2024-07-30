import * as yup from 'yup';
import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import ProjectStatusForm from './project-status-form'; // Import your projectStatus form component
import { IApiPayload } from 'src/types/requests';
import { ProjectStatus } from 'src/types/project';
import projectStatusApiService from 'src/services/project/project-status-service';

interface ProjectStatusDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectStatus: ProjectStatus;
  projectId: string;
}

const validationSchema = yup.object().shape({
  status_id: yup.string().required(),
  description: yup.string()
});

const ProjectStatusDrawer = (props: ProjectStatusDrawerType) => {
  // ** Props
  const { open, toggle, refetch, projectStatus, projectId } = props;

  const isEdit = projectStatus?.id ? true : false;

  const createProjectStatus = async (body: IApiPayload<ProjectStatus>) => {
    return await projectStatusApiService.create(body);
  };

  const getPayload = (values: ProjectStatus) => {
    const payload = {
      data: {
        description: values.description,
        status_id: values.status_id,
        project_id: projectId
      } as ProjectStatus,
      files: [] // Adjust if you need to handle files
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-status.${isEdit ? 'edit-project-status' : 'create-project-status'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="project.project-status.project-status" // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...(projectStatus as ProjectStatus) }}
          createActionFunc={createProjectStatus}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectStatus>) => {
            return <ProjectStatusForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectStatusDrawer;
