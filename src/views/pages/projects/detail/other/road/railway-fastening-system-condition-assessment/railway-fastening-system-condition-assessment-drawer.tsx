"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayFasteningSystemConditionAssessmentForm from "./railway-fastening-system-condition-assessment-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayFasteningSystemConditionAssessment } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import {
  convertDateToLocaleDate,
  formatInitialDateDate,
} from "src/utils/formatter/date";

interface RailwayFasteningSystemConditionAssessmentDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayFasteningSystemConditionAssessment: RailwayFasteningSystemConditionAssessment;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayFasteningSystemConditionAssessmentDrawer = ({
  open,
  toggle,
  refetch,
  railwayFasteningSystemConditionAssessment,
  projectId,
  otherSubMenu,
}: RailwayFasteningSystemConditionAssessmentDrawerProps) => {
  const isEdit = Boolean(railwayFasteningSystemConditionAssessment?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    inspection_date: yup.date().nullable(),
    fastening_system_condition_rating: yup.string().nullable(),
    defect_presence: yup.string().nullable(),
    fastening_system_stability_and_alignment: yup.string().nullable(),
    rail_fastening_model_number: yup.string().nullable(),
    rail_fastening_needed_quantity: yup
      .number()
      .nullable()
      .min(0, "Quantity cannot be negative"),
    rail_fastening_expected_lifespan: yup
      .number()
      .nullable()
      .min(0, "Lifespan cannot be negative"),
    rail_fastening_availability: yup.boolean().nullable(),
    remark: yup.string().nullable(),
  });

  const createRailwayFasteningSystemConditionAssessment = async (
    body: IApiPayload<RailwayFasteningSystemConditionAssessment>,
  ) =>
    projectOtherApiSecondService<RailwayFasteningSystemConditionAssessment>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayFasteningSystemConditionAssessment = async (
    body: IApiPayload<RailwayFasteningSystemConditionAssessment>,
  ) =>
    projectOtherApiSecondService<RailwayFasteningSystemConditionAssessment>().update(
      otherSubMenu?.apiRoute || "",
      railwayFasteningSystemConditionAssessment.id as string,
      body,
    );

  const getPayload = (
    values: RailwayFasteningSystemConditionAssessment,
  ): IApiPayload<RailwayFasteningSystemConditionAssessment> => {
    const files: File[] = [];
    if (uploadableFile) {
      files.push(uploadableFile);
    }
    return {
      data: {
        ...values,
        project_id: projectId,
        inspection_date: convertDateToLocaleDate(values.inspection_date),
      },
      files: files,
    };
  };

  const handleClose = () => {
    setUploadableFile(null);
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<RailwayFasteningSystemConditionAssessment>,
  ) => {
    try {
      console.log("API Response:", response);
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;

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
      console.error("File upload failed or record ID missing:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-fastening-system-condition-assessment.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-fastening-system-condition-assessment.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayFasteningSystemConditionAssessment,
            inspection_date: formatInitialDateDate(
              railwayFasteningSystemConditionAssessment.inspection_date,
            ),
          }}
          createActionFunc={
            isEdit
              ? editRailwayFasteningSystemConditionAssessment
              : createRailwayFasteningSystemConditionAssessment
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayFasteningSystemConditionAssessment>) => (
            <RailwayFasteningSystemConditionAssessmentForm
              formik={formik}
              file={uploadableFile}
              onFileChange={setUploadableFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayFasteningSystemConditionAssessmentDrawer;
