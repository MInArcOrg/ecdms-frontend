import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayTrackRehabilitationOrRenewalForm from "./railway-track-rehabilitation-or-renewal-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayTrackRehabilitationOrRenewal } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface RailwayTrackRehabilitationOrRenewalDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayTrackRehabilitationOrRenewal: RailwayTrackRehabilitationOrRenewal;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayTrackRehabilitationOrRenewalDrawer = (
  props: RailwayTrackRehabilitationOrRenewalDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    railwayTrackRehabilitationOrRenewal,
    projectId,
    otherSubMenu,
  } = props;

  const validationSchema = yup.object().shape({
    track_renewal_history: yup
      .string()
      .required("Track renewal history is required"),
    rehabilitation_renewal_methods_used_id: yup
      .string()
      .required("Rehabilitation/renewal methods used is required"),
    rehabilitation_renewal_types: yup
      .string()
      .required("Rehabilitation/renewal types is required"),
  });

  const isEdit = Boolean(railwayTrackRehabilitationOrRenewal?.id);

  const createRailwayTrackRehabilitationOrRenewal = async (
    body: IApiPayload<RailwayTrackRehabilitationOrRenewal>,
  ) =>
    projectOtherApiSecondService<RailwayTrackRehabilitationOrRenewal>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayTrackRehabilitationOrRenewal = async (
    body: IApiPayload<RailwayTrackRehabilitationOrRenewal>,
  ) =>
    projectOtherApiSecondService<RailwayTrackRehabilitationOrRenewal>().update(
      otherSubMenu?.apiRoute || "",
      railwayTrackRehabilitationOrRenewal?.id || "",
      body,
    );

  const getPayload = (
    values: RailwayTrackRehabilitationOrRenewal,
  ): IApiPayload<RailwayTrackRehabilitationOrRenewal> => ({
    data: {
      ...values,
      project_id: projectId,
      id: railwayTrackRehabilitationOrRenewal?.id,
    } as RailwayTrackRehabilitationOrRenewal,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayTrackRehabilitationOrRenewal>,
    payload: IApiPayload<RailwayTrackRehabilitationOrRenewal>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-track-rehabilitation-or-renewal.${
        isEdit ? `edit` : `create`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-track-rehabilitation-or-renewal.${
            isEdit ? `edit` : `create`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayTrackRehabilitationOrRenewal,
          }}
          createActionFunc={
            isEdit
              ? editRailwayTrackRehabilitationOrRenewal
              : createRailwayTrackRehabilitationOrRenewal
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayTrackRehabilitationOrRenewal>) => {
            return <RailwayTrackRehabilitationOrRenewalForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayTrackRehabilitationOrRenewalDrawer;
