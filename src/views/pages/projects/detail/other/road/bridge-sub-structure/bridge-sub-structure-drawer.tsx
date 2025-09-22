import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import BridgeSubStructureForm from "./bridge-sub-structure-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { BridgeSubStructure } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface BridgeSubStructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeSubStructure: BridgeSubStructure;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeSubStructureDrawer = (props: BridgeSubStructureDrawerType) => {
  const { open, toggle, refetch, bridgeSubStructure, projectId, otherSubMenu } =
    props;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    bridge_name: yup.string().required("Bridge name is required"),
    pier_type_id: yup.string().required("Pier type is required"),
  });

  const isEdit = Boolean(bridgeSubStructure?.id);

  const createBridgeSubStructure = async (
    body: IApiPayload<BridgeSubStructure>,
  ) =>
    projectOtherApiSecondService<BridgeSubStructure>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editBridgeSubStructure = async (
    body: IApiPayload<BridgeSubStructure>,
  ) =>
    projectOtherApiSecondService<BridgeSubStructure>().update(
      otherSubMenu?.apiRoute || "",
      bridgeSubStructure?.id || "",
      body,
    );

  const getPayload = (
    values: BridgeSubStructure,
  ): IApiPayload<BridgeSubStructure> => ({
    data: {
      ...values,
      project_id: projectId,
      id: bridgeSubStructure?.id,
    } as BridgeSubStructure,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<BridgeSubStructure>,
    payload: IApiPayload<BridgeSubStructure>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-sub-structure.${
        isEdit ? `edit-bridge-sub-structure` : `create-bridge-sub-structure`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-sub-structure.${
            isEdit ? `edit-bridge-sub-structure` : `create-bridge-sub-structure`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeSubStructure,
          }}
          createActionFunc={
            isEdit ? editBridgeSubStructure : createBridgeSubStructure
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeSubStructure>) => {
            return <BridgeSubStructureForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeSubStructureDrawer;
