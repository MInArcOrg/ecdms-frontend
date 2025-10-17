"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformSafetyAndSecurity } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayStationPlatformSafetyAndSecurityForm from "./railway-station-platform-safety-and-security-form";

interface RailwayStationPlatformSafetyAndSecurityDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStationPlatformSafetyAndSecurity: RailwayStationPlatformSafetyAndSecurity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformSafetyAndSecurityDrawer = ({
  open,
  toggle,
  refetch,
  railwayStationPlatformSafetyAndSecurity,
  projectId,
  otherSubMenu,
}: RailwayStationPlatformSafetyAndSecurityDrawerProps) => {
  const isEdit = Boolean(railwayStationPlatformSafetyAndSecurity?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required("Platform Layout ID is required"),
    platform_safety_and_security: yup.string().nullable(),
    fire_safety_measures: yup.string().nullable(),
    surveillance_systems: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createSafetyAndSecurity = async (
    body: IApiPayload<RailwayStationPlatformSafetyAndSecurity>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformSafetyAndSecurity>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editSafetyAndSecurity = async (
    body: IApiPayload<RailwayStationPlatformSafetyAndSecurity>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformSafetyAndSecurity>().update(
      otherSubMenu?.apiRoute || "",
      railwayStationPlatformSafetyAndSecurity.id as string,
      body,
    );

  const getPayload = (
    values: RailwayStationPlatformSafetyAndSecurity,
  ): IApiPayload<RailwayStationPlatformSafetyAndSecurity> => {
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
    response: IApiResponse<RailwayStationPlatformSafetyAndSecurity>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_SAFETY_AND_SECURITY";

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "safety_and_security_document",
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
      title={`project.other.railway-station-platform-safety-and-security.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station-platform-safety-and-security.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayStationPlatformSafetyAndSecurity}
          createActionFunc={
            isEdit
              ? editSafetyAndSecurity
              : createSafetyAndSecurity
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayStationPlatformSafetyAndSecurity>,
          ) => (
            <RailwayStationPlatformSafetyAndSecurityForm
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

export default RailwayStationPlatformSafetyAndSecurityDrawer;