import { FormikProps } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import projectPlanApiService from "src/services/project/project-plan-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";

import { ProjectPlan } from "src/types/project/project-plan";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import ProjectPlanForm from "./project-plan-form";
import { planReportTypeConstant } from "src/constants/project-plan-constants";

interface ProjectPlanDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectPlan: ProjectPlan;
  projectId: string;
}

const ProjectPlanDrawer = (props: ProjectPlanDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    projectPlan,
    projectId,
  } = props;
  const { t } = useTranslation();

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    plan_id: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    remark: yup.string().required(),
  });

  const isEdit = Boolean(projectPlan?.id);

  const createProjectPlan = async (body: IApiPayload<ProjectPlan>) =>
    projectPlanApiService.create(body);

  const editProjectPlan = async (body: IApiPayload<ProjectPlan>) =>
    projectPlanApiService.update(projectPlan?.id || "", body);

  const getPayload = (values: ProjectPlan) => ({
    data: {
      ...values,
      id: projectPlan?.id,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ProjectPlan>,
    payload: IApiPayload<ProjectPlan>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.plan,
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
      title={`project.plan.${
        isEdit
          ? `edit-project-plan`
          : `create-project-plan`
      }`}
      handleClose={handleClose}
      open={open}
      width={700}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.plan.${
            isEdit
              ? `edit-project-plan`
              : `create-project-plan`
          }`}          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(projectPlan as ProjectPlan),
            type:planReportTypeConstant.QUARTERLY.value,
          }}
          createActionFunc={isEdit ? editProjectPlan : createProjectPlan}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectPlan>) => {
            return (
              <ProjectPlanForm
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

export default ProjectPlanDrawer;
