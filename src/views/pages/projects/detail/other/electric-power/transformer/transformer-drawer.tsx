import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TransformerForm from './transformer-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { Transformer } from 'src/types/project/other';

interface TransformerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  transformer: Transformer;
  projectId: string;
  model: string;
}

const TransformerDrawer = (props: TransformerDrawerType) => {
  const { open, toggle, refetch, transformer, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(transformer?.id);

  const createTransformer = async (body: IApiPayload<Transformer>) => projectOtherApiService<Transformer>().create(model, body);

  const editTransformer = async (body: IApiPayload<Transformer>) =>
    projectOtherApiService<Transformer>().update(model, transformer?.id || '', body);

  const getPayload = (values: Transformer) => {
    return {
      data: {
        ...values,
        id: transformer?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<Transformer>, payload: IApiPayload<Transformer>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.transformer, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.transformer.${isEdit ? `edit-transformer` : `create-transformer`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.transformer.${isEdit ? `edit-transformer` : `create-transformer`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(transformer as Transformer)
          }}
          createActionFunc={isEdit ? editTransformer : createTransformer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Transformer>) => {
            return <TransformerForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TransformerDrawer;
