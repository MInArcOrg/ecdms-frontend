"use client";

import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayCommunicationSystemMaintenanceAndTestingForm from "./railway-communication-system-maintenance-and-testing-form";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayCommunicationSystemMaintenanceAndTesting } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";

interface RailwayCommunicationSystemMaintenanceAndTestingDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayCommunicationSystemMaintenanceAndTesting: RailwayCommunicationSystemMaintenanceAndTesting;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayCommunicationSystemMaintenanceAndTestingDrawer = ({
  open,
  toggle,
  refetch,
  railwayCommunicationSystemMaintenanceAndTesting,
  projectId,
  otherSubMenu,
}: RailwayCommunicationSystemMaintenanceAndTestingDrawerProps) => {
  const isEdit = Boolean(railwayCommunicationSystemMaintenanceAndTesting?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);
  const [maintenanceContractsFile, setMaintenanceContractsFile] =
    useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required("Railway line section name is required"),
    scheduled_maintenance_activities: yup.string().nullable(),
    inspections: yup.boolean().nullable(),
    recent_maintenance_records_and_dates: yup.string().nullable(),
    testing_and_verification_procedures_prepared: yup.boolean().nullable(),
    maintenance_contracts_or_agreements_made: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createRailwayCommunicationSystemMaintenanceAndTesting = async (
    body: IApiPayload<RailwayCommunicationSystemMaintenanceAndTesting>,
  ) =>
    projectOtherApiSecondService<RailwayCommunicationSystemMaintenanceAndTesting>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayCommunicationSystemMaintenanceAndTesting = async (
    body: IApiPayload<RailwayCommunicationSystemMaintenanceAndTesting>,
  ) =>
    projectOtherApiSecondService<RailwayCommunicationSystemMaintenanceAndTesting>().update(
      otherSubMenu?.apiRoute || "",
      railwayCommunicationSystemMaintenanceAndTesting.id as string,
      body,
    );

  const getPayload = (
    values: RailwayCommunicationSystemMaintenanceAndTesting,
  ): IApiPayload<RailwayCommunicationSystemMaintenanceAndTesting> => {
    return {
      data: {
        ...values,
        project_id: projectId,
      },
      files: [],
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    setMaintenanceContractsFile(null);
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<RailwayCommunicationSystemMaintenanceAndTesting>,
  ) => {
    try {
      console.log("API Response:", response);
      if (!response.payload?.id)
        throw new Error("Missing record ID in response");

      const recordId = response.payload.id;

      if (defaultFile) {
        await uploadFile(
          defaultFile,
          otherSubMenu?.fileType || "",
          recordId,
          "",
          "",
        );
      }

      if (maintenanceContractsFile) {

        await uploadFile(
          maintenanceContractsFile,
          "MAINTENANCE_AND_TESTING_CONTRACTS_AGREEMENT",
          recordId,
          "",
          "",
        );
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error("File upload failed or record ID missing:", error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-communication-system-maintenance-and-testing.${isEdit ? "edit" : "create"
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-communication-system-maintenance-and-testing.${isEdit ? "edit" : "create"
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayCommunicationSystemMaintenanceAndTesting}
          createActionFunc={
            isEdit
              ? editRailwayCommunicationSystemMaintenanceAndTesting
              : createRailwayCommunicationSystemMaintenanceAndTesting
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayCommunicationSystemMaintenanceAndTesting>,
          ) => (
            <RailwayCommunicationSystemMaintenanceAndTestingForm
              formik={formik}
              defaultFile={defaultFile}
              maintenanceContractsFile={maintenanceContractsFile}
              onDefaultFileChange={setDefaultFile}
              onMaintenanceContractsFileChange={setMaintenanceContractsFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayCommunicationSystemMaintenanceAndTestingDrawer;
