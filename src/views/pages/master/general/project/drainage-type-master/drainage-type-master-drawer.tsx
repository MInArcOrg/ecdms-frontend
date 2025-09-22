import { FormikProps } from "formik";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import DrainageTypeMasterForm from "./drainage-type-master-form";
import { DrainageType } from "src/types/general/general-master";
import roadLengthTypeMasterService from "src/services/general/project/drainage-type-master-service";

interface DrainageTypeMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: DrainageType;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const DrainageTypeMasterDrawer = (props: DrainageTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createDrainageTypeMaster = async (body: IApiPayload<DrainageType>) => {
    return await roadLengthTypeMasterService.create(body);
  };

  const editDrainageTypeMaster = async (body: IApiPayload<DrainageType>) => {
    return await roadLengthTypeMasterService.update(masterData?.id || "", body);
  };

  const getPayload = (values: DrainageType) => {
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
    response: IApiResponse<DrainageType>,
    payload: IApiPayload<DrainageType>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `DRAINAGE_TYPE`,
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
        isEdit ? "edit-drainage-type" : "create-drainage-type"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DrainageType>
          edit={isEdit}
          title="master-data.general-master.drainage-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit ? editDrainageTypeMaster : createDrainageTypeMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DrainageType>) => {
            return (
              <>
                <DrainageTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DrainageType}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DrainageTypeMasterDrawer;
