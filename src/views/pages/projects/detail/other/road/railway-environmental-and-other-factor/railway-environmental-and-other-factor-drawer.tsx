"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayEnvironmentalAndOtherFactorForm from "./railway-environmental-and-other-factor-form";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayEnvironmentalAndOtherFactor } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";

interface RailwayEnvironmentalAndOtherFactorDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayEnvironmentalAndOtherFactor: RailwayEnvironmentalAndOtherFactor;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayEnvironmentalAndOtherFactorDrawer = ({
  open,
  toggle,
  refetch,
  railwayEnvironmentalAndOtherFactor,
  projectId,
  otherSubMenu,
}: RailwayEnvironmentalAndOtherFactorDrawerProps) => {
  const isEdit = Boolean(railwayEnvironmentalAndOtherFactor?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);
  const [complianceFile, setComplianceFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    environmental_compliance_measures: yup.boolean().nullable(),
    environmental_impact_assessment: yup.boolean().nullable(),
    data_recording_date: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createRailwayEnvironmentalAndOtherFactor = async (
    body: IApiPayload<RailwayEnvironmentalAndOtherFactor>,
  ) =>
    projectOtherApiSecondService<RailwayEnvironmentalAndOtherFactor>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayEnvironmentalAndOtherFactor = async (
    body: IApiPayload<RailwayEnvironmentalAndOtherFactor>,
  ) =>
    projectOtherApiSecondService<RailwayEnvironmentalAndOtherFactor>().update(
      otherSubMenu?.apiRoute || "",
      railwayEnvironmentalAndOtherFactor.id as string,
      body,
    );

  const getPayload = (
    values: RailwayEnvironmentalAndOtherFactor,
  ): IApiPayload<RailwayEnvironmentalAndOtherFactor> => {
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
    setComplianceFile(null);
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<RailwayEnvironmentalAndOtherFactor>,
  ) => {
    try {
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || "RAILWAY_ENVIRONMENTAL_AND_OTHER_FACTOR"; // Use specific file type

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          fileType,
          recordId,
          "default_file", // Placeholder for file field name
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
      title={`project.other.railway-environmental-and-other-factor.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-environmental-and-other-factor.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayEnvironmentalAndOtherFactor}
          createActionFunc={
            isEdit
              ? editRailwayEnvironmentalAndOtherFactor
              : createRailwayEnvironmentalAndOtherFactor
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayEnvironmentalAndOtherFactor>,
          ) => (
            <RailwayEnvironmentalAndOtherFactorForm
              formik={formik}
              defaultFile={defaultFile}
              complianceFile={complianceFile}
              onDefaultFileChange={setDefaultFile}
              onComplianceFileChange={setComplianceFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayEnvironmentalAndOtherFactorDrawer;