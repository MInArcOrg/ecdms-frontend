import { FormikProps } from "formik";
import { useState } from "react";
import pedestrianFacilityMasterService from "src/services/general/project/pedestrian-facility-master-service";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import PedestrianFacilityMasterForm from "./pedestrian-facility-master-form";
import { PedestrianFacility } from "src/types/general/general-master";

interface PedestrianFacilityMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: PedestrianFacility;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const PedestrianFacilityMasterDrawer = (
  props: PedestrianFacilityMasterDrawerType,
) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createPedestrianFacilityMaster = async (
    body: IApiPayload<PedestrianFacility>,
  ) => {
    return await pedestrianFacilityMasterService.create(body);
  };

  const editPedestrianFacilityMaster = async (
    body: IApiPayload<PedestrianFacility>,
  ) => {
    return await pedestrianFacilityMasterService.update(
      masterData?.id || "",
      body,
    );
  };

  const getPayload = (values: PedestrianFacility) => {
    const payload = {
      data: {
        ...values,
        id: masterData?.id,
      },
      files: uploadableFile ? [uploadableFile] : [],
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<PedestrianFacility>,
    payload: IApiPayload<PedestrianFacility>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `PEDESTRIAN_FACILITY`,
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
      title={`master-data.general-master.${
        isEdit ? "edit-pedestrian-facility" : "create-pedestrian-facility"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<PedestrianFacility>
          edit={isEdit}
          title="master-data.general-master.pedestrian-facilities"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit
              ? editPedestrianFacilityMaster
              : createPedestrianFacilityMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<PedestrianFacility>) => {
            return (
              <>
                <PedestrianFacilityMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as PedestrianFacility}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default PedestrianFacilityMasterDrawer;
