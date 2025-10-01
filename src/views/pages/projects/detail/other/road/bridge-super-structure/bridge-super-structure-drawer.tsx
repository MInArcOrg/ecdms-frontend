import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import BridgeSuperStructureForm from "./bridge-super-structure-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { BridgeSuperStructure } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface BridgeSuperStructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeSuperStructure: BridgeSuperStructure;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeSuperStructureDrawer = (props: BridgeSuperStructureDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    bridgeSuperStructure,
    projectId,
    otherSubMenu,
  } = props;

  const validationSchema = yup.object().shape({

  name: yup
    .string()
    .max(255, "Name must be at most 255 characters")
    .required("Name is required"),

  bridge_name: yup
    .string()
    .max(255, "Bridge name must be at most 255 characters")
    .required("Bridge name is required"),

  bridge_structure_type_id: yup
    .string()
    .uuid()
    .required("Bridge structure type is required"),

  span_number: yup
    .number()
    .integer("Span number must be an integer")
    .nullable(),

  span_composition: yup.string().max(255).nullable(),

  total_span_length: yup.number().nullable(),
  carriage_width: yup.number().nullable(),
  side_walk_width: yup.number().nullable(),

  lane_number: yup
    .number()
    .integer("Lane number must be an integer")
    .nullable(),

  span_support_type_id: yup
    .string()
    .uuid()
    .required("Span support type is required"),

  deck_slab_type_id: yup
    .string()
    .uuid()
    .required("Deck slab type is required"),

  girder_number: yup
    .number()
    .integer("Girder number must be an integer")
    .nullable(),

  girder_depth: yup.number().nullable(),
  girder_spacing: yup.number().nullable(),
  girder_width: yup.number().nullable(),
});

  const isEdit = Boolean(bridgeSuperStructure?.id);

  const createBridgeSuperStructure = async (
    body: IApiPayload<BridgeSuperStructure>,
  ) =>
    projectOtherApiSecondService<BridgeSuperStructure>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editBridgeSuperStructure = async (
    body: IApiPayload<BridgeSuperStructure>,
  ) =>
    projectOtherApiSecondService<BridgeSuperStructure>().update(
      otherSubMenu?.apiRoute || "",
      bridgeSuperStructure?.id || "",
      body,
    );

  const getPayload = (
    values: BridgeSuperStructure,
  ): IApiPayload<BridgeSuperStructure> => ({
    data: {
      ...values,
      project_id: projectId,
      id: bridgeSuperStructure?.id,
    } as BridgeSuperStructure,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<BridgeSuperStructure>,
    payload: IApiPayload<BridgeSuperStructure>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-super-structure.${
        isEdit ? `edit-bridge-super-structure` : `create-bridge-super-structure`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-super-structure.${
            isEdit
              ? `edit-bridge-super-structure`
              : `create-bridge-super-structure`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeSuperStructure,
          }}
          createActionFunc={
            isEdit ? editBridgeSuperStructure : createBridgeSuperStructure
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeSuperStructure>) => {
            return <BridgeSuperStructureForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeSuperStructureDrawer;
