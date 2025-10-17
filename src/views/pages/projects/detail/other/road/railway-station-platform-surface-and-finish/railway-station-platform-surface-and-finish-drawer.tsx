"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformSurfaceAndFinish } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayStationPlatformSurfaceAndFinishForm from "./railway-station-platform-surface-and-finish-form";

interface RailwayStationPlatformSurfaceAndFinishDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStationPlatformSurfaceAndFinish: RailwayStationPlatformSurfaceAndFinish;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformSurfaceAndFinishDrawer = ({
  open,
  toggle,
  refetch,
  railwayStationPlatformSurfaceAndFinish,
  projectId,
  otherSubMenu,
}: RailwayStationPlatformSurfaceAndFinishDrawerProps) => {
  const isEdit = Boolean(railwayStationPlatformSurfaceAndFinish?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required("Platform Layout ID is required"),
    flooring_materials: yup.string().nullable(),
    surface_treatment: yup.string().nullable(),
    paint_or_color_schemes: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createSurfaceAndFinish = async (
    body: IApiPayload<RailwayStationPlatformSurfaceAndFinish>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformSurfaceAndFinish>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editSurfaceAndFinish = async (
    body: IApiPayload<RailwayStationPlatformSurfaceAndFinish>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformSurfaceAndFinish>().update(
      otherSubMenu?.apiRoute || "",
      railwayStationPlatformSurfaceAndFinish.id as string,
      body,
    );

  const getPayload = (
    values: RailwayStationPlatformSurfaceAndFinish,
  ): IApiPayload<RailwayStationPlatformSurfaceAndFinish> => {
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
    response: IApiResponse<RailwayStationPlatformSurfaceAndFinish>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_SURFACE_AND_FINISH";

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "surface_and_finish_document",
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
      title={`project.other.railway-station-platform-surface-and-finish.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station-platform-surface-and-finish.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayStationPlatformSurfaceAndFinish}
          createActionFunc={
            isEdit
              ? editSurfaceAndFinish
              : createSurfaceAndFinish
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayStationPlatformSurfaceAndFinish>,
          ) => (
            <RailwayStationPlatformSurfaceAndFinishForm
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

export default RailwayStationPlatformSurfaceAndFinishDrawer;