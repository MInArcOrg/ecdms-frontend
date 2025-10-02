import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RoadMaintenanceDataForm from "./road-maintenance-data-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RoadMaintenanceData } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface RoadMaintenanceDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  roadMaintenanceData: RoadMaintenanceData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RoadMaintenanceDataDrawer = (props: RoadMaintenanceDataDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    roadMaintenanceData,
    projectId,
    otherSubMenu,
  } = props;

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    road_segment: yup
      .string()
      .max(100, "Road segment must be at most 100 characters")
      .required("Road segment is required"),
    maintenance_start_date: yup.string().nullable(),
    maintenance_end_date: yup.string().nullable(),
    weather_condition: yup
      .string()
      .max(100, "Weather condition must be at most 100 characters")
      .nullable(),
    pavement_condition: yup.string().max(100).nullable(),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(roadMaintenanceData?.id);

  const createRoadMaintenanceData = async (
    body: IApiPayload<RoadMaintenanceData>,
  ) =>
    projectOtherApiSecondService<RoadMaintenanceData>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRoadMaintenanceData = async (
    body: IApiPayload<RoadMaintenanceData>,
  ) =>
    projectOtherApiSecondService<RoadMaintenanceData>().update(
      otherSubMenu?.apiRoute || "",
      roadMaintenanceData?.id || "",
      body,
    );

  const getPayload = (
    values: RoadMaintenanceData,
  ): IApiPayload<RoadMaintenanceData> => ({
    data: {
      ...values,
      project_id: projectId,
      id: roadMaintenanceData?.id,
    } as RoadMaintenanceData,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RoadMaintenanceData>,
    payload: IApiPayload<RoadMaintenanceData>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.road-maintenance-data.${
        isEdit ? `edit-road-maintenance-data` : `create-road-maintenance-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-maintenance-data.${
            isEdit
              ? `edit-road-maintenance-data`
              : `create-road-maintenance-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...roadMaintenanceData,
          }}
          createActionFunc={
            isEdit ? editRoadMaintenanceData : createRoadMaintenanceData
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadMaintenanceData>) => {
            return <RoadMaintenanceDataForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadMaintenanceDataDrawer;
