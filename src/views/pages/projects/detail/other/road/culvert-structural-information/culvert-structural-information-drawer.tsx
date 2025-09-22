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
    name: yup.string().required("Name is required"),
    pier_type_id: yup.string().required("Pier type is required"),
    abutment_type_id: yup.string().required("Abutment type is required"),
    endwall_type_inlet_id: yup
      .string()
      .required("Endwall type inlet is required"),
    endwall_type_outlet_id: yup
      .string()
      .required("Endwall type outlet is required"),
    paved_water_way_type_id: yup
      .string()
      .required("Paved water way type is required"),
    soil_type_id: yup.string().required("Soil type is required"),
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
          initialValues={{
            ...culvertStructuralInformation,
          }}
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
