import { FormikProps } from "formik";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import SuggestedRepairMasterForm from "./suggested-repair-master-form";
import { SuggestedRepair } from "src/types/general/general-master";
import suggestedRepairMasterService from "src/services/general/project/suggested-repair-master-service";

interface SuggestedRepairMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: SuggestedRepair;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const SuggestedRepairMasterDrawer = (
  props: SuggestedRepairMasterDrawerType,
) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createSuggestedRepairMaster = async (
    body: IApiPayload<SuggestedRepair>,
  ) => {
    return await suggestedRepairMasterService.create(body);
  };

  const editSuggestedRepairMaster = async (
    body: IApiPayload<SuggestedRepair>,
  ) => {
    return await suggestedRepairMasterService.update(
      masterData?.id || "",
      body,
    );
  };

  const getPayload = (values: SuggestedRepair) => {
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
    response: IApiResponse<SuggestedRepair>,
    payload: IApiPayload<SuggestedRepair>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `SUGGESTED_REPAIR`,
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
        isEdit ? "edit-suggested-repair" : "create-suggested-repair"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<SuggestedRepair>
          edit={isEdit}
          title="master-data.general-master.suggested-repairs"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit ? editSuggestedRepairMaster : createSuggestedRepairMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SuggestedRepair>) => {
            return (
              <>
                <SuggestedRepairMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as SuggestedRepair}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};
export default SuggestedRepairMasterDrawer;
