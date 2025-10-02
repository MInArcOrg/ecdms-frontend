import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import AccessoryForm from "./accessory-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { Accessory } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface AccessoryDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  accessory: Accessory;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const AccessoryDrawer = (props: AccessoryDrawerType) => {
  const { open, toggle, refetch, accessory, projectId, otherSubMenu } = props;

  const validationSchema = yup.object().shape({
    parent_id: yup.string().length(36).nullable(),
    project_id: yup.string().length(36).required("Project is required"),
    name: yup.string().max(255).required("Name is required"),
    under_passes: yup.number().integer().nullable(),
    ramps: yup.number().integer().nullable(),
    traffic_signals: yup.number().integer().nullable(),
    repair_stations: yup.number().integer().nullable(),
    bicycle_lanes: yup.boolean().nullable(),
    bicycle_signals: yup.number().integer().nullable(),
    culvert: yup.boolean().nullable(),
    bridge: yup.boolean().nullable(),
  });

  const isEdit = Boolean(accessory?.id);

  const createAccessory = async (body: IApiPayload<Accessory>) =>
    projectOtherApiSecondService<Accessory>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editAccessory = async (body: IApiPayload<Accessory>) =>
    projectOtherApiSecondService<Accessory>().update(
      otherSubMenu?.apiRoute || "",
      accessory?.id || "",
      body,
    );

  const getPayload = (values: Accessory): IApiPayload<Accessory> => ({
    data: {
      ...values,
      project_id: projectId,
      id: accessory?.id,
    } as Accessory,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<Accessory>,
    payload: IApiPayload<Accessory>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.accessory.${
        isEdit ? `edit-accessory` : `create-accessory`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.accessory.${
            isEdit ? `edit-accessory` : `create-accessory`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...accessory, project_id: projectId }}
          createActionFunc={isEdit ? editAccessory : createAccessory}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Accessory>) => {
            return <AccessoryForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default AccessoryDrawer;
