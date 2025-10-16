"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformFacility } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayStationPlatformFacilityForm from "./railway-station-platform-facility-form";

interface RailwayStationPlatformFacilityDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStationPlatformFacility: RailwayStationPlatformFacility;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformFacilityDrawer = ({
  open,
  toggle,
  refetch,
  railwayStationPlatformFacility,
  projectId,
  otherSubMenu,
}: RailwayStationPlatformFacilityDrawerProps) => {
  const isEdit = Boolean(railwayStationPlatformFacility?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required("Platform Layout ID is required"),
    waiting_areas_seating_capacity: yup.boolean().nullable(),
    ticketing_facilities_availability: yup.boolean().nullable(),
    restrooms_and_amenities_availability: yup.boolean().nullable(),
    passenger_information_system: yup.string().nullable(),
    accessibility_features: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createPlatformFacility = async (
    body: IApiPayload<RailwayStationPlatformFacility>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformFacility>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editPlatformFacility = async (
    body: IApiPayload<RailwayStationPlatformFacility>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformFacility>().update(
      otherSubMenu?.apiRoute || "",
      railwayStationPlatformFacility.id as string,
      body,
    );

  const getPayload = (
    values: RailwayStationPlatformFacility,
  ): IApiPayload<RailwayStationPlatformFacility> => {
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
    response: IApiResponse<RailwayStationPlatformFacility>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_FACILITY";

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "facility_document",
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
      title={`project.other.railway-station-platform-facility.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station-platform-facility.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayStationPlatformFacility}
          createActionFunc={
            isEdit
              ? editPlatformFacility
              : createPlatformFacility
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayStationPlatformFacility>,
          ) => (
            <RailwayStationPlatformFacilityForm
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

export default RailwayStationPlatformFacilityDrawer;