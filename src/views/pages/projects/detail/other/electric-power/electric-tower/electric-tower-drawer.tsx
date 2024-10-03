import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ElectricTowerForm from './electric-tower-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ElectricTower } from 'src/types/project/other';

interface ElectricTowerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  electricTower: ElectricTower;
  projectId: string;
  model: string;
}

const ElectricTowerDrawer = (props: ElectricTowerDrawerType) => {
  const { open, toggle, refetch, electricTower, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(electricTower?.id);

  const createElectricTower = async (body: IApiPayload<ElectricTower>) => projectOtherApiService<ElectricTower>().create(model, body);

  const editElectricTower = async (body: IApiPayload<ElectricTower>) =>
    projectOtherApiService<ElectricTower>().update(model, electricTower?.id || '', body);

  const getPayload = (values: ElectricTower) => {
    return {
      data: {
        ...values,
        id: electricTower?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ElectricTower>, payload: IApiPayload<ElectricTower>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.electricTower, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.electric-tower.${isEdit ? `edit-electric-tower` : `create-electric-tower`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-tower.${isEdit ? `edit-electric-tower` : `create-electric-tower`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(electricTower as ElectricTower)
          }}
          createActionFunc={isEdit ? editElectricTower : createElectricTower}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricTower>) => {
            return <ElectricTowerForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ElectricTowerDrawer;
