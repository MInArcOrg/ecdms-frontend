"use client";
import type { FormikProps } from "formik";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import MiniGridStationConsumerForm from "./mini-grid-station-consumer-form";
import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import type {
  MiniGridStationConsumer,
  MiniGridStation,
} from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface MiniGridStationConsumerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  miniGridStationConsumer: MiniGridStationConsumer;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  miniGridStations: MiniGridStation[];
}

const MiniGridStationConsumerDrawer = (
  props: MiniGridStationConsumerDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    miniGridStationConsumer,
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
    residential: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Must be an integer"),
    commercial: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Must be an integer"),
    productive_industrial: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Must be an integer"),
    health_centers: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Must be an integer"),
    schools: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Must be an integer"),
    street_lighting: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Must be an integer"),
    other: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Must be an integer"),
    expected_electricity_sales: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    electricity_tariff: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable(),
  });

  const isEdit = Boolean(miniGridStationConsumer?.id);

  const createMiniGridStationConsumer = async (
    body: IApiPayload<MiniGridStationConsumer>,
  ) =>
    projectOtherApiSecondService<MiniGridStationConsumer>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editMiniGridStationConsumer = async (
    body: IApiPayload<MiniGridStationConsumer>,
  ) =>
    projectOtherApiSecondService<MiniGridStationConsumer>().update(
      otherSubMenu?.apiRoute || "",
      miniGridStationConsumer?.id || "",
      body,
    );

  const getPayload = (values: MiniGridStationConsumer) => ({
    data: {
      project_id: projectId,
      mini_grid_station_id: values.mini_grid_station_id,
      name: values.name,
      residential: values.residential,
      commercial: values.commercial,
      productive_industrial: values.productive_industrial,
      health_centers: values.health_centers,
      schools: values.schools,
      street_lighting: values.street_lighting,
      other: values.other,
      expected_electricity_sales: values.expected_electricity_sales,
      electricity_tariff: values.electricity_tariff,
      remark: values.remark,
      id: miniGridStationConsumer?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<MiniGridStationConsumer>,
    payload: IApiPayload<MiniGridStationConsumer>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.mini_grid_station_consumer,
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
      title={`project.other.mini-grid-station-consumer.${
        isEdit
          ? `edit-mini-grid-station-consumer`
          : `create-mini-grid-station-consumer`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mini-grid-station-consumer.${
            isEdit
              ? `edit-mini-grid-station-consumer`
              : `create-mini-grid-station-consumer`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...miniGridStationConsumer,
          }}
          createActionFunc={
            isEdit ? editMiniGridStationConsumer : createMiniGridStationConsumer
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MiniGridStationConsumer>) => {
            return (
              <MiniGridStationConsumerForm
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

export default MiniGridStationConsumerDrawer;
