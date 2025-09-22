"use client";
import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import MiniGridStationDistributionLineInfrastructureForm from "./mini-grid-station-distribution-line-infrastructure-form";
import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type {
  MiniGridStationDistributionLineInfrastructure,
  MiniGridStation,
} from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface MiniGridStationDistributionLineInfrastructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  miniGridStations: MiniGridStation[];
  distributionLineTypes: any[];
  distributionLineMaterials: any[];
}

const MiniGridStationDistributionLineInfrastructureDrawer = (
  props: MiniGridStationDistributionLineInfrastructureDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    miniGridStationDistributionLineInfrastructure,
    projectId,
    otherSubMenu,
    miniGridStations,
    distributionLineTypes,
    distributionLineMaterials,
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
    distribution_line_type_id: yup
      .string()
      .required("Distribution Line Type is required"),
    distribution_line_material_id: yup
      .string()
      .required("Distribution Line Material is required"),
    distribution_line_conductor_size: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    voltage_level: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    topology: yup.string().nullable(),
    switching_station_connection: yup.boolean().nullable(),
    station_name: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(miniGridStationDistributionLineInfrastructure?.id);

  const createMiniGridStationDistributionLineInfrastructure = async (
    body: IApiPayload<MiniGridStationDistributionLineInfrastructure>,
  ) =>
    projectOtherApiSecondService<MiniGridStationDistributionLineInfrastructure>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editMiniGridStationDistributionLineInfrastructure = async (
    body: IApiPayload<MiniGridStationDistributionLineInfrastructure>,
  ) =>
    projectOtherApiSecondService<MiniGridStationDistributionLineInfrastructure>().update(
      otherSubMenu?.apiRoute || "",
      miniGridStationDistributionLineInfrastructure?.id || "",
      body,
    );

  const getPayload = (
    values: MiniGridStationDistributionLineInfrastructure,
  ) => ({
    data: {
      project_id: projectId,
      mini_grid_station_id: values.mini_grid_station_id,
      name: values.name,
      distribution_line_type_id: values.distribution_line_type_id,
      distribution_line_material_id: values.distribution_line_material_id,
      distribution_line_conductor_size: values.distribution_line_conductor_size,
      voltage_level: values.voltage_level,
      topology: values.topology,
      switching_station_connection: values.switching_station_connection,
      station_name: values.station_name,
      remark: values.remark,
      id: miniGridStationDistributionLineInfrastructure?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<MiniGridStationDistributionLineInfrastructure>,
    payload: IApiPayload<MiniGridStationDistributionLineInfrastructure>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other
          .mini_grid_station_distribution_line_infrastructure,
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
      title={`project.other.mini-grid-station-distribution-line-infrastructure.${
        isEdit
          ? `edit-mini-grid-station-distribution-line-infrastructure`
          : `create-mini-grid-station-distribution-line-infrastructure`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mini-grid-station-distribution-line-infrastructure.${
            isEdit
              ? `edit-mini-grid-station-distribution-line-infrastructure`
              : `create-mini-grid-station-distribution-line-infrastructure`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...miniGridStationDistributionLineInfrastructure,
          }}
          createActionFunc={
            isEdit
              ? editMiniGridStationDistributionLineInfrastructure
              : createMiniGridStationDistributionLineInfrastructure
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<MiniGridStationDistributionLineInfrastructure>,
          ) => {
            return (
              <MiniGridStationDistributionLineInfrastructureForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                miniGridStations={miniGridStations}
                distributionLineTypes={distributionLineTypes}
                distributionLineMaterials={distributionLineMaterials}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MiniGridStationDistributionLineInfrastructureDrawer;
