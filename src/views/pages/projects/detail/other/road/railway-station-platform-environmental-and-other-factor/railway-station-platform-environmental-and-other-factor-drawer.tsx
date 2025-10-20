"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformEnvironmentalAndOtherFactor } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayStationPlatformEnvironmentalAndOtherFactorForm from "./railway-station-platform-environmental-and-other-factor-form";

interface RailwayStationPlatformEnvironmentalAndOtherFactorDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStationPlatformEnvironmentalAndOtherFactor: RailwayStationPlatformEnvironmentalAndOtherFactor;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformEnvironmentalAndOtherFactorDrawer = ({
  open,
  toggle,
  refetch,
  railwayStationPlatformEnvironmentalAndOtherFactor,
  projectId,
  otherSubMenu,
}: RailwayStationPlatformEnvironmentalAndOtherFactorDrawerProps) => {
  const isEdit = Boolean(railwayStationPlatformEnvironmentalAndOtherFactor?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required("Platform Layout ID is required"),
    environmental_compliance_measures: yup.string().nullable(),
    noise_and_vibration_control_measures: yup.string().nullable(),
    sustainable_design_features: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createEnvironmentalFactor = async (
    body: IApiPayload<RailwayStationPlatformEnvironmentalAndOtherFactor>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformEnvironmentalAndOtherFactor>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editEnvironmentalFactor = async (
    body: IApiPayload<RailwayStationPlatformEnvironmentalAndOtherFactor>,
  ) =>
    projectOtherApiSecondService<RailwayStationPlatformEnvironmentalAndOtherFactor>().update(
      otherSubMenu?.apiRoute || "",
      railwayStationPlatformEnvironmentalAndOtherFactor.id as string,
      body,
    );

  const getPayload = (
    values: RailwayStationPlatformEnvironmentalAndOtherFactor,
  ): IApiPayload<RailwayStationPlatformEnvironmentalAndOtherFactor> => {
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
    response: IApiResponse<RailwayStationPlatformEnvironmentalAndOtherFactor>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_ENVIRONMENTAL_AND_OTHER_FACTOR";

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "environmental_factor_document",
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
      title={`project.other.railway-station-platform-environmental-and-other-factor.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station-platform-environmental-and-other-factor.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayStationPlatformEnvironmentalAndOtherFactor}
          createActionFunc={
            isEdit
              ? editEnvironmentalFactor
              : createEnvironmentalFactor
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayStationPlatformEnvironmentalAndOtherFactor>,
          ) => (
            <RailwayStationPlatformEnvironmentalAndOtherFactorForm
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

export default RailwayStationPlatformEnvironmentalAndOtherFactorDrawer;