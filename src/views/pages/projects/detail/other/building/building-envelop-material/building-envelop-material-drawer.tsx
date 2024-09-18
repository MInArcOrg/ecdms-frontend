import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BuildingEnvelopMaterialForm from './building-envelop-material-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { BuildingEnvelopMaterial } from 'src/types/project/other';

interface BuildingEnvelopMaterialDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  buildingEnvelopMaterial: BuildingEnvelopMaterial;
  projectId: string;
  model: string;
}

const BuildingEnvelopMaterialDrawer = (props: BuildingEnvelopMaterialDrawerType) => {
  const { open, toggle, refetch, buildingEnvelopMaterial, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(buildingEnvelopMaterial?.id);

  const createBuildingEnvelopMaterial = async (body: IApiPayload<BuildingEnvelopMaterial>) =>
    projectOtherApiService<BuildingEnvelopMaterial>().create(model, body);

  const editBuildingEnvelopMaterial = async (body: IApiPayload<BuildingEnvelopMaterial>) =>
    projectOtherApiService<BuildingEnvelopMaterial>().update(model, buildingEnvelopMaterial?.id || '', body);

  const getPayload = (values: BuildingEnvelopMaterial) => {
    return {
      data: {
        ...values,
        id: buildingEnvelopMaterial?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BuildingEnvelopMaterial>, payload: IApiPayload<BuildingEnvelopMaterial>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.buildingEnvelopMaterial, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.building-envelop-material.${isEdit ? `edit-building-envelop-material` : `create-building-envelop-material`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.building-envelop-material.${
            isEdit ? `edit-building-envelop-material` : `create-building-envelop-material`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(buildingEnvelopMaterial as BuildingEnvelopMaterial)
          }}
          createActionFunc={isEdit ? editBuildingEnvelopMaterial : createBuildingEnvelopMaterial}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BuildingEnvelopMaterial>) => {
            return <BuildingEnvelopMaterialForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BuildingEnvelopMaterialDrawer;
