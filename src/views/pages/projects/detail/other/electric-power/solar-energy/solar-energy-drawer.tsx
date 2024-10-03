import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SolarEnergyForm from './solar-energy-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { SolarEnergy } from 'src/types/project/other';

interface SolarEnergyDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  solarEnergy: SolarEnergy;
  projectId: string;
  model: string;
}

const SolarEnergyDrawer = (props: SolarEnergyDrawerType) => {
  const { open, toggle, refetch, solarEnergy, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(solarEnergy?.id);

  const createSolarEnergy = async (body: IApiPayload<SolarEnergy>) => projectOtherApiService<SolarEnergy>().create(model, body);

  const editSolarEnergy = async (body: IApiPayload<SolarEnergy>) =>
    projectOtherApiService<SolarEnergy>().update(model, solarEnergy?.id || '', body);

  const getPayload = (values: SolarEnergy) => {
    return {
      data: {
        ...values,
        id: solarEnergy?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<SolarEnergy>, payload: IApiPayload<SolarEnergy>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.solarEnergy, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.solar-energy.${isEdit ? `edit-solar-energy` : `create-solar-energy`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.solar-energy.${isEdit ? `edit-solar-energy` : `create-solar-energy`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(solarEnergy as SolarEnergy)
          }}
          createActionFunc={isEdit ? editSolarEnergy : createSolarEnergy}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SolarEnergy>) => {
            return <SolarEnergyForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SolarEnergyDrawer;
