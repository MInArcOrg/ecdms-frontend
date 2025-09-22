"use client";
import type { FormikProps } from "formik";
import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import type { RailwayTracksGeometryData } from "src/types/project/other";
import type { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import RailwayTracksGeometryDataForm from "./railway-tracks-geometry-data-form";

interface RailwayTracksGeometryDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayTracksGeometryData: RailwayTracksGeometryData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayTracksGeometryDataDrawer = (
  props: RailwayTracksGeometryDataDrawerType,
) => {
  const {
    open,
    toggle,
    refetch,
    railwayTracksGeometryData,
    projectId,
    otherSubMenu,
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const isEdit = Boolean(railwayTracksGeometryData?.id);

  const createRailwayTracksGeometryData = async (
    body: IApiPayload<RailwayTracksGeometryData>,
  ) =>
    projectOtherApiSecondService<RailwayTracksGeometryData>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editRailwayTracksGeometryData = async (
    body: IApiPayload<RailwayTracksGeometryData>,
  ) =>
    projectOtherApiSecondService<RailwayTracksGeometryData>().update(
      otherSubMenu?.apiRoute || "",
      railwayTracksGeometryData?.id || "",
      body,
    );

  const validationSchema = yup.object().shape({
    alignment: yup.string().nullable(),
    gradient: yup.number().nullable(),
    curvature_radius: yup.number().nullable(),
    cant: yup.string().nullable(),
    track_gauge: yup.string().nullable(),
    cross_level: yup.string().nullable(),
    track_surface_profile: yup.string().nullable(),
    twist: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const getPayload = (values: RailwayTracksGeometryData) => ({
    data: {
      project_id: projectId,
      alignment: values.alignment,
      gradient: values.gradient,
      curvature_radius: values.curvature_radius,
      cant: values.cant,
      track_gauge: values.track_gauge,
      cross_level: values.cross_level,
      track_surface_profile: values.track_surface_profile,
      twist: values.twist,
      remark: values.remark,
      id: railwayTracksGeometryData?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayTracksGeometryData>,
    payload: IApiPayload<RailwayTracksGeometryData>,
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
      title={`project.other.railway-tracks-geometry-data.${
        isEdit
          ? `edit-railway-tracks-geometry-data`
          : `create-railway-tracks-geometry-data`
      }`}
      model="railwaytracksgeometrydata"
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-tracks-geometry-data.${
            isEdit
              ? `edit-railway-tracks-geometry-data`
              : `create-railway-tracks-geometry-data`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayTracksGeometryData,
          }}
          createActionFunc={
            isEdit
              ? editRailwayTracksGeometryData
              : createRailwayTracksGeometryData
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayTracksGeometryData>) => {
            return (
              <RailwayTracksGeometryDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayTracksGeometryDataDrawer;
