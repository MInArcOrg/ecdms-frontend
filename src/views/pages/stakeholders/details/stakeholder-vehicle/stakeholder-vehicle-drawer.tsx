import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import VehicleForm from './stakeholder-vehicle-form';
import stakeholderVehicleApiService from 'src/services/stakeholder/stakeholder-vehicle-service';
import type { StakeholderVehicle } from 'src/types/stakeholder/stakeholder-vehicle';
import type { IApiResponse } from 'src/types/requests';
import { limitNumberDigits } from 'src/utils/validator/number';

interface VehicleDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  vehicle: StakeholderVehicle;
  stakeholderId: string;
}

const VehicleDrawer = (props: VehicleDrawerType) => {
  const { open, toggle, refetch, vehicle, stakeholderId } = props;

  const currentYear = new Date().getFullYear();

  const validationSchema = yup.object().shape({
    vehicle_name: yup.string().required('Vehicle name is required'),
    plate_number: yup.string().required('Plate number is required'),
    model: yup.string().required('Model is required'),
    brand_name: yup.string(),
    year: yup
      .number()
      .typeError('Year must be a number')
      .integer('Year must be an integer')
      .min(1900, 'Year must be 1900 or later')
      .max(currentYear, `Year must be ${currentYear} or earlier`),
    chassis_number: yup.string().max(21, 'Chassis number must be at most 17 digits'),
    engine_number: yup
      .string()
      .matches(/^[A-Za-z0-9]+$/, 'Only letters and numbers allowed')
      .max(21, 'Engine number must be at most 20 digits'),
    capacity: yup.string().matches(/^[A-Za-z0-9]+$/, 'Only letters and numbers allowed'),
    purpose: yup.string(),
    quantity: limitNumberDigits(
      yup
        .number()
        .nullable()
        .integer('Quantity must be an integer')
        .positive('Quantity must be positive') 
        .transform((value) => (isNaN(value) ? null : value)),
      { maxIntegerDigits: 9, maxDecimalPlaces: 0 }
    ),
    current_situation: yup.string(),
    latitude: limitNumberDigits(
      yup
        .number()
        .nullable()
        .min(-90, 'Latitude must be greater than or equal to -90')
        .max(90, 'Latitude must be less than or equal to 90')
        .transform((value) => (isNaN(value) ? null : value)),
      { maxIntegerDigits: 2, maxDecimalPlaces: 6 }
    ),
    longitude: limitNumberDigits(
      yup
        .number()
        .nullable()
        .min(-180, 'Longitude must be greater than or equal to -180')
        .max(180, 'Longitude must be less than or equal to 180')
        .transform((value) => (isNaN(value) ? null : value)),
      { maxIntegerDigits: 3, maxDecimalPlaces: 6 }
    )
  });

  const isEdit = Boolean(vehicle?.id);

  const createVehicle = async (body: IApiPayload<StakeholderVehicle>): Promise<IApiResponse<StakeholderVehicle>> => {
    return stakeholderVehicleApiService.create(body);
  };

  const editVehicle = async (body: IApiPayload<StakeholderVehicle>): Promise<IApiResponse<StakeholderVehicle>> => {
    return stakeholderVehicleApiService.update(vehicle?.id || '', body);
  };

  const getPayload = (values: StakeholderVehicle) => ({
    data: {
      ...values,
      id: vehicle?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<StakeholderVehicle>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.stakeholder-vehicle.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-vehicle.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(vehicle as StakeholderVehicle)
          }}
          createActionFunc={isEdit ? editVehicle : createVehicle}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderVehicle>) => <VehicleForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default VehicleDrawer;
