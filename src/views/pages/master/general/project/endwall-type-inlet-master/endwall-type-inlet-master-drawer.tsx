import { FormikProps } from "formik";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import EndwallTypeInletMasterForm from "./endwall-type-inlet-master-form";
import { EndwallTypeInlet } from "src/types/general/general-master";
import endwallTypeInletMasterService from "src/services/general/project/endwall-type-inlet-master-service";

interface EndwallTypeInletMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: EndwallTypeInlet;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const EndwallTypeInletMasterDrawer = (
  props: EndwallTypeInletMasterDrawerType,
) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createEndwallTypeInletMaster = async (
    body: IApiPayload<EndwallTypeInlet>,
  ) => {
    return await endwallTypeInletMasterService.create(body);
  };

  const editEndwallTypeInletMaster = async (
    body: IApiPayload<EndwallTypeInlet>,
  ) => {
    return await endwallTypeInletMasterService.update(
      masterData?.id || "",
      body,
    );
  };

  const getPayload = (values: EndwallTypeInlet) => {
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
    response: IApiResponse<EndwallTypeInlet>,
    payload: IApiPayload<EndwallTypeInlet>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `ENDWALL_TYPE_INLET`,
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
        isEdit ? "edit-endwall-type-inlet" : "create-endwall-type-inlet"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<EndwallTypeInlet>
          edit={isEdit}
          title="master-data.general-master.endwall-type-inlets"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit ? editEndwallTypeInletMaster : createEndwallTypeInletMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<EndwallTypeInlet>) => {
            return (
              <>
                <EndwallTypeInletMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as EndwallTypeInlet}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default EndwallTypeInletMasterDrawer;
