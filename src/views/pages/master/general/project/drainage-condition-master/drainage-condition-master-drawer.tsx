import { FormikProps } from "formik";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import DrainageConditionMasterForm from "./drainage-condition-master-form";
import { DrainageCondition } from "src/types/general/general-master";
import roadLengthTypeMasterService from "src/services/general/project/drainage-condition-master-service";

interface DrainageConditionMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: DrainageCondition;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const DrainageConditionMasterDrawer = (
  props: DrainageConditionMasterDrawerType,
) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createDrainageConditionMaster = async (
    body: IApiPayload<DrainageCondition>,
  ) => {
    return await roadLengthTypeMasterService.create(body);
  };

  const editDrainageConditionMaster = async (
    body: IApiPayload<DrainageCondition>,
  ) => {
    return await roadLengthTypeMasterService.update(masterData?.id || "", body);
  };

  const getPayload = (values: DrainageCondition) => {
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
    response: IApiResponse<DrainageCondition>,
    payload: IApiPayload<DrainageCondition>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `DRAINAGE_CONDITION`,
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
        isEdit ? "edit-drainage-condition" : "create-drainage-condition"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DrainageCondition>
          edit={isEdit}
          title="master-data.general-master.drainage-conditions"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit ? editDrainageConditionMaster : createDrainageConditionMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DrainageCondition>) => {
            return (
              <>
                <DrainageConditionMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DrainageCondition}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DrainageConditionMasterDrawer;
