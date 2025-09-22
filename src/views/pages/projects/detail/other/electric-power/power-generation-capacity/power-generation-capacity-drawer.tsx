"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import PowerGenerationCapacityForm from "./power-generation-capacity-form";

import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type { PowerGenerationCapacity } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import {
  convertDateToLocaleDate,
  formatInitialDateDate,
} from "src/utils/formatter/date";

interface PowerGenerationCapacityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  powerGenerationCapacity: PowerGenerationCapacity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const PowerGenerationCapacityDrawer = (
  props: PowerGenerationCapacityDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    powerGenerationCapacity,
    projectId,
    otherSubMenu,
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    owner_id: yup.string().required("Owner is required"),
    capacity: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    annual_generation: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    units_number: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    commissioning_date: yup.string().nullable(),
    plant_life: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    others: yup.string().nullable(),
  });

  const isEdit = Boolean(powerGenerationCapacity?.id);

  const createPowerGenerationCapacity = async (
    body: IApiPayload<PowerGenerationCapacity>,
  ) =>
    projectOtherApiSecondService<PowerGenerationCapacity>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editPowerGenerationCapacity = async (
    body: IApiPayload<PowerGenerationCapacity>,
  ) =>
    projectOtherApiSecondService<PowerGenerationCapacity>().update(
      otherSubMenu?.apiRoute || "",
      powerGenerationCapacity?.id || "",
      body,
    );

  const getPayload = (values: PowerGenerationCapacity) => ({
    data: {
      ...values,
      project_id: projectId,
      commissioning_date: convertDateToLocaleDate(values.commissioning_date),
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<PowerGenerationCapacity>,
    payload: IApiPayload<PowerGenerationCapacity>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.powerGenerationCapacity,
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
      title={`project.other.power-generation-capacity.${
        isEdit
          ? `edit-power-generation-capacity`
          : `create-power-generation-capacity`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.power-generation-capacity.${
            isEdit
              ? `edit-power-generation-capacity`
              : `create-power-generation-capacity`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...powerGenerationCapacity,
            commissioning_date: formatInitialDateDate(
              powerGenerationCapacity?.commissioning_date,
            ),
          }}
          createActionFunc={
            isEdit ? editPowerGenerationCapacity : createPowerGenerationCapacity
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<PowerGenerationCapacity>) => {
            return (
              <PowerGenerationCapacityForm
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

export default PowerGenerationCapacityDrawer;
