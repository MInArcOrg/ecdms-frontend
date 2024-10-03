import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RoadLayerForm from './road-layer-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { RoadLayer } from 'src/types/project/other';

interface RoadLayerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  roadLayer: RoadLayer;
  projectId: string;
  model: string;
}

const RoadLayerDrawer = (props: RoadLayerDrawerType) => {
  const { open, toggle, refetch, roadLayer, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(roadLayer?.id);

  const createRoadLayer = async (body: IApiPayload<RoadLayer>) => projectOtherApiService<RoadLayer>().create(model, body);

  const editRoadLayer = async (body: IApiPayload<RoadLayer>) =>
    projectOtherApiService<RoadLayer>().update(model, roadLayer?.id || '', body);

  const getPayload = (values: RoadLayer) => {
    return {
      data: {
        ...values,
        id: roadLayer?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<RoadLayer>, payload: IApiPayload<RoadLayer>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.roadLayer, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.road-layer.${isEdit ? `edit-road-layer` : `create-road-layer`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-layer.${isEdit ? `edit-road-layer` : `create-road-layer`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(roadLayer as RoadLayer)
          }}
          createActionFunc={isEdit ? editRoadLayer : createRoadLayer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadLayer>) => {
            return <RoadLayerForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadLayerDrawer;
