"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RegulationAndPolicyForm from "./regulation-and-policy-form";

import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type { RegulationAndPolicy } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface RegulationAndPolicyDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  regulationAndPolicy: RegulationAndPolicy;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RegulationAndPolicyDrawer = (props: RegulationAndPolicyDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    regulationAndPolicy,
    projectId,
    otherSubMenu,
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    regulatory_body_overseeing_the_facility: yup.string().nullable(),
    regulatory_compliance_monitoring: yup.boolean().nullable(),
    environmental_and_social_regulation_compliance_monitoring: yup
      .boolean()
      .nullable(),
    licensing_and_permit_requirements: yup.boolean().nullable(),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(regulationAndPolicy?.id);

  const createRegulationAndPolicy = async (
    body: IApiPayload<RegulationAndPolicy>,
  ) =>
    projectOtherApiSecondService<RegulationAndPolicy>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRegulationAndPolicy = async (
    body: IApiPayload<RegulationAndPolicy>,
  ) =>
    projectOtherApiSecondService<RegulationAndPolicy>().update(
      otherSubMenu?.apiRoute || "",
      regulationAndPolicy?.id || "",
      body,
    );

  const getPayload = (values: RegulationAndPolicy) => ({
    data: {
      project_id: projectId,
      regulatory_body_overseeing_the_facility:
        values.regulatory_body_overseeing_the_facility,
      regulatory_compliance_monitoring: values.regulatory_compliance_monitoring,
      environmental_and_social_regulation_compliance_monitoring:
        values.environmental_and_social_regulation_compliance_monitoring,
      licensing_and_permit_requirements:
        values.licensing_and_permit_requirements,
      remark: values.remark,
      id: regulationAndPolicy?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RegulationAndPolicy>,
    payload: IApiPayload<RegulationAndPolicy>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.regulationAndPolicy,
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
      title={`project.other.regulation-and-policy.${
        isEdit ? `edit-regulation-and-policy` : `create-regulation-and-policy`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.regulation-and-policy.${
            isEdit
              ? `edit-regulation-and-policy`
              : `create-regulation-and-policy`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...regulationAndPolicy,
          }}
          createActionFunc={
            isEdit ? editRegulationAndPolicy : createRegulationAndPolicy
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RegulationAndPolicy>) => {
            return (
              <RegulationAndPolicyForm
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

export default RegulationAndPolicyDrawer;
