import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TurbineInfoForm from './turbine-info-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { TurbineInfo } from 'src/types/project/other';

interface TurbineInfoDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  turbineInfo: TurbineInfo;
  projectId: string;
  model: string;
}

const TurbineInfoDrawer = (props: TurbineInfoDrawerType) => {
  const { open, toggle, refetch, turbineInfo, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(turbineInfo?.id);

  const createTurbineInfo = async (body: IApiPayload<TurbineInfo>) => projectOtherApiService<TurbineInfo>().create(model, body);

  const editTurbineInfo = async (body: IApiPayload<TurbineInfo>) =>
    projectOtherApiService<TurbineInfo>().update(model, turbineInfo?.id || '', body);

  const getPayload = (values: TurbineInfo) => {
    return {
      data: {
        ...values,
        id: turbineInfo?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<TurbineInfo>, payload: IApiPayload<TurbineInfo>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.turbineInfo, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.turbine-info.${isEdit ? `edit-turbine-info` : `create-turbine-info`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.turbine-info.${isEdit ? `edit-turbine-info` : `create-turbine-info`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(turbineInfo as TurbineInfo)
          }}
          createActionFunc={isEdit ? editTurbineInfo : createTurbineInfo}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TurbineInfo>) => {
            return <TurbineInfoForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TurbineInfoDrawer;
