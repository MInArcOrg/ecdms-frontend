import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import IntersectionDrivewayForm from "./intersection-and-driveway-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { IntersectionAndDriveway } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface IntersectionDrivewayDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  intersectionDriveway: IntersectionAndDriveway;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const IntersectionDrivewayDrawer = (props: IntersectionDrivewayDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    intersectionDriveway,
    projectId,
    otherSubMenu,
  } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    intersection_type_id: yup
      .string()
      .required("Intersection Type is required"),
    driveway_access_point_id: yup
      .string()
      .required("Driveway Access Point is required"),
  });

  const isEdit = Boolean(intersectionDriveway?.id);

  const createIntersectionDriveway = async (
    body: IApiPayload<IntersectionAndDriveway>,
  ) =>
    projectOtherApiSecondService<IntersectionAndDriveway>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editIntersectionDriveway = async (
    body: IApiPayload<IntersectionAndDriveway>,
  ) =>
    projectOtherApiSecondService<IntersectionAndDriveway>().update(
      otherSubMenu?.apiRoute || "",
      intersectionDriveway?.id || "",
      body,
    );

  const getPayload = (
    values: IntersectionAndDriveway,
  ): IApiPayload<IntersectionAndDriveway> => ({
    data: {
      ...values,
      project_id: projectId,
      id: intersectionDriveway?.id,
    } as IntersectionAndDriveway,
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<IntersectionAndDriveway>,
    payload: IApiPayload<IntersectionAndDriveway>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.intersection-driveway.${
        isEdit ? `edit-intersection-driveway` : `create-intersection-driveway`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.intersection-driveway.${
            isEdit
              ? `edit-intersection-driveway`
              : `create-intersection-driveway`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...intersectionDriveway,
          }}
          createActionFunc={
            isEdit ? editIntersectionDriveway : createIntersectionDriveway
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<IntersectionAndDriveway>) => {
            return <IntersectionDrivewayForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default IntersectionDrivewayDrawer;
