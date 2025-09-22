"use client";
import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import MiniGridStationDistributionLineForm from "./mini-grid-station-distribution-line-form";
import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type {
  MiniGridStationDistributionLine,
  MiniGridStation,
} from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface MiniGridStationDistributionLineDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  miniGridStationDistributionLine: MiniGridStationDistributionLine;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  miniGridStations: MiniGridStation[];
}

const MiniGridStationDistributionLineDrawer = (
  props: MiniGridStationDistributionLineDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    miniGridStationDistributionLine,
    projectId,
    otherSubMenu,
    miniGridStations,
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
    system_type: yup.string().nullable(),
    lines_type: yup.string().nullable(),
    line_length: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    poles: yup.string().required("Poles is required"),
    transformer_type_id: yup.string().required("Transformer Type is required"),
    transformers_number: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Must be an integer"),
    transformers_size: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(miniGridStationDistributionLine?.id);

  const createMiniGridStationDistributionLine = async (
    body: IApiPayload<MiniGridStationDistributionLine>,
  ) =>
    projectOtherApiSecondService<MiniGridStationDistributionLine>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editMiniGridStationDistributionLine = async (
    body: IApiPayload<MiniGridStationDistributionLine>,
  ) =>
    projectOtherApiSecondService<MiniGridStationDistributionLine>().update(
      otherSubMenu?.apiRoute || "",
      miniGridStationDistributionLine?.id || "",
      body,
    );

  const getPayload = (values: MiniGridStationDistributionLine) => ({
    data: {
      project_id: projectId,
      mini_grid_station_id: values.mini_grid_station_id,
      name: values.name,
      system_type: values.system_type,
      lines_type: values.lines_type,
      line_length: values.line_length,
      poles: values.poles,
      transformer_type_id: values.transformer_type_id,
      transformers_number: values.transformers_number,
      transformers_size: values.transformers_size,
      remark: values.remark,
      id: miniGridStationDistributionLine?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<MiniGridStationDistributionLine>,
    payload: IApiPayload<MiniGridStationDistributionLine>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.mini_grid_station_distribution_line,
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
      title={`project.other.mini-grid-station-distribution-line.${
        isEdit
          ? `edit-mini-grid-station-distribution-line`
          : `create-mini-grid-station-distribution-line`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mini-grid-station-distribution-line.${
            isEdit
              ? `edit-mini-grid-station-distribution-line`
              : `create-mini-grid-station-distribution-line`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...miniGridStationDistributionLine,
            poles: miniGridStationDistributionLine?.poles || "Concrete",
          }}
          createActionFunc={
            isEdit
              ? editMiniGridStationDistributionLine
              : createMiniGridStationDistributionLine
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MiniGridStationDistributionLine>) => {
            return (
              <MiniGridStationDistributionLineForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                miniGridStations={miniGridStations}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MiniGridStationDistributionLineDrawer;
