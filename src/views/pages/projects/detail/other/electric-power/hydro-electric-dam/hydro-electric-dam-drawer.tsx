import { FormikProps } from "formik";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import HydroElectricDamForm from "./hydro-electric-dam-form";

import { useState } from "react";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import { HydroElectricDam } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";

interface HydroElectricDamDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  hydroElectricDam: HydroElectricDam;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const HydroElectricDamDrawer = (props: HydroElectricDamDrawerType) => {
  const { open, toggle, refetch, hydroElectricDam, projectId, otherSubMenu } =
    props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    river_name: yup
      .string()
      .max(100, "River name must be at most 100 characters")
      .required("River name is required"),
    elevation_from_sea_level: yup
      .string()
      .max(100)
      .nullable(),
    elevation_from_ngl: yup.string().max(100).nullable(),
    dam_type: yup.string().max(100).nullable(),
    dam_volume: yup.string().max(100).nullable(),
    gated_spillway_no: yup
      .number()
      .integer("Gated spillway number must be an integer")
      .nullable(),
    none_gated_spillway_no: yup
      .number()
      .integer("None-gated spillway number must be an integer")
      .nullable(),
  }); 

  const isEdit = Boolean(hydroElectricDam?.id);

  const createHydroElectricDam = async (body: IApiPayload<HydroElectricDam>) =>
    projectOtherApiSecondService<HydroElectricDam>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editHydroElectricDam = async (body: IApiPayload<HydroElectricDam>) =>
    projectOtherApiSecondService<HydroElectricDam>().update(
      otherSubMenu?.apiRoute,
      hydroElectricDam?.id || "",
      body,
    );

  const getPayload = (values: HydroElectricDam) => {
    return {
      data: {
        ...values,
        id: hydroElectricDam?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<HydroElectricDam>,
    payload: IApiPayload<HydroElectricDam>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.hydroElectricDam,
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
      title={`project.other.hydro-electric-dam.${
        isEdit ? `edit-hydro-electric-dam` : `create-hydro-electric-dam`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.hydro-electric-dam.${
            isEdit ? `edit-hydro-electric-dam` : `create-hydro-electric-dam`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...hydroElectricDam,
          }}
          createActionFunc={
            isEdit ? editHydroElectricDam : createHydroElectricDam
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<HydroElectricDam>) => {
            return (
              <HydroElectricDamForm
                projectId={projectId}
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

export default HydroElectricDamDrawer;
