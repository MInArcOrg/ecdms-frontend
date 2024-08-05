import * as yup from 'yup';
import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import ProjectTimeForm from './project-time-form'; // Import your projectTime form component
import { IApiPayload } from 'src/types/requests';
import { ProjectTime } from 'src/types/project/project-time';
import projectTimeApiService from 'src/services/project/project-time-service';

interface ProjectTimeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectTime: ProjectTime;
  projectId: string;
}

const validationSchema = yup.object().shape({
  description: yup.string()
});

const ProjectTimeDrawer = (props: ProjectTimeDrawerType) => {
  // ** Props
  const { open, toggle, refetch, projectTime, projectId } = props;

  const isEdit = projectTime?.id ? true : false;

  const createProjectTime = async (body: IApiPayload<ProjectTime>) => {
    return await projectTimeApiService.create(body);
  };

  const getPayload = (values: ProjectTime) => {
    const payload = {
      data: {
        description: values.description,
        project_id: projectId
      } as ProjectTime,
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
      title={`project.project-time.${isEdit ? 'edit-project-time' : 'create-project-time'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="project.project-time.project-time" // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...(projectTime as ProjectTime) }}
          createActionFunc={createProjectTime}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectTime>) => {
            return <ProjectTimeForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectTimeDrawer;
