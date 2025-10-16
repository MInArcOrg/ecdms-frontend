"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformLayout } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayStationPlatformLayoutForm from "./railway-station-platform-layout-form";

interface RailwayStationPlatformLayoutDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStationPlatformLayout: RailwayStationPlatformLayout;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformLayoutDrawer = ({
  open,
  toggle,
  refetch,
  railwayStationPlatformLayout,
  projectId,
  otherSubMenu,
}: RailwayStationPlatformLayoutDrawerProps) => {
  const isEdit = Boolean(railwayStationPlatformLayout?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Station/Platform name is required"),
    platforms_number: yup
      .number()
      .integer("Must be a whole number")
      .min(0, "Cannot be negative")
      .nullable()
      .typeError("Platform number must be a number"),
    platform_configuration: yup.string().nullable(),
    platform_length: yup
      .number()
      .nullable()
      .min(0, "Cannot be negative")
      .typeError("Platform length must be a number"),
    platform_width: yup
      .number()
      .nullable()
      .min(0, "Cannot be negative")
      .typeError("Platform width must be a number"),
    accessibility_features: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createPlatformLayout = async (
    body: IApiPayload<RailwayStationPlatformLayout>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformLayout>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editPlatformLayout = async (
    body: IApiPayload<RailwayStationPlatformLayout>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformLayout>().update(
      otherSubMenu?.apiRoute || "",
      railwayStationPlatformLayout.id as string,
      body,
    );

  const getPayload = (
    values: RailwayStationPlatformLayout,
  ): IApiPayload<RailwayStationPlatformLayout> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        platforms_number: values.platforms_number
          ? Number(values.platforms_number)
          : null,
        platform_length: values.platform_length
          ? Number(values.platform_length)
          : null,
        platform_width: values.platform_width
          ? Number(values.platform_width)
          : null,
      },
      files: [],
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<RailwayStationPlatformLayout>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_LAYOUT";

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "station_layout_document",
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
      title={`project.other.railway-station-platform-layout.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station-platform-layout.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayStationPlatformLayout}
          createActionFunc={
            isEdit
              ? editPlatformLayout
              : createPlatformLayout
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayStationPlatformLayout>,
          ) => (
            <RailwayStationPlatformLayoutForm
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

export default RailwayStationPlatformLayoutDrawer;