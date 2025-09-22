import type { FormikProps } from "formik";
import * as yup from "yup";

import type { IApiPayload, IApiResponse } from "src/types/requests";
import type { RailwaySubBallastMaintenanceAndRenewal } from "src/types/project/other"; // Updated import
import type { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";

import projectOtherApiSecondService from "src/services/project/project-other-second-service";
// Assuming the form component is also renamed
import RailwaySubBallastMaintenanceAndRenewalForm from "./railway-sub-ballast-maintenance-and-renewal-form";
import {
  convertDateToLocaleDate,
  formatInitialDateDate,
} from "src/utils/formatter/date";

interface RailwaySubBallastMaintenanceAndRenewalDrawerProps {
  // Renamed interface
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySubBallastMaintenanceAndRenewal: RailwaySubBallastMaintenanceAndRenewal; // Updated prop name and type
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySubBallastMaintenanceAndRenewalDrawer = ({
  // Renamed component
  open,
  toggle,
  refetch,
  railwaySubBallastMaintenanceAndRenewal, // Updated prop name
  projectId,
  otherSubMenu,
}: RailwaySubBallastMaintenanceAndRenewalDrawerProps) => {
  // Using renamed interface
  const isEdit = Boolean(railwaySubBallastMaintenanceAndRenewal?.id); // Changed from project_id to id for edit check

  // Updated validation schema based on RailwaySubBallastMaintenanceAndRenewal model
  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    scheduled_maintenance_activities: yup.string().nullable().optional(),
    sub_ballast_renewal_history: yup.string().nullable().optional(),
    recent_maintenance_dates: yup.string().nullable().optional(), // Date field, optional
    inspection_reports_findings: yup.string().nullable().optional(),
    remark: yup.string().nullable().optional(),
  });

  const createRailwaySubBallastMaintenanceAndRenewal = async (
    body: IApiPayload<RailwaySubBallastMaintenanceAndRenewal>, // Renamed function and updated type
  ) =>
    projectOtherApiSecondService<RailwaySubBallastMaintenanceAndRenewal>().create(
      otherSubMenu?.apiRoute || "",
      body,
    ); // Updated generic type

  const editRailwaySubBallastMaintenanceAndRenewal = async (
    body: IApiPayload<RailwaySubBallastMaintenanceAndRenewal>, // Renamed function and updated type
  ) =>
    projectOtherApiSecondService<RailwaySubBallastMaintenanceAndRenewal>().update(
      // Updated generic type
      otherSubMenu?.apiRoute || "",
      railwaySubBallastMaintenanceAndRenewal.id as string, // Using updated prop name, ensuring id is string
      body,
    );

  const getPayload = (
    values: RailwaySubBallastMaintenanceAndRenewal,
  ): IApiPayload<RailwaySubBallastMaintenanceAndRenewal> => ({
    // Updated type
    data: {
      ...values,
      recent_maintenance_dates: values.recent_maintenance_dates
        ? convertDateToLocaleDate(values.recent_maintenance_dates)
        : undefined, // Apply date conversion if present
      project_id: projectId,
    },
    files: [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySubBallastMaintenanceAndRenewal>, // Updated type
    payload: IApiPayload<RailwaySubBallastMaintenanceAndRenewal>, // Updated type
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      // Updated translation key
      title={`project.other.railway-sub-ballast-maintenance-and-renewal.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sub-ballast-maintenance-and-renewal.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySubBallastMaintenanceAndRenewal, // Using updated prop name
            recent_maintenance_dates: formatInitialDateDate(
              railwaySubBallastMaintenanceAndRenewal?.recent_maintenance_dates,
            ), // Handle date formatting for initial values
          }}
          createActionFunc={
            isEdit
              ? editRailwaySubBallastMaintenanceAndRenewal
              : createRailwaySubBallastMaintenanceAndRenewal
          } // Using renamed functions
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySubBallastMaintenanceAndRenewal>) => (
            <RailwaySubBallastMaintenanceAndRenewalForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySubBallastMaintenanceAndRenewalDrawer; // Renamed export
