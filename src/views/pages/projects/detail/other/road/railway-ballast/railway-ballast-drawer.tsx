import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayBallastForm from "./railway-ballast-form";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayBallast } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface RailwayBallastDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayBallast: RailwayBallast;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayBallastDrawer = ({
  open,
  toggle,
  refetch,
  railwayBallast,
  projectId,
  otherSubMenu,
}: RailwayBallastDrawerProps) => {
  const isEdit = Boolean(railwayBallast?.id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    railway_ballast_name: yup
      .string()
      .required("Railway ballast name is required"),
    ballast_id_no: yup.string().nullable(),
    ballast_construction_cost: yup
      .number()
      .nullable()
      .typeError("Ballast construction cost must be a number"),
    remark: yup.string().nullable(),
  });

  const createRailwayBallast = async (body: IApiPayload<RailwayBallast>) =>
    projectOtherApiSecondService<RailwayBallast>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayBallast = async (body: IApiPayload<RailwayBallast>) =>
    projectOtherApiSecondService<RailwayBallast>().update(
      otherSubMenu?.apiRoute || "",
      railwayBallast?.id || "",
      body,
    );

  const getPayload = (values: RailwayBallast): IApiPayload<RailwayBallast> => ({
    data: {
      ...values,
      project_id: projectId,
      id: railwayBallast?.id,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayBallast>,
    payload: IApiPayload<RailwayBallast>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-ballast.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-ballast.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayBallast,
          }}
          createActionFunc={isEdit ? editRailwayBallast : createRailwayBallast}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayBallast>) => (
            <RailwayBallastForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayBallastDrawer;
