import { FormikProps } from "formik";
import { useState } from "react";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import GroundWaterImpactMasterForm from "./ground-water-impact-master-form";
import { GroundWaterImpact } from "src/types/general/general-master";
import groundWaterImpactMasterService from "src/services/general/project/ground-water-impact-master-service";

interface GroundWaterImpactMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: GroundWaterImpact;
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const GroundWaterImpactMasterDrawer = (
  props: GroundWaterImpactMasterDrawerType,
) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createGroundWaterImpactMaster = async (
    body: IApiPayload<GroundWaterImpact>,
  ) => {
    return await groundWaterImpactMasterService.create(body);
  };

  const editGroundWaterImpactMaster = async (
    body: IApiPayload<GroundWaterImpact>,
  ) => {
    return await groundWaterImpactMasterService.update(
      masterData?.id || "",
      body,
    );
  };

  const getPayload = (values: GroundWaterImpact) => {
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
    response: IApiResponse<GroundWaterImpact>,
    payload: IApiPayload<GroundWaterImpact>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        `GROUND_WATER_IMPACT`,
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
        isEdit ? "edit-ground-water-impact" : "create-ground-water-impact"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<GroundWaterImpact>
          edit={isEdit}
          title="master-data.general-master.ground-water-impacts"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={
            isEdit ? editGroundWaterImpactMaster : createGroundWaterImpactMaster
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<GroundWaterImpact>) => {
            return (
              <>
                <GroundWaterImpactMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as GroundWaterImpact}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default GroundWaterImpactMasterDrawer;
