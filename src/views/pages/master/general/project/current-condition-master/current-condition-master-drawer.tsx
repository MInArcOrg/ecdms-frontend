import { FormikProps } from "formik";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import CurrentConditionMasterForm from "./current-condition-master-form";
import { CurrentCondition } from "src/types/general/general-master";
import currentConditionMasterService from "src/services/general/project/current-condition-master-service";

interface CurrentConditionMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: CurrentCondition;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const CurrentConditionMasterDrawer = (
  props: CurrentConditionMasterDrawerType,
) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createCurrentConditionMaster = async (
    body: IApiPayload<CurrentCondition>,
  ) => {
    return await currentConditionMasterService.create(body);
  };

  const editCurrentConditionMaster = async (
    body: IApiPayload<CurrentCondition>,
  ) => {
    return await currentConditionMasterService.update(
      masterData?.id || "",
      body,
    );
  };

  const getPayload = (values: CurrentCondition) => {
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
    response: IApiResponse<CurrentCondition>,
    payload: IApiPayload<CurrentCondition>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `CURRENT_CONDITION`,
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
        isEdit ? "edit-current-condition" : "create-current-condition"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<CurrentCondition>
          edit={isEdit}
          title="master-data.general-master.current-conditions"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit ? editCurrentConditionMaster : createCurrentConditionMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CurrentCondition>) => {
            return (
              <>
                <CurrentConditionMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as CurrentCondition}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};
export default CurrentConditionMasterDrawer;
