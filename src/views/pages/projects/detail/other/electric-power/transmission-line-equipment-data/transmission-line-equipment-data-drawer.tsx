"use client";
import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import TransmissionLineEquipmentDataForm from "./transmission-line-equipment-data-form";
import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type {
  TransmissionLineEquipmentData,
  TransmissionLineInformation,
} from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface TransmissionLineEquipmentDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  transmissionLineEquipmentData: TransmissionLineEquipmentData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  transmissionLines: TransmissionLineInformation[];
}

const TransmissionLineEquipmentDataDrawer = (
  props: TransmissionLineEquipmentDataDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    transmissionLineEquipmentData,
    projectId,
    otherSubMenu,
    transmissionLines,
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    // transmission_line_id: yup.string().required("Transmission Line is required"),
    name: yup.string().required("Name is required"),
    insulator_type: yup.string().nullable(),
    ground_wire_type: yup.string().nullable(),
    fiber_optics_number: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    opgw_uts: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    opgw_weight: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    owner_operator: yup.string().nullable(),
    tower_grounding: yup.string().nullable(),
    tower_circuit_arrangement: yup.string().nullable(),
    other_equipment: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(transmissionLineEquipmentData?.id);

  const createTransmissionLineEquipmentData = async (
    body: IApiPayload<TransmissionLineEquipmentData>,
  ) =>
    projectOtherApiSecondService<TransmissionLineEquipmentData>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editTransmissionLineEquipmentData = async (
    body: IApiPayload<TransmissionLineEquipmentData>,
  ) =>
    projectOtherApiSecondService<TransmissionLineEquipmentData>().update(
      otherSubMenu?.apiRoute || "",
      transmissionLineEquipmentData?.id || "",
      body,
    );

  const getPayload = (values: TransmissionLineEquipmentData) => ({
    data: {
      project_id: projectId,
      transmission_line_id: values.transmission_line_id,
      name: values.name,
      insulator_type: values.insulator_type,
      ground_wire_type: values.ground_wire_type,
      fiber_optics_number: values.fiber_optics_number,
      opgw_uts: values.opgw_uts,
      opgw_weight: values.opgw_weight,
      owner_operator: values.owner_operator,
      tower_grounding: values.tower_grounding,
      tower_circuit_arrangement: values.tower_circuit_arrangement,
      other_equipment: values.other_equipment,
      remark: values.remark,
      id: transmissionLineEquipmentData?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<TransmissionLineEquipmentData>,
    payload: IApiPayload<TransmissionLineEquipmentData>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.transmissionLineEquipmentData,
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
      title={`project.other.transmission-line-equipment-data.${
        isEdit
          ? `edit-transmission-line-equipment-data`
          : `create-transmission-line-equipment-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.transmission-line-equipment-data.${
            isEdit
              ? `edit-transmission-line-equipment-data`
              : `create-transmission-line-equipment-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...transmissionLineEquipmentData,
          }}
          createActionFunc={
            isEdit
              ? editTransmissionLineEquipmentData
              : createTransmissionLineEquipmentData
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TransmissionLineEquipmentData>) => {
            return (
              <TransmissionLineEquipmentDataForm
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

export default TransmissionLineEquipmentDataDrawer;
