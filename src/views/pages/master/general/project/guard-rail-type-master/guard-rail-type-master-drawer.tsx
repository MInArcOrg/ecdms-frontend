import { FormikProps } from "formik";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import GuardRailTypeMasterForm from "./guard-rail-type-master-form";
import { GuardRailType } from "src/types/general/general-master";
import guardRailTypeMasterService from "src/services/general/project/guard-rail-type-master-service";

interface GuardRailTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: GuardRailType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const GuardRailTypeMasterDrawer = (props: GuardRailTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createGuardRailTypeMaster = async (
    body: IApiPayload<GuardRailType>,
  ) => {
    return await guardRailTypeMasterService.create(body);
  };

  const editGuardRailTypeMaster = async (body: IApiPayload<GuardRailType>) => {
    return await guardRailTypeMasterService.update(masterData?.id || "", body);
  };

  const getPayload = (values: GuardRailType) => {
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
    response: IApiResponse<GuardRailType>,
    payload: IApiPayload<GuardRailType>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `GUARD_RAIL_TYPE`,
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
        isEdit ? "edit-guard-rail-type" : "create-guard-rail-type"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<GuardRailType>
          edit={isEdit}
          title="master-data.general-master.guard-rail-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit ? editGuardRailTypeMaster : createGuardRailTypeMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<GuardRailType>) => {
            return (
              <>
                <GuardRailTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as GuardRailType}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default GuardRailTypeMasterDrawer;
