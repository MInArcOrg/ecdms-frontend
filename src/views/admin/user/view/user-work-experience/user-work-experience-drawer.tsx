import type { FormikProps } from "formik";
import { useState } from "react";
import { uploadableUserFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import { UserWorkExperience } from "src/types/admin/user";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import {
  convertDateToLocaleDate,
  formatInitialDateDate,
} from "src/utils/formatter/date";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import WorkExperienceForm from "./user-work-experience-form";
import userWorkExperienceApiService from "src/services/admin/user-educaion-experience-service";

interface WorkExperienceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  workexperience: UserWorkExperience;
  userId: string;
}

const WorkExperienceDrawer = (props: WorkExperienceDrawerType) => {
  const { open, toggle, refetch, workexperience, userId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    company_name: yup.string().required("Company name is required"),
    position: yup.string().required("Position is required"),
    start_date: yup.date().required("Start date is required"),
    end_date: yup.date().required("End date is required"),
    description: yup.string().optional(),
  });

  const isEdit = Boolean(workexperience?.id);

  const createWorkExperience = async (
    body: IApiPayload<UserWorkExperience>,
  ): Promise<IApiResponse<UserWorkExperience>> => {
    return userWorkExperienceApiService.create(body);
  };

  const editWorkExperience = async (
    body: IApiPayload<UserWorkExperience>,
  ): Promise<IApiResponse<UserWorkExperience>> => {
    return userWorkExperienceApiService.update(workexperience?.id || "", body);
  };

  const getPayload = (values: UserWorkExperience) => ({
    data: {
      ...values,
      id: workexperience?.id,
      start_date: convertDateToLocaleDate(values.start_date),
      end_date: convertDateToLocaleDate(values.end_date),
      user_id: userId,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (
    response: IApiResponse<UserWorkExperience>,
    payload: IApiPayload<UserWorkExperience>,
  ) => {
    try {
      console.log("API Response:", response); // Debug log
      if (!response.payload?.id)
        throw new Error("Missing workexperience ID in response");

      const workexperienceId = response.payload.id;

      if (payload.files?.length) {
        console.log("Uploading file for workexperience ID:", workexperienceId); // Debug log
        await uploadFile(
          payload.files[0],
          uploadableUserFileTypes.userWorkExperience,
          workexperienceId,
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
      title={`department.user.work-experience.${
        isEdit ? "edit" : "create"
      }-work-experience`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`department.user.work-experience.${
            isEdit ? "edit" : "create-work-experience"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(workexperience as UserWorkExperience),
            start_date: formatInitialDateDate(workexperience?.start_date),
            end_date: formatInitialDateDate(workexperience?.end_date),
          }}
          createActionFunc={isEdit ? editWorkExperience : createWorkExperience}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<UserWorkExperience>) => (
            <WorkExperienceForm
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

export default WorkExperienceDrawer;
