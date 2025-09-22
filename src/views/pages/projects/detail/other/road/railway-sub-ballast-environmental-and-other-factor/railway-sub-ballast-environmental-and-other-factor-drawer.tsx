import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwaySubBallastEnvironmentalAndOtherFactorForm from "./railway-sub-ballast-environmental-and-other-factor-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwaySubBallastEnvironmentalAndOtherFactor } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface RailwaySubBallastEnvironmentalAndOtherFactorDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySubBallastEnvironmentalAndOtherFactor: RailwaySubBallastEnvironmentalAndOtherFactor;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySubBallastEnvironmentalAndOtherFactorDrawer = ({
  open,
  toggle,
  refetch,
  railwaySubBallastEnvironmentalAndOtherFactor,
  projectId,
  otherSubMenu,
}: RailwaySubBallastEnvironmentalAndOtherFactorDrawerProps) => {
  const isEdit = Boolean(
    railwaySubBallastEnvironmentalAndOtherFactor?.project_id,
  );

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    environmental_compliance_measures: yup.string().nullable(),
    environmental_impact_assessment: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createRailwaySubBallastEnvironmentalAndOtherFactor = async (
    body: IApiPayload<RailwaySubBallastEnvironmentalAndOtherFactor>,
  ) =>
    projectOtherApiSecondService<RailwaySubBallastEnvironmentalAndOtherFactor>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwaySubBallastEnvironmentalAndOtherFactor = async (
    body: IApiPayload<RailwaySubBallastEnvironmentalAndOtherFactor>,
  ) =>
    projectOtherApiSecondService<RailwaySubBallastEnvironmentalAndOtherFactor>().update(
      otherSubMenu?.apiRoute || "",
      railwaySubBallastEnvironmentalAndOtherFactor.project_id,
      body,
    );

  const getPayload = (
    values: RailwaySubBallastEnvironmentalAndOtherFactor,
  ): IApiPayload<RailwaySubBallastEnvironmentalAndOtherFactor> => ({
    data: {
      ...values,
      project_id: projectId,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySubBallastEnvironmentalAndOtherFactor>,
    payload: IApiPayload<RailwaySubBallastEnvironmentalAndOtherFactor>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sub-ballast-environmental-and-other-factor.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sub-ballast-environmental-and-other-factor.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySubBallastEnvironmentalAndOtherFactor,
          }}
          createActionFunc={
            isEdit
              ? editRailwaySubBallastEnvironmentalAndOtherFactor
              : createRailwaySubBallastEnvironmentalAndOtherFactor
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwaySubBallastEnvironmentalAndOtherFactor>,
          ) => (
            <RailwaySubBallastEnvironmentalAndOtherFactorForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySubBallastEnvironmentalAndOtherFactorDrawer;
