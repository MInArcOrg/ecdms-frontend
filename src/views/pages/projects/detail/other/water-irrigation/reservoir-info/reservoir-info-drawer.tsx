import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ReservoirInfoForm from './reservoir-info-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ReservoirInfo } from 'src/types/project/other';

interface ReservoirInfoDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  reservoirInfo: ReservoirInfo;
  projectId: string;
  model: string;
}

const ReservoirInfoDrawer = (props: ReservoirInfoDrawerType) => {
  const { open, toggle, refetch, reservoirInfo, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(reservoirInfo?.id);

  const createReservoirInfo = async (body: IApiPayload<ReservoirInfo>) => projectOtherApiService<ReservoirInfo>().create(model, body);

  const editReservoirInfo = async (body: IApiPayload<ReservoirInfo>) =>
    projectOtherApiService<ReservoirInfo>().update(model, reservoirInfo?.id || '', body);

  const getPayload = (values: ReservoirInfo) => {
    return {
      data: {
        ...values,
        id: reservoirInfo?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ReservoirInfo>, payload: IApiPayload<ReservoirInfo>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.reservoirInfo, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.reservoir-info.${isEdit ? `edit-reservoir-info` : `create-reservoir-info`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.reservoir-info.${isEdit ? `edit-reservoir-info` : `create-reservoir-info`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(reservoirInfo as ReservoirInfo)
          }}
          createActionFunc={isEdit ? editReservoirInfo : createReservoirInfo}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ReservoirInfo>) => {
            return <ReservoirInfoForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ReservoirInfoDrawer;
