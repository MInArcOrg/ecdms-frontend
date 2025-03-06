import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SafetyEquipmentForm from './safety-equipment-form';
import safetyEquipmentApiService from 'src/services/stakeholder/safety-equipment-service';
import type { SafetyEquipment } from 'src/types/stakeholder/stakeholder-safety-equipment';

interface SafetyEquipmentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  equipment: SafetyEquipment;
  stakeholderId: string;
}

const SafetyEquipmentDrawer = (props: SafetyEquipmentDrawerType) => {
  const { open, toggle, refetch, equipment, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    serial_no: yup.string(),
    brand_name: yup.string(),
    model: yup.string().required('Model is required'),
    year: yup.number().integer('Year must be an integer').positive('Year must be positive'),
    capacity: yup.string(),
    purpose: yup.string(),
    quantity: yup.number().integer('Quantity must be an integer').positive('Quantity must be positive'),
    current_situation: yup.string(),
    location: yup.string()
  });

  const isEdit = Boolean(equipment?.id);

  const createSafetyEquipment = async (body: IApiPayload<SafetyEquipment>) => safetyEquipmentApiService.create(body);

  const editSafetyEquipment = async (body: IApiPayload<SafetyEquipment>) => safetyEquipmentApiService.update(equipment?.id || '', body);

  const getPayload = (values: SafetyEquipment) => ({
    data: {
      ...values,
      id: equipment?.id,
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
    <CustomSideDrawer title={`stakeholder.safety-equipment.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.safety-equipment.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(equipment as SafetyEquipment)
          }}
          createActionFunc={isEdit ? editSafetyEquipment : createSafetyEquipment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SafetyEquipment>) => <SafetyEquipmentForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SafetyEquipmentDrawer;
