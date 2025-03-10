'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeFoundationForm from './bridge-foundation-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { BridgeFoundation } from 'src/types/project/other';

interface BridgeFoundationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeFoundation: BridgeFoundation;
  projectId: string;
  model: string;
}

const BridgeFoundationDrawer = (props: BridgeFoundationDrawerType) => {
  const { open, toggle, refetch, bridgeFoundation, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    bridge_name: yup.string().required('Bridge name is required'),
    abutment_type_id: yup.string().required('Abutment type is required'),
    pier_type_id: yup.string().required('Pier type is required'),
    soil_type_id: yup.string().required('Soil type is required')
  });

  const isEdit = Boolean(bridgeFoundation?.id);

  const createBridgeFoundation = async (body: IApiPayload<BridgeFoundation>) =>
    projectOtherApiService<BridgeFoundation>().create(model, body);

  const editBridgeFoundation = async (body: IApiPayload<BridgeFoundation>) =>
    projectOtherApiService<BridgeFoundation>().update(model, bridgeFoundation?.id || '', body);

  const getPayload = (values: BridgeFoundation) => {
    return {
      data: {
        ...values,
        id: bridgeFoundation?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<BridgeFoundation>,
    payload: IApiPayload<BridgeFoundation>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.bridgeFoundation,
        response.payload.id,
        '',
        ''
      );
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-foundation.${
        isEdit ? `edit-bridge-foundation` : `create-bridge-foundation`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-foundation.${
            isEdit ? `edit-bridge-foundation` : `create-bridge-foundation`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeFoundation
          }}
          createActionFunc={isEdit ? editBridgeFoundation : createBridgeFoundation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeFoundation>) => {
            return <BridgeFoundationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeFoundationDrawer;
