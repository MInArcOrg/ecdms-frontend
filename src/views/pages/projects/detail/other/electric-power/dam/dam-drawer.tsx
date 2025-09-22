"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import DamForm from "./dam-from";

import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type { Dam } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface DamDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  dam: Dam;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const DamDrawer = (props: DamDrawerType) => {
  const { open, toggle, refetch, dam, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    dam_type_id: yup.string().required("Dam type is required"),
    dam_height: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    spillway_type_id: yup.string().required("Spillway type is required"),
    penstock_length: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    turbine_type_id: yup.string().required("Turbine type is required"),
    turbine_number: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    generator_type_id: yup.string().required("Generator type is required"),
    generator_number: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    national_priority_rank: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(dam?.id);

  const createDam = async (body: IApiPayload<Dam>) =>
    projectOtherApiSecondService<Dam>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editDam = async (body: IApiPayload<Dam>) =>
    projectOtherApiSecondService<Dam>().update(
      otherSubMenu?.apiRoute || "",
      dam?.id || "",
      body,
    );

  const getPayload = (values: Dam) => ({
    data: {
      project_id: projectId,
      dam_type_id: values.dam_type_id,
      dam_height: values.dam_height,
      spillway_type_id: values.spillway_type_id,
      penstock_length: values.penstock_length,
      turbine_type_id: values.turbine_type_id,
      turbine_number: values.turbine_number,
      generator_type_id: values.generator_type_id,
      generator_number: values.generator_number,
      national_priority_rank: values.national_priority_rank,
      remark: values.remark,
      id: dam?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<Dam>,
    payload: IApiPayload<Dam>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.dam,
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
      title={`project.other.dam.${isEdit ? `edit-dam` : `create-dam`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.dam.${isEdit ? `edit-dam` : `create-dam`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...dam,
          }}
          createActionFunc={isEdit ? editDam : createDam}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Dam>) => {
            return (
              <DamForm
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

export default DamDrawer;
