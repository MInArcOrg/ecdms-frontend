import { FormikProps } from "formik";
import { useState } from "react";
import maintenanceFrequencyMasterService from "src/services/general/project/maintenance-frequency-master-service";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import MaintenanceFrequencyMasterForm from "./maintenance-frequency-master-form";
import { MaintenanceFrequency } from "src/types/general/general-master";

interface MaintenanceFrequencyMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: MaintenanceFrequency;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const MaintenanceFrequencyMasterDrawer = (
  props: MaintenanceFrequencyMasterDrawerType,
) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createMaintenanceFrequencyMaster = async (
    body: IApiPayload<MaintenanceFrequency>,
  ) => {
    return await maintenanceFrequencyMasterService.create(body);
  };

  const editMaintenanceFrequencyMaster = async (
    body: IApiPayload<MaintenanceFrequency>,
  ) => {
    return await maintenanceFrequencyMasterService.update(
      masterData?.id || "",
      body,
    );
  };

  const getPayload = (values: MaintenanceFrequency) => {
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
    response: IApiResponse<MaintenanceFrequency>,
    payload: IApiPayload<MaintenanceFrequency>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `MAINTENANCE_FREQUENCY`,
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
        isEdit ? "edit-maintenance-frequency" : "create-maintenance-frequency"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<MaintenanceFrequency>
          edit={isEdit}
          title="master-data.general-master.maintenance-frequencies"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit
              ? editMaintenanceFrequencyMaster
              : createMaintenanceFrequencyMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MaintenanceFrequency>) => {
            return (
              <>
                <MaintenanceFrequencyMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as MaintenanceFrequency}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MaintenanceFrequencyMasterDrawer;
