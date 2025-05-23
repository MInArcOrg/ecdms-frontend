import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TracksGeometryDataForm from './tracks-geometry-data-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { TracksGeometryData } from 'src/types/project/other';

interface TracksGeometryDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  tracksGeometryData: TracksGeometryData;
  projectId: string;
  model: string;
}

const TracksGeometryDataDrawer = (props: TracksGeometryDataDrawerType) => {
  const { open, toggle, refetch, tracksGeometryData, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(tracksGeometryData?.id);

  const createTracksGeometryData = async (body: IApiPayload<TracksGeometryData>) => projectOtherApiService<TracksGeometryData>().create(model, body);

  const editTracksGeometryData = async (body: IApiPayload<TracksGeometryData>) =>
    projectOtherApiService<TracksGeometryData>().update(model, tracksGeometryData?.id || '', body);

  const getPayload = (values: TracksGeometryData) => {
    return {
      data: {
        ...values,
        id: tracksGeometryData?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<TracksGeometryData>, payload: IApiPayload<TracksGeometryData>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.tracksGeometryData, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-station.${isEdit ? `edit-railway-station` : `create-railway-station`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-station.${isEdit ? `edit-railway-station` : `create-railway-station`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...tracksGeometryData
          }}
          createActionFunc={isEdit ? editTracksGeometryData : createTracksGeometryData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TracksGeometryData>) => {
            return <TracksGeometryDataForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TracksGeometryDataDrawer;
