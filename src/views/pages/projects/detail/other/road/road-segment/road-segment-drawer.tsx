import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RoadSegmentForm from './road-segment-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { RoadSegment } from 'src/types/project/other';

interface RoadSegmentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  roadSegment: RoadSegment;
  projectId: string;
  model: string;
}

const RoadSegmentDrawer = (props: RoadSegmentDrawerType) => {
  const { open, toggle, refetch, roadSegment, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(roadSegment?.id);

  const createRoadSegment = async (body: IApiPayload<RoadSegment>) => projectOtherApiService<RoadSegment>().create(model, body);

  const editRoadSegment = async (body: IApiPayload<RoadSegment>) =>
    projectOtherApiService<RoadSegment>().update(model, roadSegment?.id || '', body);

  const getPayload = (values: RoadSegment) => {
    return {
      data: {
        ...values,
        id: roadSegment?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<RoadSegment>, payload: IApiPayload<RoadSegment>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.roadSegment, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.road-segment.${isEdit ? `edit-road-segment` : `create-road-segment`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-segment.${isEdit ? `edit-road-segment` : `create-road-segment`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(roadSegment as RoadSegment)
          }}
          createActionFunc={isEdit ? editRoadSegment : createRoadSegment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadSegment>) => {
            return <RoadSegmentForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadSegmentDrawer;
