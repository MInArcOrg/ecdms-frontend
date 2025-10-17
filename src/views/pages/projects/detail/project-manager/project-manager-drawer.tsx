import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ManagerForm from './project-manager-form';
import projectManagerApiService from 'src/services/project/project-manager-service';
import type { ProjectManager } from 'src/types/project/project-manager';
import type { Stakeholder } from 'src/types/stakeholder';

interface ManagerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  manager: ProjectManager;
  projectId: string;
  stakeholders: Stakeholder[];
}

const ManagerDrawer = (props: ManagerDrawerType) => {
  const { open, toggle, refetch, manager, projectId, stakeholders } = props;

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(manager?.id);

  const createManager = async (body: IApiPayload<ProjectManager>) => projectManagerApiService.create(body);

  const editManager = async (body: IApiPayload<ProjectManager>) => projectManagerApiService.update(manager?.id || '', body);

  const getPayload = (values: ProjectManager) => ({
    data: {
      ...values,
      id: manager?.id,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = () => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`project.other.project-manager.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.project-manager.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(manager as ProjectManager)
          }}
          createActionFunc={isEdit ? editManager : createManager}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectManager>) => <ManagerForm formik={formik} stakeholders={stakeholders} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ManagerDrawer;
