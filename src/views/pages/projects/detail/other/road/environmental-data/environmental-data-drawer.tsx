"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import EnvironmentalDataForm from "./environmental-data-form";

import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type { EnvironmentalData } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface EnvironmentalDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  environmentalData: EnvironmentalData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const EnvironmentalDataDrawer = (props: EnvironmentalDataDrawerType) => {
  const { open, toggle, refetch, environmentalData, projectId, otherSubMenu } =
    props;
  const [uploadableFiles, setUploadableFiles] = useState<{
    environmentalImpactAssessment: File | null;
    communityFeedback: File | null;
    mitigationMeasures: File | null;
  }>({
    environmentalImpactAssessment: null,
    communityFeedback: null,
    mitigationMeasures: null,
  });

  const onFileChange = (fileType: string, file: File | null) => {
    setUploadableFiles((prev) => ({
      ...prev,
      [fileType]: file,
    }));
  };

  const validationSchema = yup.object().shape({
    remark: yup.string(),
  });

  const isEdit = Boolean(environmentalData?.id);

  const createEnvironmentalData = async (
    body: IApiPayload<EnvironmentalData>,
  ) =>
    projectOtherApiSecondService<EnvironmentalData>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editEnvironmentalData = async (body: IApiPayload<EnvironmentalData>) =>
    projectOtherApiSecondService<EnvironmentalData>().update(
      otherSubMenu?.apiRoute || "",
      environmentalData?.id || "",
      body,
    );

  const getPayload = (values: EnvironmentalData) => ({
    data: {
      project_id: projectId,
      remark: values.remark,
      id: environmentalData?.id,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<EnvironmentalData>,
    payload: IApiPayload<EnvironmentalData>,
  ) => {
    const recordId = response.payload.id;

    // Upload each file type if provided
    if (uploadableFiles.environmentalImpactAssessment) {
      await uploadFile(
        uploadableFiles.environmentalImpactAssessment,
        uploadableProjectFileTypes.other.environmentalImpactAssessment,
        recordId,
        "",
        "",
      );
    }

    if (uploadableFiles.communityFeedback) {
      await uploadFile(
        uploadableFiles.communityFeedback,
        uploadableProjectFileTypes.other.communityFeedback,
        recordId,
        "",
        "",
      );
    }

    if (uploadableFiles.mitigationMeasures) {
      await uploadFile(
        uploadableFiles.mitigationMeasures,
        uploadableProjectFileTypes.other.mitigationMeasures,
        recordId,
        "",
        "",
      );
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.environmental-data.${
        isEdit ? `edit-environmental-data` : `create-environmental-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.environmental-data.${
            isEdit ? `edit-environmental-data` : `create-environmental-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...environmentalData,
          }}
          createActionFunc={
            isEdit ? editEnvironmentalData : createEnvironmentalData
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<EnvironmentalData>) => {
            return (
              <EnvironmentalDataForm
                files={uploadableFiles}
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

export default EnvironmentalDataDrawer;
