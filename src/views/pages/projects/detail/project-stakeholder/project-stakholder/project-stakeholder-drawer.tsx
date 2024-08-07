import { FormikProps } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import projectStakeholderApiService from "src/services/project/project-stakeholder-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-service";

import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import ProjectStakeholderForm from "./project-stakeholder-form";
import { getDynamicDate } from "src/views/components/custom/ethio-calendar/ethio-calendar-utils";
import i18n from "src/configs/i18n";
import { convertDateToLocaleDate } from "src/utils/formatter/date";
import moment from "moment";
import { ProjectStakeholder } from "src/types/project/project-stakeholder";

interface ProjectStakeholderDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectStakeholder: ProjectStakeholder;
  projectId: string;
}

const ProjectStakeholderDrawer = (props: ProjectStakeholderDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    projectStakeholder,
    projectId,
  } = props;
  const { t } = useTranslation();

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    amount: yup
      .number()
      .required(`${t("Amount")} ${t("is required")}`)
      .when("institution_type", {
        is: (value: string) => value === institutionType.bank.value,
        then: (schema) =>
          schema.max(amountCalculator(institutionType.bank.percent)).min(0),
      })
      .when("institution_type", {
        is: (value: string) => value === institutionType.insurance.value,
        then: (schema) =>
          schema
            .max(amountCalculator(institutionType.insurance.percent))
            .min(0),
      }),
    percent: yup
      .number()
      .when("institution_type", {
        is: (value: string) => value === institutionType.bank.value,
        then: (schema) => schema.max(institutionType.bank.percent).min(0),
      })
      .when("institution_type", {
        is: (value: string) => value === institutionType.insurance.value,
        then: (schema) => schema.max(institutionType.insurance.percent).min(0),
      }),
      institute_branch:yup.string().required(),
      branch_address:yup.string().required(),
  });

  const isEdit = Boolean(projectStakeholder?.id);

  const createProjectStakeholder = async (body: IApiPayload<ProjectStakeholder>) =>
    projectStakeholderApiService.create(body);

  const editProjectStakeholder = async (body: IApiPayload<ProjectStakeholder>) =>
    projectStakeholderApiService.update(projectStakeholder?.id || "", body);

  const getPayload = (values: ProjectStakeholder) => ({
    data: {
      ...values,
      id: projectStakeholder?.id,
      project_id: projectId,
      expiration_date: convertDateToLocaleDate(values.expiration_date),
      issue_date: convertDateToLocaleDate(values.issue_date),
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ProjectStakeholder>,
    payload: IApiPayload<ProjectStakeholder>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.stakeholder,
        response.payload.id,
        "",
        ""
      );
    }
    refetch();
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.project-stakeholder.${
        isEdit
          ? `edit-project-${type.toLocaleLowerCase()}`
          : `create-project-${type.toLocaleLowerCase()}`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.project-stakeholder.${type.toLocaleLowerCase()}`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectStakeholder as ProjectStakeholder),
          }}
          createActionFunc={isEdit ? editProjectStakeholder : createProjectStakeholder}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectStakeholder>) => {
            return (
              <ProjectStakeholderForm
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

export default ProjectStakeholderDrawer;
