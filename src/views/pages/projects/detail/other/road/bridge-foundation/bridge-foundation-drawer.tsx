import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import BridgeFoundationForm from "./bridge-foundation-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { BridgeFoundation } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface BridgeFoundationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeFoundation: BridgeFoundation;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeFoundationDrawer = (props: BridgeFoundationDrawerType) => {
  const { open, toggle, refetch, bridgeFoundation, projectId, otherSubMenu } =
    props;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    bridge_name: yup.string().required("Bridge name is required"),
    abutment_type_id: yup.string().required("Abutment type is required"),
    pier_type_id: yup.string().required("Pier type is required"),
    soil_type_id: yup.string().required("Soil type is required"),
  });

  const isEdit = Boolean(bridgeFoundation?.id);

  const createBridgeFoundation = async (body: IApiPayload<BridgeFoundation>) =>
    projectOtherApiSecondService<BridgeFoundation>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editBridgeFoundation = async (body: IApiPayload<BridgeFoundation>) =>
    projectOtherApiSecondService<BridgeFoundation>().update(
      otherSubMenu?.apiRoute || "",
      bridgeFoundation?.id || "",
      body,
    );

  const getPayload = (
    values: BridgeFoundation,
  ): IApiPayload<BridgeFoundation> => ({
    data: {
      ...values,
      project_id: projectId,
      id: bridgeFoundation?.id,
    } as BridgeFoundation,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<BridgeFoundation>,
    payload: IApiPayload<BridgeFoundation>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-foundation.${
        isEdit ? `edit-bridge-foundation` : `create-bridge-foundation`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-foundation.${
            isEdit ? `edit-bridge-foundation` : `create-bridge-foundation`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeFoundation,
          }}
          createActionFunc={
            isEdit ? editBridgeFoundation : createBridgeFoundation
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeFoundation>) => {
            return <BridgeFoundationForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeFoundationDrawer;
