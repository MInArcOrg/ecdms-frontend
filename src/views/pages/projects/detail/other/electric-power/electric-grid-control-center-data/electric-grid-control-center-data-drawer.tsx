"use client";
import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import ElectricGridControlCenterDataForm from "./electric-grid-control-center-data-form";
import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type {
  ElectricGridControlCenterData,
  MiniGridStation,
} from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface ElectricGridControlCenterDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  electricGridControlCenterData: ElectricGridControlCenterData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  miniGridStations: MiniGridStation[];
  controlSystemTypes: any[];
  communicationLinks: any[];
}

const ElectricGridControlCenterDataDrawer = (
  props: ElectricGridControlCenterDataDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    electricGridControlCenterData,
    projectId,
    otherSubMenu,
    miniGridStations,
    controlSystemTypes,
    communicationLinks,
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    mini_grid_station_id: yup
      .string()
      .required("Mini Grid Station is required"),
    name: yup.string().required("Name is required"),
    control_system_type_id: yup
      .string()
      .required("Control System Type is required"),
    communication_links_id: yup
      .string()
      .required("Communication Links is required"),
    installation_year: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Installation year must be an integer"),
    energy_management_system_capability: yup.boolean().nullable(),
    remote_control_capability: yup.boolean().nullable(),
    average_measured_data_reliability: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(electricGridControlCenterData?.id);

  const createElectricGridControlCenterData = async (
    body: IApiPayload<ElectricGridControlCenterData>,
  ) =>
    projectOtherApiSecondService<ElectricGridControlCenterData>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editElectricGridControlCenterData = async (
    body: IApiPayload<ElectricGridControlCenterData>,
  ) =>
    projectOtherApiSecondService<ElectricGridControlCenterData>().update(
      otherSubMenu?.apiRoute || "",
      electricGridControlCenterData?.id || "",
      body,
    );

  const getPayload = (values: ElectricGridControlCenterData) => ({
    data: {
      project_id: projectId,
      mini_grid_station_id: values.mini_grid_station_id,
      name: values.name,
      installation_year: values.installation_year,
      control_system_type_id: values.control_system_type_id,
      communication_links_id: values.communication_links_id,
      energy_management_system_capability:
        values.energy_management_system_capability,
      remote_control_capability: values.remote_control_capability,
      average_measured_data_reliability:
        values.average_measured_data_reliability,
      remark: values.remark,
      id: electricGridControlCenterData?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ElectricGridControlCenterData>,
    payload: IApiPayload<ElectricGridControlCenterData>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.electric_grid_control_center_data,
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
      title={`project.other.electric-grid-control-center-data.${
        isEdit
          ? `edit-electric-grid-control-center-data`
          : `create-electric-grid-control-center-data`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-grid-control-center-data.${
            isEdit
              ? `edit-electric-grid-control-center-data`
              : `create-electric-grid-control-center-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...electricGridControlCenterData,
            energy_management_system_capability:
              electricGridControlCenterData?.energy_management_system_capability ||
              false,
            remote_control_capability:
              electricGridControlCenterData?.remote_control_capability || false,
          }}
          createActionFunc={
            isEdit
              ? editElectricGridControlCenterData
              : createElectricGridControlCenterData
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricGridControlCenterData>) => {
            return (
              <ElectricGridControlCenterDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                miniGridStations={miniGridStations}
                controlSystemTypes={controlSystemTypes}
                communicationLinks={communicationLinks}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ElectricGridControlCenterDataDrawer;
