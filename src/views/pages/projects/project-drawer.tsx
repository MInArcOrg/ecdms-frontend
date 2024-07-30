import * as yup from 'yup';

import { FormikProps } from 'formik';
import projectApiService from 'src/services/project/project-service';
import { Project } from 'src/types/project';
import { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import ProjectForm from './project-form';

interface ProjectDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  project: Project;
  typeId: string;
}

const validationSchema = yup.object().shape({
  projectcategory_id: yup.string().required('Project category is required'),
  projectsubcategory_id: yup.string().required('Project subcategory is required'),
  status_id: yup.string().required('Project status is required'),
  name: yup.string().required('Project name is required'),
  contract_no: yup.string().required('Contract number is required'),
  budget_code: yup.string().required('Budget code is required'),
  procurement_no: yup.string().required('Procurement number is required'),
  remark: yup.string().nullable()
});

const ProjectDrawer = (props: ProjectDrawerType) => {
  // ** Props
  const { open, toggle, refetch, project, typeId } = props;

  const isEdit = project?.id ? true : false;
  const createProject = async (body: IApiPayload<Project>) => {
    return await projectApiService.create(body);
  };
  const editProject = async (body: IApiPayload<Project>) => {
    return await projectApiService.update(project?.id || '', body);
  };

  const getPayload = (values: Project) => {
    const payload = {
      data: {
        ...values,
        id: project?.id,
        projecttype_id: typeId
      },
      files: []
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
    <CustomSideDrawer title={`project.${isEdit ? 'edit-project' : 'create-project'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="project.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...(project as Project) }}
          createActionFunc={isEdit ? editProject : createProject}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Project>) => {
            return <ProjectForm typeId={typeId} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectDrawer;
