import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TelecomInfrastructureForm from './telecom-infrastructure-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { TelecomInfrastructure } from 'src/types/project/other';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface TelecomInfrastructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  telecomInfrastructure: TelecomInfrastructure;
  projectId: string;
  model: string;
}

const TelecomInfrastructureDrawer = (props: TelecomInfrastructureDrawerType) => {
  const { open, toggle, refetch, telecomInfrastructure, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(telecomInfrastructure?.id);

  const createTelecomInfrastructure = async (body: IApiPayload<TelecomInfrastructure>) =>
    projectOtherApiService<TelecomInfrastructure>().create(model, body);

  const editTelecomInfrastructure = async (body: IApiPayload<TelecomInfrastructure>) =>
    projectOtherApiService<TelecomInfrastructure>().update(model, telecomInfrastructure?.id || '', body);

  const getPayload = (values: TelecomInfrastructure) => {
    return {
      data: {
        ...values,
        id: telecomInfrastructure?.id,
        project_id: projectId,
        inauguration_date: convertDateToLocaleDate(values.inauguration_date),
        service_period: convertDateToLocaleDate(values.service_period)
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<TelecomInfrastructure>, payload: IApiPayload<TelecomInfrastructure>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.telecomInfrastructure, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.telecom-infrastructure.${isEdit ? `edit-telecom-infrastructure` : `create-telecom-infrastructure`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.telecom-infrastructure.${isEdit ? `edit-telecom-infrastructure` : `create-telecom-infrastructure`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(telecomInfrastructure as TelecomInfrastructure),
            service_period: formatInitialDateDate(telecomInfrastructure?.service_period),
            inauguration_date: formatInitialDateDate(telecomInfrastructure?.inauguration_date)
          }}
          createActionFunc={isEdit ? editTelecomInfrastructure : createTelecomInfrastructure}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TelecomInfrastructure>) => {
            return <TelecomInfrastructureForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TelecomInfrastructureDrawer;
