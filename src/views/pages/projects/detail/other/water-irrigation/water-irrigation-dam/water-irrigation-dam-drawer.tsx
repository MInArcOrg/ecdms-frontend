import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import WaterIrrigationDamForm from './water-irrigation-dam-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { WaterIrrigationDam } from 'src/types/project/other';

interface WaterIrrigationDamDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  waterIrrigationDam: WaterIrrigationDam;
  projectId: string;
  model: string;
}

const WaterIrrigationDamDrawer = (props: WaterIrrigationDamDrawerType) => {
  const { open, toggle, refetch, waterIrrigationDam, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(waterIrrigationDam?.id);

  const createWaterIrrigationDam = async (body: IApiPayload<WaterIrrigationDam>) =>
    projectOtherApiService<WaterIrrigationDam>().create(model, body);

  const editWaterIrrigationDam = async (body: IApiPayload<WaterIrrigationDam>) =>
    projectOtherApiService<WaterIrrigationDam>().update(model, waterIrrigationDam?.id || '', body);

  const getPayload = (values: WaterIrrigationDam) => {
    return {
      data: {
        ...values,
        id: waterIrrigationDam?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<WaterIrrigationDam>, payload: IApiPayload<WaterIrrigationDam>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.waterIrrigationDam, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.water-irrigation-dam.${isEdit ? `edit-water-irrigation-dam` : `create-water-irrigation-dam`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.water-irrigation-dam.${isEdit ? `edit-water-irrigation-dam` : `create-water-irrigation-dam`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(waterIrrigationDam as WaterIrrigationDam)
          }}
          createActionFunc={isEdit ? editWaterIrrigationDam : createWaterIrrigationDam}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<WaterIrrigationDam>) => {
            return <WaterIrrigationDamForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default WaterIrrigationDamDrawer;
