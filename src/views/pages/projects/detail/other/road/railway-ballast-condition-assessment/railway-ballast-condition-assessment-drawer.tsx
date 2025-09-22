import type { FormikProps } from "formik";
import * as yup from "yup";

import type { IApiPayload, IApiResponse } from "src/types/requests";
import type { RailwayBallastConditionAssessment } from "src/types/project/other";
import type { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import RailwayBallastConditionAssessmentForm from "./railway-ballast-condition-assessment-form";
import {
  convertDateToLocaleDate,
  formatInitialDateDate,
} from "src/utils/formatter/date";

interface RailwayBallastConditionAssessmentDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayBallastConditionAssessment: RailwayBallastConditionAssessment;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayBallastConditionAssessmentDrawer = ({
  open,
  toggle,
  refetch,
  railwayBallastConditionAssessment,
  projectId,
  otherSubMenu,
}: RailwayBallastConditionAssessmentDrawerProps) => {
  const isEdit = Boolean(railwayBallastConditionAssessment?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    ballast_condition_rating: yup
      .string()
      .required("Ballast condition rating is required"),
    fouling_presence: yup.string().required("Fouling presence is required"),
    ballast_degradation_indicators: yup
      .string()
      .required("Ballast degradation indicators are required"),
    ballast_quality_testing_method: yup
      .string()
      .required("Ballast quality testing method is required"),
    testing_frequency: yup
      .number()
      .nullable()
      .typeError("Testing frequency must be a number"),
    ballast_resistance: yup.string().nullable(),
    ballast_degradation_rate: yup
      .string()
      .required("Ballast degradation rate is required"),
    drainage_performance: yup
      .string()
      .required("Drainage performance is required"),
    remark: yup.string().nullable(),
  });

  const createRailwayBallastConditionAssessment = async (
    body: IApiPayload<RailwayBallastConditionAssessment>,
  ) =>
    projectOtherApiSecondService<RailwayBallastConditionAssessment>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayBallastConditionAssessment = async (
    body: IApiPayload<RailwayBallastConditionAssessment>,
  ) =>
    projectOtherApiSecondService<RailwayBallastConditionAssessment>().update(
      otherSubMenu?.apiRoute || "",
      railwayBallastConditionAssessment.id,
      body,
    );

  const getPayload = (
    values: RailwayBallastConditionAssessment,
  ): IApiPayload<RailwayBallastConditionAssessment> => ({
    data: {
      ...values,
      inspection_dates: convertDateToLocaleDate(values.inspection_dates),
      project_id: projectId,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayBallastConditionAssessment>,
    payload: IApiPayload<RailwayBallastConditionAssessment>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-ballast-condition-assessment.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-ballast-condition-assessment.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayBallastConditionAssessment,
            inspection_dates: formatInitialDateDate(
              railwayBallastConditionAssessment?.inspection_dates,
            ),
          }}
          createActionFunc={
            isEdit
              ? editRailwayBallastConditionAssessment
              : createRailwayBallastConditionAssessment
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayBallastConditionAssessment>) => (
            <RailwayBallastConditionAssessmentForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayBallastConditionAssessmentDrawer;
