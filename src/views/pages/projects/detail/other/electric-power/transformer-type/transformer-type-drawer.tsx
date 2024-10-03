import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TransformerTypeForm from './transformer-type-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { TransformerType } from 'src/types/project/other';

interface TransformerTypeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  transformerType: TransformerType;
  projectId: string;
  model: string;
}

const TransformerTypeDrawer = (props: TransformerTypeDrawerType) => {
  const { open, toggle, refetch, transformerType, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(transformerType?.id);

  const createTransformerType = async (body: IApiPayload<TransformerType>) => projectOtherApiService<TransformerType>().create(model, body);

  const editTransformerType = async (body: IApiPayload<TransformerType>) =>
    projectOtherApiService<TransformerType>().update(model, transformerType?.id || '', body);

  const getPayload = (values: TransformerType) => {
    return {
      data: {
        ...values,
        id: transformerType?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<TransformerType>, payload: IApiPayload<TransformerType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.transformerType, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.transformer-type.${isEdit ? `edit-transformer-type` : `create-transformer-type`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.transformer-type.${isEdit ? `edit-transformer-type` : `create-transformer-type`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(transformerType as TransformerType)
          }}
          createActionFunc={isEdit ? editTransformerType : createTransformerType}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TransformerType>) => {
            return <TransformerTypeForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TransformerTypeDrawer;
