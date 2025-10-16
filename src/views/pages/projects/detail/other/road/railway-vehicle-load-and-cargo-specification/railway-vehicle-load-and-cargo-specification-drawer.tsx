"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayVehicleLoadAndCargoSpecification } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import RailwayVehicleLoadAndCargoSpecificationForm from "./railway-vehicle-load-and-cargo-specification-form";

interface RailwayVehicleLoadAndCargoSpecificationDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayVehicleLoadAndCargoSpecification: RailwayVehicleLoadAndCargoSpecification;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleLoadAndCargoSpecificationDrawer = ({
  open,
  toggle,
  refetch,
  railwayVehicleLoadAndCargoSpecification,
  projectId,
  otherSubMenu,
}: RailwayVehicleLoadAndCargoSpecificationDrawerProps) => {
  const isEdit = Boolean(railwayVehicleLoadAndCargoSpecification?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_vehicle_identification_id: yup
      .string()
      .required("Vehicle Identification ID is required"),
    load_capacity_and_weight_limits: yup.string().nullable(),
    cargo_restrictions_or_special_requirements: yup
      .string()
      .nullable(),
    coupling_and_uncoupling_procedures: yup.boolean().nullable(),
    remark: yup.string().nullable(),
  });

  const createLoadAndCargo = async (
    body: IApiPayload<RailwayVehicleLoadAndCargoSpecification>,
  ) =>
    projectOtherApiSecondService<RailwayVehicleLoadAndCargoSpecification>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editLoadAndCargo = async (
    body: IApiPayload<RailwayVehicleLoadAndCargoSpecification>,
  ) =>
    projectOtherApiSecondService<RailwayVehicleLoadAndCargoSpecification>().update(
      otherSubMenu?.apiRoute || "",
      railwayVehicleLoadAndCargoSpecification.id as string,
      body,
    );

  const getPayload = (
    values: RailwayVehicleLoadAndCargoSpecification,
  ): IApiPayload<RailwayVehicleLoadAndCargoSpecification> => {
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
    response: IApiResponse<RailwayVehicleLoadAndCargoSpecification>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_VEHICLE_LOAD_AND_CARGO_SPECIFICATION";

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "load_cargo_document",
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
      title={`project.other.railway-vehicle-load-and-cargo-specification.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-vehicle-load-and-cargo-specification.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayVehicleLoadAndCargoSpecification}
          createActionFunc={
            isEdit
              ? editLoadAndCargo
              : createLoadAndCargo
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayVehicleLoadAndCargoSpecification>,
          ) => (
            <RailwayVehicleLoadAndCargoSpecificationForm
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

export default RailwayVehicleLoadAndCargoSpecificationDrawer;