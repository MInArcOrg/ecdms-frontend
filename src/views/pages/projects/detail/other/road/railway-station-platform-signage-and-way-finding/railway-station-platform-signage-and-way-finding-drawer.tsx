"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformSignageAndWayFinding } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayStationPlatformSignageAndWayFindingForm from "./railway-station-platform-signage-and-way-finding-form";

interface RailwayStationPlatformSignageAndWayFindingDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStationPlatformSignageAndWayFinding: RailwayStationPlatformSignageAndWayFinding;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformSignageAndWayFindingDrawer = ({
  open,
  toggle,
  refetch,
  railwayStationPlatformSignageAndWayFinding,
  projectId,
  otherSubMenu,
}: RailwayStationPlatformSignageAndWayFindingDrawerProps) => {
  const isEdit = Boolean(railwayStationPlatformSignageAndWayFinding?.id);
  // Primary file upload state
  const [defaultFile, setDefaultFile] = useState<File | null>(null);
  // Secondary file upload state for WAY_FINDING_AID
  const [wayFindingFile, setWayFindingFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required("Platform Layout ID is required"),
    signage_type_and_placement: yup.string().nullable(),
    accessibility_signage: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createSignage = async (
    body: IApiPayload<RailwayStationPlatformSignageAndWayFinding>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformSignageAndWayFinding>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editSignage = async (
    body: IApiPayload<RailwayStationPlatformSignageAndWayFinding>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformSignageAndWayFinding>().update(
      otherSubMenu?.apiRoute || "",
      railwayStationPlatformSignageAndWayFinding.id as string,
      body,
    );

  const getPayload = (
    values: RailwayStationPlatformSignageAndWayFinding,
  ): IApiPayload<RailwayStationPlatformSignageAndWayFinding> => {
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
    setWayFindingFile(null); // Reset secondary file state
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<RailwayStationPlatformSignageAndWayFinding>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const primaryFileType =
        otherSubMenu?.fileType ||
        "RAILWAY_STATION_PLATFORM_SIGNAGE_AND_WAY_FINDING";

      // 1. Upload Primary Document (e.g., General Signage Document)
      if (defaultFile) {
        await uploadFile(
          defaultFile,
          primaryFileType,
          recordId,
          "signage_document",
          "",
        );
      }

      // 2. Upload Secondary Document (WAY_FINDING_AID)
      if (wayFindingFile) {
        await uploadFile(
          wayFindingFile,
          "WAY_FINDING_AID", // Specific file type for this upload
          recordId,
          "way_finding_aid_document",
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
      title={`project.other.railway-station-platform-signage-and-way-finding.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station-platform-signage-and-way-finding.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayStationPlatformSignageAndWayFinding}
          createActionFunc={
            isEdit ? editSignage : createSignage
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayStationPlatformSignageAndWayFinding>,
          ) => (
            <RailwayStationPlatformSignageAndWayFindingForm
              formik={formik}
              defaultFile={defaultFile}
              onDefaultFileChange={setDefaultFile}
              wayFindingFile={wayFindingFile} // Pass secondary file state
              onWayFindingFileChange={setWayFindingFile} // Pass secondary file handler
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayStationPlatformSignageAndWayFindingDrawer;