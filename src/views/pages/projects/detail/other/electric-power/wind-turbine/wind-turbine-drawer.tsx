"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import WindTurbineForm from "./wind-turbine-form";

import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type { WindTurbine } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface WindTurbineDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  windTurbine: WindTurbine;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const WindTurbineDrawer = (props: WindTurbineDrawerType) => {
  const { open, toggle, refetch, windTurbine, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    turbine_manufacturer: yup.string().nullable(),
    turbine_model: yup.string().nullable(),
    rotor_diameter: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    hub_height: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    tower_type_id: yup.string().nullable(),
    blade_length: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    blades_number: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    gearbox_type: yup.string().nullable(),
    generator_type_id: yup.string().nullable(),
    generators_number: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(windTurbine?.id);

  const createWindTurbine = async (body: IApiPayload<WindTurbine>) =>
    projectOtherApiSecondService<WindTurbine>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editWindTurbine = async (body: IApiPayload<WindTurbine>) =>
    projectOtherApiSecondService<WindTurbine>().update(
      otherSubMenu?.apiRoute || "",
      windTurbine?.id || "",
      body,
    );

  const getPayload = (values: WindTurbine) => ({
    data: {
      project_id: projectId,
      turbine_manufacturer: values.turbine_manufacturer,
      turbine_model: values.turbine_model,
      rotor_diameter: values.rotor_diameter,
      hub_height: values.hub_height,
      tower_type_id: values.tower_type_id,
      blade_length: values.blade_length,
      blades_number: values.blades_number,
      gearbox_type: values.gearbox_type,
      generator_type_id: values.generator_type_id,
      generators_number: values.generators_number,
      remark: values.remark,
      id: windTurbine?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<WindTurbine>,
    payload: IApiPayload<WindTurbine>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.windTurbine,
        response.payload.id,
        "",
        "",
      );
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.wind-turbine.${
        isEdit ? `edit-wind-turbine` : `create-wind-turbine`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.wind-turbine.${
            isEdit ? `edit-wind-turbine` : `create-wind-turbine`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...windTurbine,
          }}
          createActionFunc={isEdit ? editWindTurbine : createWindTurbine}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<WindTurbine>) => {
            return (
              <WindTurbineForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default WindTurbineDrawer;
