import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import WindEnergyForm from './wind-energy-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { WindEnergy } from 'src/types/project/other';

interface WindEnergyDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  windEnergy: WindEnergy;
  projectId: string;
  model: string;
}

const WindEnergyDrawer = (props: WindEnergyDrawerType) => {
  const { open, toggle, refetch, windEnergy, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(windEnergy?.id);

  const createWindEnergy = async (body: IApiPayload<WindEnergy>) => projectOtherApiService<WindEnergy>().create(model, body);

  const editWindEnergy = async (body: IApiPayload<WindEnergy>) =>
    projectOtherApiService<WindEnergy>().update(model, windEnergy?.id || '', body);

  const getPayload = (values: WindEnergy) => {
    return {
      data: {
        ...values,
        id: windEnergy?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<WindEnergy>, payload: IApiPayload<WindEnergy>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.windEnergy, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.wind-energy.${isEdit ? `edit-wind-energy` : `create-wind-energy`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.wind-energy.${isEdit ? `edit-wind-energy` : `create-wind-energy`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(windEnergy as WindEnergy)
          }}
          createActionFunc={isEdit ? editWindEnergy : createWindEnergy}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<WindEnergy>) => {
            return <WindEnergyForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default WindEnergyDrawer;
