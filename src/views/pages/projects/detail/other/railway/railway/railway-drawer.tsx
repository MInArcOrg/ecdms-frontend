import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwayForm from './railway-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { Railway } from 'src/types/project/other';

interface RailwayDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railway: Railway;
  projectId: string;
  model: string;
}

const RailwayDrawer = (props: RailwayDrawerType) => {
  const { open, toggle, refetch, railway, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(railway?.id);

  const createRailway = async (body: IApiPayload<Railway>) => projectOtherApiService<Railway>().create(model, body);

  const editRailway = async (body: IApiPayload<Railway>) => projectOtherApiService<Railway>().update(model, railway?.id || '', body);

  const getPayload = (values: Railway) => {
    return {
      data: {
        ...values,
        id: railway?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<Railway>, payload: IApiPayload<Railway>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.railway, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`project.other.railway.${isEdit ? `edit-railway` : `create-railway`}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway.${isEdit ? `edit-railway` : `create-railway`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(railway as Railway)
          }}
          createActionFunc={isEdit ? editRailway : createRailway}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Railway>) => {
            return <RailwayForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayDrawer;
