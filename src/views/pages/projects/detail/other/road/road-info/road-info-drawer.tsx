import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RoadInfoForm from './road-info-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { RoadInfo } from 'src/types/project/other';

interface RoadInfoDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  roadInfo: RoadInfo;
  projectId: string;
  model: string;
}

const RoadInfoDrawer = (props: RoadInfoDrawerType) => {
  const { open, toggle, refetch, roadInfo, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(roadInfo?.id);

  const createRoadInfo = async (body: IApiPayload<RoadInfo>) => projectOtherApiService<RoadInfo>().create(model, body);

  const editRoadInfo = async (body: IApiPayload<RoadInfo>) => projectOtherApiService<RoadInfo>().update(model, roadInfo?.id || '', body);

  const getPayload = (values: RoadInfo) => {
    return {
      data: {
        ...values,
        id: roadInfo?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<RoadInfo>, payload: IApiPayload<RoadInfo>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.roadInfo, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.road-info.${isEdit ? `edit-road-info` : `create-road-info`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-info.${isEdit ? `edit-road-info` : `create-road-info`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(roadInfo as RoadInfo)
          }}
          createActionFunc={isEdit ? editRoadInfo : createRoadInfo}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadInfo>) => {
            return <RoadInfoForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadInfoDrawer;
