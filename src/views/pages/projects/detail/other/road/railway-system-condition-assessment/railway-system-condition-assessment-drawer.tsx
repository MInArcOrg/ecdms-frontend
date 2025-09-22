"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwaySystemConditionAssessmentForm from "./railway-system-condition-assessment-form";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwaySystemConditionAssessment } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";

interface RailwaySystemConditionAssessmentDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySystemConditionAssessment: RailwaySystemConditionAssessment;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySystemConditionAssessmentDrawer = ({
  open,
  toggle,
  refetch,
  railwaySystemConditionAssessment,
  projectId,
  otherSubMenu,
}: RailwaySystemConditionAssessmentDrawerProps) => {
  const isEdit = Boolean(railwaySystemConditionAssessment?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    system_condition_rating_or_assessment: yup.string().nullable(),
    defect_presence: yup.boolean().nullable(),
    system_performance_indicators: yup.string().nullable(),
    power_supply_systems_and_communication: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createRailwaySystemConditionAssessment = async (
    body: IApiPayload<RailwaySystemConditionAssessment>,
  ) =>
    projectOtherApiSecondService<RailwaySystemConditionAssessment>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwaySystemConditionAssessment = async (
    body: IApiPayload<RailwaySystemConditionAssessment>,
  ) =>
    projectOtherApiSecondService<RailwaySystemConditionAssessment>().update(
      otherSubMenu?.apiRoute || "",
      railwaySystemConditionAssessment.id as string,
      body,
    );

  const getPayload = (
    values: RailwaySystemConditionAssessment,
  ): IApiPayload<RailwaySystemConditionAssessment> => {
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
    response: IApiResponse<RailwaySystemConditionAssessment>,
  ) => {
    try {
      console.log("API Response:", response);
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;

      if (defaultFile) {
        await uploadFile(defaultFile, otherSubMenu?.id || "", recordId, "", "");
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error("File upload failed or record ID missing:", error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-system-condition-assessment.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-system-condition-assessment.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwaySystemConditionAssessment}
          createActionFunc={
            isEdit
              ? editRailwaySystemConditionAssessment
              : createRailwaySystemConditionAssessment
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySystemConditionAssessment>) => (
            <RailwaySystemConditionAssessmentForm
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

export default RailwaySystemConditionAssessmentDrawer;
