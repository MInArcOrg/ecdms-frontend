import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ManagerForm from './project-manager-form';
import projectManagerApiService from 'src/services/project/project-manager-service';
import type { ProjectManager } from 'src/types/project/project-manager';
import type { Stakeholder } from 'src/types/stakeholder';
import { nationalIdRule } from 'src/utils/validator/id';
import { nameRule } from 'src/utils/validator/name';
import { phoneRule } from 'src/utils/validator/phone';

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

  const validationSchema = yup.object().shape({
    stakeholder_id: yup.string().required('Stakeholder is required'),
    position: yup.string().required('Position is required'),
    first_name: nameRule.required('First name is required'),
    middle_name: nameRule.required('Middle name is required'),
    last_name: nameRule.required('Last name is required'),
    national_id_no: nationalIdRule.required('National ID is required'),
    gender: yup.string().required('Gender is required'),
    phone: phoneRule.required('Phone is required'),
    email: yup.string().email('Email is invalid').required()
  });

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
