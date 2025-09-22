import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwaySleeperCharacteristicForm from "./railway-sleeper-characteristic-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwaySleeperCharacteristic } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface RailwaySleeperCharacteristicDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySleeperCharacteristic: RailwaySleeperCharacteristic;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySleeperCharacteristicDrawer = ({
  open,
  toggle,
  refetch,
  railwaySleeperCharacteristic,
  projectId,
  otherSubMenu,
}: RailwaySleeperCharacteristicDrawerProps) => {
  const isEdit = Boolean(railwaySleeperCharacteristic?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    sleeper_type: yup.string().nullable(),
    sleeper_size_and_dimensions: yup
      .number()
      .nullable()
      .typeError("Sleeper size and dimensions must be a number"),
    sleeper_distance_between_pairs: yup.string().nullable(),
    sleeper_material_specification: yup.string().nullable(),
    sleeper_spacing: yup.string().nullable(),
    spacing_between: yup
      .number()
      .nullable()
      .typeError("Spacing between must be a number"),
    sleeper_shape: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createRailwaySleeperCharacteristic = async (
    body: IApiPayload<RailwaySleeperCharacteristic>,
  ) =>
    projectOtherApiSecondService<RailwaySleeperCharacteristic>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwaySleeperCharacteristic = async (
    body: IApiPayload<RailwaySleeperCharacteristic>,
  ) =>
    projectOtherApiSecondService<RailwaySleeperCharacteristic>().update(
      otherSubMenu?.apiRoute || "",
      railwaySleeperCharacteristic.project_id,
      body,
    );

  const getPayload = (
    values: RailwaySleeperCharacteristic,
  ): IApiPayload<RailwaySleeperCharacteristic> => ({
    data: {
      ...values,
      project_id: projectId,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySleeperCharacteristic>,
    payload: IApiPayload<RailwaySleeperCharacteristic>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sleeper-characteristic.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sleeper-characteristic.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySleeperCharacteristic,
          }}
          createActionFunc={
            isEdit
              ? editRailwaySleeperCharacteristic
              : createRailwaySleeperCharacteristic
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySleeperCharacteristic>) => (
            <RailwaySleeperCharacteristicForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySleeperCharacteristicDrawer;
