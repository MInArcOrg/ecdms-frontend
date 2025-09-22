"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayFasteningSystemCharacteristicForm from "./railway-fastening-system-characteristic-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayFasteningSystemCharacteristic } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react"; // Import useState
import { uploadFile } from "src/services/utils/file-utils"; // Import uploadFile

interface RailwayFasteningSystemCharacteristicDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayFasteningSystemCharacteristic: RailwayFasteningSystemCharacteristic;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayFasteningSystemCharacteristicDrawer = ({
  open,
  toggle,
  refetch,
  railwayFasteningSystemCharacteristic,
  projectId,
  otherSubMenu,
}: RailwayFasteningSystemCharacteristicDrawerProps) => {
  const isEdit = Boolean(railwayFasteningSystemCharacteristic?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null); // State for the file upload

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    used_fastening_system_type: yup.string().nullable(),
    fastening_system_manufacturer_supplier: yup.string().nullable(),
    fastening_system_specifications: yup.string().nullable(),
    rail_clips_or_clamps_details: yup.string().nullable(),
    bolts_and_nuts_specifications: yup.string().nullable(),
    other_fastening_system: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createRailwayFasteningSystemCharacteristic = async (
    body: IApiPayload<RailwayFasteningSystemCharacteristic>,
  ) =>
    projectOtherApiSecondService<RailwayFasteningSystemCharacteristic>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayFasteningSystemCharacteristic = async (
    body: IApiPayload<RailwayFasteningSystemCharacteristic>,
  ) =>
    projectOtherApiSecondService<RailwayFasteningSystemCharacteristic>().update(
      otherSubMenu?.apiRoute || "",
      railwayFasteningSystemCharacteristic.id as string,
      body,
    );

  const getPayload = (
    values: RailwayFasteningSystemCharacteristic,
  ): IApiPayload<RailwayFasteningSystemCharacteristic> => {
    const files: File[] = [];
    if (uploadableFile) {
      files.push(uploadableFile);
    }
    return {
      data: {
        ...values,
        project_id: projectId,
      },
      files: files, // Include files in the payload
    };
  };

  const handleClose = () => {
    setUploadableFile(null); // Reset file state on close
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<RailwayFasteningSystemCharacteristic>,
  ) => {
    try {
      console.log("API Response:", response);
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;

      // Upload file if exists and there's a fileType defined for this submenu
      if (uploadableFile && otherSubMenu?.fileType) {
        console.log("Uploading file for record ID:", recordId);
        await uploadFile(
          uploadableFile,
          otherSubMenu.fileType,
          recordId,
          "",
          "",
        );
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error("File upload failed:", error);
      // Handle error appropriately
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-fastening-system-characteristic.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-fastening-system-characteristic.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayFasteningSystemCharacteristic,
          }}
          createActionFunc={
            isEdit
              ? editRailwayFasteningSystemCharacteristic
              : createRailwayFasteningSystemCharacteristic
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayFasteningSystemCharacteristic>) => (
            <RailwayFasteningSystemCharacteristicForm
              formik={formik}
              file={uploadableFile} // Pass file state
              onFileChange={setUploadableFile} // Pass file change handler
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayFasteningSystemCharacteristicDrawer;
