import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BuildingDimensionDetailForm from './building-dimension-detail-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { BuildingDimensionDetail } from 'src/types/project/other';

interface BuildingDimensionDetailDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  buildingDimensionDetail: BuildingDimensionDetail;
  projectId: string;
  model: string;
}

const BuildingDimensionDetailDrawer = (props: BuildingDimensionDetailDrawerType) => {
  const { open, toggle, refetch, buildingDimensionDetail, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(buildingDimensionDetail?.id);

  const createBuildingDimensionDetail = async (body: IApiPayload<BuildingDimensionDetail>) =>
    projectOtherApiService<BuildingDimensionDetail>().create(model, body);

  const editBuildingDimensionDetail = async (body: IApiPayload<BuildingDimensionDetail>) =>
    projectOtherApiService<BuildingDimensionDetail>().update(model, buildingDimensionDetail?.id || '', body);

  const getPayload = (values: BuildingDimensionDetail) => {
    return {
      data: {
        ...values,
        id: buildingDimensionDetail?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BuildingDimensionDetail>, payload: IApiPayload<BuildingDimensionDetail>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.buildingDimensionDetail, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.building-dimension-detail.${isEdit ? `edit-building-dimension-detail` : `create-building-dimension-detail`}`}
      handleClose={handleClose}
      width={700}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.building-dimension-detail.${
            isEdit ? `edit-building-dimension-detail` : `create-building-dimension-detail`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(buildingDimensionDetail as BuildingDimensionDetail)
          }}
          createActionFunc={isEdit ? editBuildingDimensionDetail : createBuildingDimensionDetail}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BuildingDimensionDetail>) => {
            return <BuildingDimensionDetailForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BuildingDimensionDetailDrawer;
