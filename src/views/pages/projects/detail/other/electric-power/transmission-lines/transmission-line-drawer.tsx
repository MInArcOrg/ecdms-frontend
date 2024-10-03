import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TransmissionLineForm from './transmission-line-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { TransmissionLine } from 'src/types/project/other';

interface TransmissionLineDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  transmissionLine: TransmissionLine;
  projectId: string;
  model: string;
}

const TransmissionLineDrawer = (props: TransmissionLineDrawerType) => {
  const { open, toggle, refetch, transmissionLine, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(transmissionLine?.id);

  const createTransmissionLine = async (body: IApiPayload<TransmissionLine>) =>
    projectOtherApiService<TransmissionLine>().create(model, body);

  const editTransmissionLine = async (body: IApiPayload<TransmissionLine>) =>
    projectOtherApiService<TransmissionLine>().update(model, transmissionLine?.id || '', body);

  const getPayload = (values: TransmissionLine) => {
    return {
      data: {
        ...values,
        id: transmissionLine?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<TransmissionLine>, payload: IApiPayload<TransmissionLine>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.transmissionLine, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.transmission-line.${isEdit ? `edit-transmission-line` : `create-transmission-line`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.transmission-line.${isEdit ? `edit-transmission-line` : `create-transmission-line`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(transmissionLine as TransmissionLine)
          }}
          createActionFunc={isEdit ? editTransmissionLine : createTransmissionLine}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TransmissionLine>) => {
            return <TransmissionLineForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TransmissionLineDrawer;
