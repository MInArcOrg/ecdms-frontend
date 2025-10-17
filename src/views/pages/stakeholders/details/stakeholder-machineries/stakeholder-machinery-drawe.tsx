import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MachineryForm from './stakeholder-machinery-form';
import stakeholderMachineryApiService from 'src/services/stakeholder/stakeholder-machinery-service';
import type { StakeholderMachinery } from 'src/types/stakeholder/stakeholder-machinery';

interface MachineryDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  machinery: StakeholderMachinery;
  stakeholderId: string;
}

const MachineryDrawer = (props: MachineryDrawerType) => {
  const { open, toggle, refetch, machinery, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    plate_no: yup.string().required('Plate number is required'),
    model: yup.string().required('Model is required'),
    engine_number: yup.string().required('Engine number is required'),
    brand_name: yup.string(),
    year: yup.number().integer('Year must be an integer').positive('Year must be positive'),
    chassis_number: yup.string(),
    capacity: yup.string(),
    purpose: yup.string(),
    quantity: yup.number().integer('Quantity must be an integer').positive('Quantity must be positive'),
    current_situation: yup.string(),
    location: yup.string()
  });

  const isEdit = Boolean(machinery?.id);

  const createMachinery = async (body: IApiPayload<StakeholderMachinery>) => stakeholderMachineryApiService.create(body);

  const editMachinery = async (body: IApiPayload<StakeholderMachinery>) => stakeholderMachineryApiService.update(machinery?.id || '', body);

  const getPayload = (values: StakeholderMachinery) => ({
    data: {
      ...values,
      id: machinery?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = () => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.machinery.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.machinery.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(machinery as StakeholderMachinery)
          }}
          createActionFunc={isEdit ? editMachinery : createMachinery}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderMachinery>) => <MachineryForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MachineryDrawer;
