import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayTrackSafetyForm from "./railway-track-safety-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayTrackSafety } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface RailwayTrackSafetyDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayTrackSafety: RailwayTrackSafety;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayTrackSafetyDrawer = (props: RailwayTrackSafetyDrawerType) => {
  const { open, toggle, refetch, railwayTrackSafety, projectId, otherSubMenu } =
    props;
  const validationSchema = yup.object().shape({
    railway_track_safety_measures_id: yup
      .string()
      .required("Railway Track Safety Measures is required"),
    track_inspection_frequency_id: yup
      .string()
      .required("Track Inspection Frequency is required"),
  });

  const isEdit = Boolean(railwayTrackSafety?.id);

  const createRailwayTrackSafety = async (
    body: IApiPayload<RailwayTrackSafety>,
  ) =>
    projectOtherApiSecondService<RailwayTrackSafety>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayTrackSafety = async (
    body: IApiPayload<RailwayTrackSafety>,
  ) =>
    projectOtherApiSecondService<RailwayTrackSafety>().update(
      otherSubMenu?.apiRoute || "",
      railwayTrackSafety?.id || "",
      body,
    );

  const getPayload = (
    values: RailwayTrackSafety,
  ): IApiPayload<RailwayTrackSafety> => ({
    data: {
      ...values,
      project_id: projectId,
      id: railwayTrackSafety?.id,
    } as RailwayTrackSafety,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayTrackSafety>,
    payload: IApiPayload<RailwayTrackSafety>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-track-safety.${isEdit ? `edit` : `create`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-track-safety.${
            isEdit ? `edit` : `create`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayTrackSafety,
          }}
          createActionFunc={
            isEdit ? editRailwayTrackSafety : createRailwayTrackSafety
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayTrackSafety>) => {
            return <RailwayTrackSafetyForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayTrackSafetyDrawer;
