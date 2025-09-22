import type { FormikProps } from "formik";
import type { IApiPayload } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import VehicleForm from "./stakeholder-vehicle-form";
import stakeholderVehicleApiService from "src/services/stakeholder/stakeholder-vehicle-service";
import type { StakeholderVehicle } from "src/types/stakeholder/stakeholder-vehicle";
import type { IApiResponse } from "src/types/requests";

interface VehicleDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  vehicle: StakeholderVehicle;
  stakeholderId: string;
}

const VehicleDrawer = (props: VehicleDrawerType) => {
  const { open, toggle, refetch, vehicle, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    vehicle_name: yup.string().required("Vehicle name is required"),
    plate_number: yup.string().required("Plate number is required"),
    model: yup.string().required("Model is required"),
    brand_name: yup.string(),
    year: yup
      .number()
      .integer("Year must be an integer")
      .positive("Year must be positive"),
    chassis_number: yup.string(),
    engine_number: yup.string(),
    capacity: yup.string(),
    purpose: yup.string(),
    quantity: yup
      .number()
      .integer("Quantity must be an integer")
      .positive("Quantity must be positive"),
    current_situation: yup.string(),
    location: yup.string(),
  });

  const isEdit = Boolean(vehicle?.id);

  const createVehicle = async (
    body: IApiPayload<StakeholderVehicle>,
  ): Promise<IApiResponse<StakeholderVehicle>> => {
    return stakeholderVehicleApiService.create(body);
  };

  const editVehicle = async (
    body: IApiPayload<StakeholderVehicle>,
  ): Promise<IApiResponse<StakeholderVehicle>> => {
    return stakeholderVehicleApiService.update(vehicle?.id || "", body);
  };

  const getPayload = (values: StakeholderVehicle) => ({
    data: {
      ...values,
      id: vehicle?.id,
      stakeholder_id: stakeholderId,
    },
    files: [],
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<StakeholderVehicle>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-vehicle.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-vehicle.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(vehicle as StakeholderVehicle),
          }}
          createActionFunc={isEdit ? editVehicle : createVehicle}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderVehicle>) => (
            <VehicleForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default VehicleDrawer;
