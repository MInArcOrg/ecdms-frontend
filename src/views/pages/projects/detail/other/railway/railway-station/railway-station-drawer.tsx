import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwayStationForm from './railway-station-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { RailwayStation } from 'src/types/project/other';

interface RailwayStationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayStation: RailwayStation;
  projectId: string;
  model: string;
}

const RailwayStationDrawer = (props: RailwayStationDrawerType) => {
  const { open, toggle, refetch, railwayStation, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(railwayStation?.id);

  const createRailwayStation = async (body: IApiPayload<RailwayStation>) => projectOtherApiService<RailwayStation>().create(model, body);

  const editRailwayStation = async (body: IApiPayload<RailwayStation>) =>
    projectOtherApiService<RailwayStation>().update(model, railwayStation?.id || '', body);

  const getPayload = (values: RailwayStation) => {
    return {
      data: {
        ...values,
        id: railwayStation?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<RailwayStation>, payload: IApiPayload<RailwayStation>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.railwayStation, response.payload.id, '', '');
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
            ...(railwayStation as RailwayStation)
          }}
          createActionFunc={isEdit ? editRailwayStation : createRailwayStation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayStation>) => {
            return <RailwayStationForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayStationDrawer;
