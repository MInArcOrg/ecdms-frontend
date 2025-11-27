import * as yup from 'yup';

import { FormikProps } from 'formik';
import projectApiService from 'src/services/project/project-service';
import { Project } from 'src/types/project';
import { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import ProjectForm from './project-form';
import { MasterType } from 'src/types/master/master-types';
import { useTranslation } from 'react-i18next';

interface ProjectDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  project: Project;
  typeId: string;
  type: MasterType | undefined;
}

const validationSchema = yup.object().shape({
  name: yup.string().max(255).required('Project name is required'),
  parent_id: yup.string().length(36).nullable(),
  department_id: yup.string().length(36).nullable(),
  projectcategory_id: yup.string().length(36).nullable(),
  projecttype_id: yup.string().length(36).nullable(),
  projectsubcategory_id: yup.string().length(36).nullable(),
  grade: yup.string().max(50).nullable(),
  end_user: yup.string().max(255).nullable(),
  function: yup.string().max(255).nullable(),
  remark: yup.string().nullable(),
  contract_no: yup.string().max(255).nullable(),
  budget_code: yup.string().max(255).nullable(),
  procurement_no: yup.string().max(255).nullable(),
  revision_no: yup.number().integer().nullable()
});

const ProjectDrawer = (props: ProjectDrawerType) => {
  // ** Props
  const { open, toggle, refetch, project, typeId,type } = props;
  const { t } = useTranslation();
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
  const translatedTitle = t(`common.${isEdit ? 'edit' : 'create'}`)+" "+ type?.title+" "+t('project.title');
  return (
    <CustomSideDrawer
      model={'project'}
      translatedTitle={translatedTitle}
      handleClose={handleClose}      
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          translatedTitle={translatedTitle}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...project }}
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
