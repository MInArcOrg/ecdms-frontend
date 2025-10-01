import { FormikProps } from "formik";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import NetworkCoverageForm from "./network-coverage-form";

import { useState } from "react";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { uploadFile } from "src/services/utils/file-utils";
import { NetworkCoverage } from "src/types/project/other";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface NetworkCoverageDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  networkCoverage: NetworkCoverage;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const NetworkCoverageDrawer = (props: NetworkCoverageDrawerType) => {
  const { open, toggle, refetch, networkCoverage, projectId, otherSubMenu } =
    props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().nullable(),
    network_infrastructure_type_id: yup
      .string()
      .required("Network infrastructure type is required"),
    total_coverage_area: yup.number().nullable(),
    coverage_population_number: yup
      .number()
      .integer("Coverage population must be an integer")
      .nullable(),
    active_users_number: yup
      .number()
      .integer("Active users must be an integer")
      .nullable(),
    average_download_speed: yup.number().nullable(),
    average_upload_speed: yup.number().nullable(),
    signal_strength: yup.number().nullable(),
    others: yup.string().nullable(),
  });

  const isEdit = Boolean(networkCoverage?.id);

  const createNetworkCoverage = async (body: IApiPayload<NetworkCoverage>) =>
    projectOtherApiSecondService<NetworkCoverage>().create(
      otherSubMenu?.apiRoute || "",
      body,
    );

  const editNetworkCoverage = async (body: IApiPayload<NetworkCoverage>) =>
    projectOtherApiSecondService<NetworkCoverage>().update(
      otherSubMenu?.apiRoute || "",
      networkCoverage?.id || "",
      body,
    );

  const getPayload = (values: NetworkCoverage) => ({
    data: {
      ...values,
      project_id: projectId,
    },
    files: uploadableFile ? [uploadableFile] : [],
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<NetworkCoverage>,
    payload: IApiPayload<NetworkCoverage>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.networkCoverage,
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
      title={`project.other.network-coverage.${
        isEdit ? `edit-network-coverage` : `create-network-coverage`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.network-coverage.${
            isEdit ? `edit-network-coverage` : `create-network-coverage`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...networkCoverage,
          }}
          createActionFunc={
            isEdit ? editNetworkCoverage : createNetworkCoverage
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<NetworkCoverage>) => {
            return (
              <NetworkCoverageForm
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

export default NetworkCoverageDrawer;
