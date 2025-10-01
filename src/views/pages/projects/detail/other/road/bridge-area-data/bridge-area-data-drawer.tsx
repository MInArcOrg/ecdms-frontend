import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import BridgeAreaDataForm from "./bridge-area-data-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { BridgeAreaData } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface BridgeAreaDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeAreaData: BridgeAreaData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeAreaDataDrawer = (props: BridgeAreaDataDrawerType) => {
  const { open, toggle, refetch, bridgeAreaData, projectId, otherSubMenu } =
    props;

  const validationSchema = yup.object().shape({
      parent_id: yup.string().uuid().nullable(),
    name: yup.string().max(255).required("Name is required"),
    bridge_name: yup.string().max(255).required("Bridge name is required"),
    river_width: yup.number().nullable(),
    highest_water_level: yup.number().nullable(),
    lowest_water_level: yup.number().nullable(),
    area_topography_id: yup
      .string()
      .uuid()
      .required("Area topography is required"),
    detour_possibility: yup.boolean().nullable(),
    road_alignment: yup.string().max(255).nullable(),
    altitude: yup.number().nullable(),
    load_limit_sign: yup.boolean().nullable(),
  });
 

  const isEdit = Boolean(bridgeAreaData?.id);

  const createBridgeAreaData = async (body: IApiPayload<BridgeAreaData>) =>
    projectOtherApiSecondService<BridgeAreaData>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editBridgeAreaData = async (body: IApiPayload<BridgeAreaData>) =>
    projectOtherApiSecondService<BridgeAreaData>().update(
      otherSubMenu?.apiRoute || "",
      bridgeAreaData?.id || "",
      body,
    );

  const getPayload = (values: BridgeAreaData): IApiPayload<BridgeAreaData> => ({
    data: {
      ...values,
      project_id: projectId,
      id: bridgeAreaData?.id,
    } as BridgeAreaData,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<BridgeAreaData>,
    payload: IApiPayload<BridgeAreaData>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-area-data.${
        isEdit ? `edit-bridge-area-data` : `create-bridge-area-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-area-data.${
            isEdit ? `edit-bridge-area-data` : `create-bridge-area-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeAreaData,
          }}
          createActionFunc={isEdit ? editBridgeAreaData : createBridgeAreaData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeAreaData>) => {
            return <BridgeAreaDataForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeAreaDataDrawer;
