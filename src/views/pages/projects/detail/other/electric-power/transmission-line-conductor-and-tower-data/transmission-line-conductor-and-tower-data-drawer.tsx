"use client";
import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import TransmissionLineConductorAndTowerDataForm from "./transmission-line-conductor-and-tower-data-form";
import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type {
  TransmissionLineConductorAndTowerData,
  TransmissionLine,
} from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface TransmissionLineConductorAndTowerDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  transmissionLineConductorAndTowerData: TransmissionLineConductorAndTowerData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  transmissionLines: TransmissionLine[];
}

const TransmissionLineConductorAndTowerDataDrawer = (
  props: TransmissionLineConductorAndTowerDataDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    transmissionLineConductorAndTowerData,
    projectId,
    otherSubMenu,
    transmissionLines,
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    transmission_line_id: yup
      .string()
      .required("Transmission Line is required"),
    name: yup.string().required("Name is required"),
    conductor_type: yup.string().nullable(),
    conductor_code_name_id: yup
      .string()
      .required("Conductor Code Name is required"),
    strands_number: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    conductor_size: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    conductors_per_phase_number: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    tower_type_id: yup.string().required("Tower Type is required"),
    tower_height: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    conductor_diameter: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    each_strand_diameter: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    tower_foundation_type_id: yup
      .string()
      .required("Tower Foundation Type is required"),
    other_equipment: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(transmissionLineConductorAndTowerData?.id);

  const createTransmissionLineConductorAndTowerData = async (
    body: IApiPayload<TransmissionLineConductorAndTowerData>,
  ) =>
    projectOtherApiSecondService<TransmissionLineConductorAndTowerData>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editTransmissionLineConductorAndTowerData = async (
    body: IApiPayload<TransmissionLineConductorAndTowerData>,
  ) =>
    projectOtherApiSecondService<TransmissionLineConductorAndTowerData>().update(
      otherSubMenu?.apiRoute || "",
      transmissionLineConductorAndTowerData?.id || "",
      body,
    );

  const getPayload = (values: TransmissionLineConductorAndTowerData) => ({
    data: {
      project_id: projectId,
      transmission_line_id: values.transmission_line_id,
      name: values.name,
      conductor_type: values.conductor_type,
      conductor_code_name_id: values.conductor_code_name_id,
      strands_number: values.strands_number,
      conductor_size: values.conductor_size,
      conductors_per_phase_number: values.conductors_per_phase_number,
      tower_type_id: values.tower_type_id,
      tower_height: values.tower_height,
      conductor_diameter: values.conductor_diameter,
      each_strand_diameter: values.each_strand_diameter,
      tower_foundation_type_id: values.tower_foundation_type_id,
      other_equipment: values.other_equipment,
      remark: values.remark,
      id: transmissionLineConductorAndTowerData?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<TransmissionLineConductorAndTowerData>,
    payload: IApiPayload<TransmissionLineConductorAndTowerData>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.transmissionLineConductorAndTowerData,
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
      title={`project.other.transmission-line-conductor-and-tower-data.${
        isEdit
          ? `edit-transmission-line-conductor-and-tower-data`
          : `create-transmission-line-conductor-and-tower-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.transmission-line-conductor-and-tower-data.${
            isEdit
              ? `edit-transmission-line-conductor-and-tower-data`
              : `create-transmission-line-conductor-and-tower-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...transmissionLineConductorAndTowerData,
          }}
          createActionFunc={
            isEdit
              ? editTransmissionLineConductorAndTowerData
              : createTransmissionLineConductorAndTowerData
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TransmissionLineConductorAndTowerData>) => {
            return (
              <TransmissionLineConductorAndTowerDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                transmissionLines={transmissionLines}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TransmissionLineConductorAndTowerDataDrawer;
