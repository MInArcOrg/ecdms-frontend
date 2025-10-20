"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformPassengerFlowAndCapacity } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayStationPlatformPassengerFlowAndCapacityForm from "./railway-station-platform-passenger-flow-and-capacity-form";

interface RailwayStationPlatformPassengerFlowAndCapacityDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStationPlatformPassengerFlowAndCapacity: RailwayStationPlatformPassengerFlowAndCapacity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformPassengerFlowAndCapacityDrawer = ({
  open,
  toggle,
  refetch,
  railwayStationPlatformPassengerFlowAndCapacity,
  projectId,
  otherSubMenu,
}: RailwayStationPlatformPassengerFlowAndCapacityDrawerProps) => {
  const isEdit = Boolean(railwayStationPlatformPassengerFlowAndCapacity?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required("Platform Layout ID is required"),
    passenger_flow_during_peak_hour: yup.string().nullable(),
    minimum_passenger_flow: yup.string().nullable(),
    capacity_assessment: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createPassengerFlow = async (
    body: IApiPayload<RailwayStationPlatformPassengerFlowAndCapacity>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformPassengerFlowAndCapacity>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editPassengerFlow = async (
    body: IApiPayload<RailwayStationPlatformPassengerFlowAndCapacity>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformPassengerFlowAndCapacity>().update(
      otherSubMenu?.apiRoute || "",
      railwayStationPlatformPassengerFlowAndCapacity.id as string,
      body,
    );

  const getPayload = (
    values: RailwayStationPlatformPassengerFlowAndCapacity,
  ): IApiPayload<RailwayStationPlatformPassengerFlowAndCapacity> => {
    return {
      data: {
        ...values,
        project_id: projectId,
      },
      files: [],
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<RailwayStationPlatformPassengerFlowAndCapacity>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_PASSENGER_FLOW_AND_CAPACITY";

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "passenger_flow_document",
          "",
        );
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error("File upload failed or record ID missing:", error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-station-platform-passenger-flow-and-capacity.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station-platform-passenger-flow-and-capacity.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayStationPlatformPassengerFlowAndCapacity}
          createActionFunc={
            isEdit
              ? editPassengerFlow
              : createPassengerFlow
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayStationPlatformPassengerFlowAndCapacity>,
          ) => (
            <RailwayStationPlatformPassengerFlowAndCapacityForm
              formik={formik}
              defaultFile={defaultFile}
              onDefaultFileChange={setDefaultFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayStationPlatformPassengerFlowAndCapacityDrawer;