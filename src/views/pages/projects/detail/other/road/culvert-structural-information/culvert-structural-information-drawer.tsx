import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import CulvertStructuralInformationForm from "./culvert-structural-information-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { CulvertStructuralInformation } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface CulvertStructuralInformationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  culvertStructuralInformation: CulvertStructuralInformation;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const CulvertStructuralInformationDrawer = (
  props: CulvertStructuralInformationDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    culvertStructuralInformation,
    projectId,
    otherSubMenu,
  } = props;

  const validationSchema = yup.object().shape({
    parent_id: yup.string().length(36).nullable(),
    project_id: yup.string().length(36).required("Project is required"),
    name: yup.string().max(255).required("Name is required"),
    culvert_type: yup.string().max(255).nullable(),
    culvert_barrel_length: yup.number().nullable(),
    culvert_height: yup.number().nullable(),
    opening_number: yup.number().integer().nullable(),
    opening_width: yup.number().nullable(),
    total_culvert_width: yup.number().nullable(),
    distance_between_barrels: yup.number().nullable(),
    head_wall_length: yup.number().nullable(),
    pier_type_id: yup.string().length(36).required("Pier type is required"),
    pier_height: yup.number().nullable(),
    abutment_type_id: yup
      .string()
      .length(36)
      .required("Abutment type is required"),
    abutment_average_height: yup.number().nullable(),
    endwall_type_inlet_id: yup
      .string()
      .length(36)
      .required("Endwall type inlet is required"),
    endwall_type_outlet_id: yup
      .string()
      .length(36)
      .required("Endwall type outlet is required"),
    wingwall_average_length: yup.number().nullable(),
    paved_water_way_type_id: yup
      .string()
      .length(36)
      .required("Paved water way type is required"),
    soil_type_id: yup.string().length(36).required("Soil type is required"),
  });

  const isEdit = Boolean(culvertStructuralInformation?.id);

  const createCulvertStructuralInformation = async (
    body: IApiPayload<CulvertStructuralInformation>,
  ) =>
    projectOtherApiSecondService<CulvertStructuralInformation>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editCulvertStructuralInformation = async (
    body: IApiPayload<CulvertStructuralInformation>,
  ) =>
    projectOtherApiSecondService<CulvertStructuralInformation>().update(
      otherSubMenu?.apiRoute || "",
      culvertStructuralInformation?.id || "",
      body,
    );

  const getPayload = (values: CulvertStructuralInformation) => ({
    data: {
      project_id: projectId,
      name: values.name,
      culvert_type: values.culvert_type,
      culvert_barrel_length: values.culvert_barrel_length,
      culvert_height: values.culvert_height,
      opening_number: values.opening_number,
      opening_width: values.opening_width,
      total_culvert_width: values.total_culvert_width,
      distance_between_barrels: values.distance_between_barrels,
      head_wall_length: values.head_wall_length,
      pier_type_id: values.pier_type_id,
      pier_height: values.pier_height,
      abutment_type_id: values.abutment_type_id,
      abutment_average_height: values.abutment_average_height,
      endwall_type_inlet_id: values.endwall_type_inlet_id,
      endwall_type_outlet_id: values.endwall_type_outlet_id,
      wingwall_average_length: values.wingwall_average_length,
      paved_water_way_type_id: values.paved_water_way_type_id,
      soil_type_id: values.soil_type_id,
      id: culvertStructuralInformation?.id,
      created_at: values.created_at,
      updated_at: values.updated_at,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<CulvertStructuralInformation>,
    payload: IApiPayload<CulvertStructuralInformation>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.culvert-structural-information.${
        isEdit
          ? `edit-culvert-structural-information`
          : `create-culvert-structural-information`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.culvert-structural-information.${
            isEdit
              ? `edit-culvert-structural-information`
              : `create-culvert-structural-information`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...culvertStructuralInformation, project_id: projectId }}
          createActionFunc={
            isEdit
              ? editCulvertStructuralInformation
              : createCulvertStructuralInformation
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CulvertStructuralInformation>) => {
            return <CulvertStructuralInformationForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default CulvertStructuralInformationDrawer;
