import { FormikProps } from "formik";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import HydrologyDefectMasterForm from "./hydrology-defect-master-form";
import { HydrologyDefect } from "src/types/general/general-master";
import hydrologyDefectMasterService from "src/services/general/project/hydrology-defect-master-service";

interface HydrologyDefectMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: HydrologyDefect;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const HydrologyDefectMasterDrawer = (
  props: HydrologyDefectMasterDrawerType,
) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createHydrologyDefectMaster = async (
    body: IApiPayload<HydrologyDefect>,
  ) => {
    return await hydrologyDefectMasterService.create(body);
  };

  const editHydrologyDefectMaster = async (
    body: IApiPayload<HydrologyDefect>,
  ) => {
    return await hydrologyDefectMasterService.update(
      masterData?.id || "",
      body,
    );
  };

  const getPayload = (values: HydrologyDefect) => {
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
    response: IApiResponse<HydrologyDefect>,
    payload: IApiPayload<HydrologyDefect>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `HYDROLOGY_DEFECT`,
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
        isEdit ? "edit-hydrology-defect" : "create-hydrology-defect"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<HydrologyDefect>
          edit={isEdit}
          title="master-data.general-master.hydrology-defects"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit ? editHydrologyDefectMaster : createHydrologyDefectMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<HydrologyDefect>) => {
            return (
              <>
                <HydrologyDefectMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as HydrologyDefect}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default HydrologyDefectMasterDrawer;
