import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SpillwayInfoForm from './spillway-info-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { SpillwayInfo } from 'src/types/project/other';

interface SpillwayInfoDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  spillwayInfo: SpillwayInfo;
  projectId: string;
  model: string;
}

const SpillwayInfoDrawer = (props: SpillwayInfoDrawerType) => {
  const { open, toggle, refetch, spillwayInfo, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(spillwayInfo?.id);

  const createSpillwayInfo = async (body: IApiPayload<SpillwayInfo>) => projectOtherApiService<SpillwayInfo>().create(model, body);

  const editSpillwayInfo = async (body: IApiPayload<SpillwayInfo>) =>
    projectOtherApiService<SpillwayInfo>().update(model, spillwayInfo?.id || '', body);

  const getPayload = (values: SpillwayInfo) => {
    return {
      data: {
        ...values,
        id: spillwayInfo?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<SpillwayInfo>, payload: IApiPayload<SpillwayInfo>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.spillwayInfo, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.spillway-info.${isEdit ? `edit-spillway-info` : `create-spillway-info`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.spillway-info.${isEdit ? `edit-spillway-info` : `create-spillway-info`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(spillwayInfo as SpillwayInfo)
          }}
          createActionFunc={isEdit ? editSpillwayInfo : createSpillwayInfo}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SpillwayInfo>) => {
            return <SpillwayInfoForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SpillwayInfoDrawer;
