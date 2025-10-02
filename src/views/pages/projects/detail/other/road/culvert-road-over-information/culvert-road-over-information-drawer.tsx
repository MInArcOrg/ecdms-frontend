import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import CulvertRoadOverInformationForm from "./culvert-road-over-information-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { CulvertRoadOverInformation } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface CulvertRoadOverInformationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  culvertRoadOverInformation: CulvertRoadOverInformation;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const CulvertRoadOverInformationDrawer = (
  props: CulvertRoadOverInformationDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    culvertRoadOverInformation,
    projectId,
    otherSubMenu,
  } = props;

  const validationSchema = yup.object().shape({
    parent_id: yup.string().length(36).nullable(),
    project_id: yup.string().length(36).required("Project is required"),
    name: yup.string().max(255).required("Name is required"),
    carriage_way_width: yup.number().nullable(),
    side_walk_width: yup.number().nullable(),
    lane_number: yup.number().integer().nullable(),
    head_wall_to_head_wall: yup.number().nullable(),
    average_fill_height: yup.number().nullable(),
    guard_rail_type_id: yup
      .string()
      .length(36)
      .required("Guard rail type is required"),
    parapet_length: yup.number().nullable(),
  });

  const isEdit = Boolean(culvertRoadOverInformation?.id);

  const createCulvertRoadOverInformation = async (
    body: IApiPayload<CulvertRoadOverInformation>,
  ) =>
    projectOtherApiSecondService<CulvertRoadOverInformation>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editCulvertRoadOverInformation = async (
    body: IApiPayload<CulvertRoadOverInformation>,
  ) =>
    projectOtherApiSecondService<CulvertRoadOverInformation>().update(
      otherSubMenu?.apiRoute || "",
      culvertRoadOverInformation?.id || "",
      body,
    );

  const getPayload = (values: CulvertRoadOverInformation) => ({
    data: {
      project_id: projectId,
      name: values.name,
      carriage_way_width: values.carriage_way_width,
      side_walk_width: values.side_walk_width,
      lane_number: values.lane_number,
      head_wall_to_head_wall: values.head_wall_to_head_wall,
      average_fill_height: values.average_fill_height,
      guard_rail_type_id: values.guard_rail_type_id,
      parapet_length: values.parapet_length,
      id: culvertRoadOverInformation?.id,
      created_at: culvertRoadOverInformation?.created_at,
      updated_at: culvertRoadOverInformation?.updated_at,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<CulvertRoadOverInformation>,
    payload: IApiPayload<CulvertRoadOverInformation>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.culvert-road-over-information.${
        isEdit
          ? `edit-culvert-road-over-information`
          : `create-culvert-road-over-information`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.culvert-road-over-information.${
            isEdit
              ? `edit-culvert-road-over-information`
              : `create-culvert-road-over-information`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...culvertRoadOverInformation, project_id: projectId }}
          createActionFunc={
            isEdit
              ? editCulvertRoadOverInformation
              : createCulvertRoadOverInformation
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CulvertRoadOverInformation>) => {
            return <CulvertRoadOverInformationForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default CulvertRoadOverInformationDrawer;
