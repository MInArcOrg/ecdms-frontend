import { FormikProps } from "formik";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RoadSurfaceConditionForm from "./road-surface-condition-form";

import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import { RoadSurfaceCondition } from "src/types/project/other"; // Update import
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import {
  convertDateToLocaleDate,
  formatInitialDateDate,
} from "src/utils/formatter/date";

interface RoadSurfaceConditionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  roadSurfaceCondition: RoadSurfaceCondition; // Changed from RoadSurfaceCondition
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RoadSurfaceConditionDrawer = (props: RoadSurfaceConditionDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    roadSurfaceCondition,
    projectId,
    otherSubMenu,
  } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    road_segment: yup.string().required("Road segment is required"),
    cracks: yup.string().required("Cracks information is required"),
    rutting: yup.string().required("Rutting information is required"),
    patching: yup.string().required("Patching information is required"),
    drainage_problems: yup
      .string()
      .required("Drainage problems information is required"),
    action_taken_date: yup.date().nullable(),
    action_taken: yup.string().nullable(),
    action_taken_cost: yup
      .number()
      .nullable()
      .min(0, "Cost must be a positive number"),
    assessment_condition_id: yup
      .string()
      .required("Assessment condition is required"),
    surface_type_id: yup.string().required("Surface type is required"),
    remark: yup.string().nullable(),
  });
  const isEdit = Boolean(roadSurfaceCondition?.id);

  const createRoadSurfaceCondition = async (
    body: IApiPayload<RoadSurfaceCondition>,
  ) =>
    projectOtherApiSecondService<RoadSurfaceCondition>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRoadSurfaceCondition = async (
    body: IApiPayload<RoadSurfaceCondition>,
  ) =>
    projectOtherApiSecondService<RoadSurfaceCondition>().update(
      otherSubMenu?.apiRoute || "",
      roadSurfaceCondition?.id || "",
      body,
    );

  const getPayload = (values: RoadSurfaceCondition) => ({
    data: {
      project_id: projectId,
      road_segment: values.road_segment,
      cracks: values.cracks,
      rutting: values.rutting,
      patching: values.patching,
      drainage_problems: values.drainage_problems,
      action_taken_date: convertDateToLocaleDate(values.action_taken_date),
      action_taken: values.action_taken,
      action_taken_cost: values.action_taken_cost,
      assessment_condition_id: values.assessment_condition_id,
      surface_type_id: values.surface_type_id,
      remark: values.remark,
      id: roadSurfaceCondition?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RoadSurfaceCondition>,
    payload: IApiPayload<RoadSurfaceCondition>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.roadSurfaceCondition,
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
      title={`project.other.drainage-assessment.${
        isEdit ? `edit-drainage-assessment` : `create-drainage-assessment`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.drainage-assessment.${
            isEdit ? `edit-drainage-assessment` : `create-drainage-assessment`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...roadSurfaceCondition,
            action_taken_date: formatInitialDateDate(
              roadSurfaceCondition?.action_taken_date,
            ),
            cracks: roadSurfaceCondition?.cracks || false,
            rutting: roadSurfaceCondition?.rutting || false,
            patching: roadSurfaceCondition?.patching || false,
            drainage_problems: roadSurfaceCondition?.drainage_problems || false,
          }}
          createActionFunc={
            isEdit ? editRoadSurfaceCondition : createRoadSurfaceCondition
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadSurfaceCondition>) => {
            return (
              <RoadSurfaceConditionForm
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

export default RoadSurfaceConditionDrawer;
