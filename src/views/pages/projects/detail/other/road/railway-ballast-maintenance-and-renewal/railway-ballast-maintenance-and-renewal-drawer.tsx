import type { FormikProps } from "formik";
import * as yup from "yup";

import type { IApiPayload, IApiResponse } from "src/types/requests";
import type { RailwayBallastMaintenanceAndRenewal } from "src/types/project/other"; // Updated type import
import type { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import RailwayBallastMaintenanceAndRenewalForm from "./railway-ballast-maintenance-and-renewal-form"; // Updated component import
import {
  convertDateToLocaleDate,
  formatInitialDateDate,
} from "src/utils/formatter/date";

interface RailwayBallastMaintenanceAndRenewalDrawerProps {
  // Renamed interface
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayBallastMaintenanceAndRenewal: RailwayBallastMaintenanceAndRenewal; // Updated prop type
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayBallastMaintenanceAndRenewalDrawer = ({
  // Renamed component
  open,
  toggle,
  refetch,
  railwayBallastMaintenanceAndRenewal, // Updated prop name
  projectId,
  otherSubMenu,
}: RailwayBallastMaintenanceAndRenewalDrawerProps) => {
  const isEdit = Boolean(railwayBallastMaintenanceAndRenewal?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    scheduled_maintenance_activities: yup
      .string()
      .required("Scheduled maintenance activities are required"),
    inspection_reports_findings: yup.string().nullable().optional(),
    remark: yup.string().nullable().optional(),
  });

  const createRailwayBallastMaintenanceAndRenewal = async (
    // Renamed function
    body: IApiPayload<RailwayBallastMaintenanceAndRenewal>,
  ) =>
    projectOtherApiSecondService<RailwayBallastMaintenanceAndRenewal>().create(
      // Updated type
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayBallastMaintenanceAndRenewal = async (
    // Renamed function
    body: IApiPayload<RailwayBallastMaintenanceAndRenewal>,
  ) =>
    projectOtherApiSecondService<RailwayBallastMaintenanceAndRenewal>().update(
      // Updated type
      otherSubMenu?.apiRoute || "",
      railwayBallastMaintenanceAndRenewal.id,
      body,
    );

  const getPayload = (
    values: RailwayBallastMaintenanceAndRenewal, // Updated type
  ): IApiPayload<RailwayBallastMaintenanceAndRenewal> => ({
    // Updated type
    data: {
      ...values,
      recent_maintenance_dates: convertDateToLocaleDate(
        values.recent_maintenance_dates,
      ),
      project_id: projectId,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayBallastMaintenanceAndRenewal>, // Updated type
    payload: IApiPayload<RailwayBallastMaintenanceAndRenewal>, // Updated type
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-ballast-maintenance-and-renewal.${
        isEdit ? "edit" : "create"
      }`} // Updated translation key
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-ballast-maintenance-and-renewal.${
            isEdit ? "edit" : "create"
          }`} // Updated translation key
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayBallastMaintenanceAndRenewal, // Updated prop name
            recent_maintenance_dates: formatInitialDateDate(
              railwayBallastMaintenanceAndRenewal?.recent_maintenance_dates,
            ),
          }}
          createActionFunc={
            isEdit
              ? editRailwayBallastMaintenanceAndRenewal
              : createRailwayBallastMaintenanceAndRenewal // Updated function names
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayBallastMaintenanceAndRenewal>, // Updated type
          ) => (
            <RailwayBallastMaintenanceAndRenewalForm formik={formik} /> // Updated component name
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayBallastMaintenanceAndRenewalDrawer; // Renamed export
