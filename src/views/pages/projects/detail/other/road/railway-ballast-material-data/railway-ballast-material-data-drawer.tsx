import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayBallastMaterialDataForm from "./railway-ballast-material-data-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayBallastMaterialData } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface RailwayBallastMaterialDataDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayBallastMaterialData: RailwayBallastMaterialData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayBallastMaterialDataDrawer = ({
  open,
  toggle,
  refetch,
  railwayBallastMaterialData,
  projectId,
  otherSubMenu,
}: RailwayBallastMaterialDataDrawerProps) => {
  const isEdit = Boolean(railwayBallastMaterialData?.project_id); // or some unique ID field if available

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    ballast_material_type_id: yup
      .string()
      .required("Ballast material type is required"),
    ballast_source_id: yup.string().required("Ballast source is required"),
    compaction_method_id: yup
      .string()
      .required("Compaction method is required"),
    particle_size_distribution_grading: yup.string().nullable(),
    ballast_used_quantity: yup
      .number()
      .nullable()
      .typeError("Ballast used quantity must be a number"),
    ballast_material_size: yup
      .number()
      .nullable()
      .typeError("Ballast material size must be a number"),
    ballast_layer_thickness: yup
      .number()
      .nullable()
      .typeError("Ballast layer thickness must be a number"),
    remark: yup.string().nullable(),
  });

  const createRailwayBallastMaterialData = async (
    body: IApiPayload<RailwayBallastMaterialData>,
  ) =>
    projectOtherApiSecondService<RailwayBallastMaterialData>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayBallastMaterialData = async (
    body: IApiPayload<RailwayBallastMaterialData>,
  ) =>
    projectOtherApiSecondService<RailwayBallastMaterialData>().update(
      otherSubMenu?.apiRoute || "",
      railwayBallastMaterialData.project_id, // assuming project_id is the unique id here, change if not correct
      body,
    );

  const getPayload = (
    values: RailwayBallastMaterialData,
  ): IApiPayload<RailwayBallastMaterialData> => ({
    data: {
      ...values,
      project_id: projectId,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayBallastMaterialData>,
    payload: IApiPayload<RailwayBallastMaterialData>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-ballast-material-data.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-ballast-material-data. ${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayBallastMaterialData,
          }}
          createActionFunc={
            isEdit
              ? editRailwayBallastMaterialData
              : createRailwayBallastMaterialData
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayBallastMaterialData>) => (
            <RailwayBallastMaterialDataForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayBallastMaterialDataDrawer;
