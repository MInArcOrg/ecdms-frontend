"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayVehicleMaintenanceAndInspection } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayVehicleMaintenanceAndInspectionForm from "./railway-vehicle-maintenance-and-inspection-form";

interface RailwayVehicleMaintenanceAndInspectionDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayVehicleMaintenanceAndInspection: RailwayVehicleMaintenanceAndInspection;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleMaintenanceAndInspectionDrawer = ({
  open,
  toggle,
  refetch,
  railwayVehicleMaintenanceAndInspection,
  projectId,
  otherSubMenu,
}: RailwayVehicleMaintenanceAndInspectionDrawerProps) => {
  const isEdit = Boolean(railwayVehicleMaintenanceAndInspection?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_vehicle_identification_id: yup
      .string()
      .required("Vehicle Identification ID is required"),
    maintenance_history_records: yup.string().nullable(),
    vehicle_weight_and_load_capacity: yup.string().nullable(),
    maximum_speed: yup
      .number()
      .nullable()
      .typeError("Maximum speed must be a number (Double)"),
    braking_system_type: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createMaintenanceAndInspection = async (
    body: IApiPayload<RailwayVehicleMaintenanceAndInspection>,
  ) =>
    projectOtherApiSecondService<RailwayVehicleMaintenanceAndInspection>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editMaintenanceAndInspection = async (
    body: IApiPayload<RailwayVehicleMaintenanceAndInspection>,
  ) =>
    projectOtherApiSecondService<RailwayVehicleMaintenanceAndInspection>().update(
      otherSubMenu?.apiRoute || "",
      railwayVehicleMaintenanceAndInspection.id as string,
      body,
    );

  const getPayload = (
    values: RailwayVehicleMaintenanceAndInspection,
  ): IApiPayload<RailwayVehicleMaintenanceAndInspection> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        maximum_speed: values.maximum_speed
          ? Number(values.maximum_speed)
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
    response: IApiResponse<RailwayVehicleMaintenanceAndInspection>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_VEHICLE_MAINTENANCE_AND_INSPECTION";

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "maintenance_document",
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
      title={`project.other.railway-vehicle-maintenance-and-inspection.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-vehicle-maintenance-and-inspection.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayVehicleMaintenanceAndInspection}
          createActionFunc={
            isEdit
              ? editMaintenanceAndInspection
              : createMaintenanceAndInspection
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayVehicleMaintenanceAndInspection>,
          ) => (
            <RailwayVehicleMaintenanceAndInspectionForm
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

export default RailwayVehicleMaintenanceAndInspectionDrawer;