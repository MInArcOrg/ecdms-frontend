'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeSubStructureForm from './bridge-sub-structure-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { BridgeSubStructure } from 'src/types/project/other';

interface BridgeSubStructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeSubStructure: BridgeSubStructure;
  projectId: string;
  model: string;
}

const BridgeSubStructureDrawer = (props: BridgeSubStructureDrawerType) => {
  const { open, toggle, refetch, bridgeSubStructure, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    bridge_name: yup.string().required('Bridge name is required'),
    pier_type_id: yup.string().required('Pier type is required')
  });

  const isEdit = Boolean(bridgeSubStructure?.id);

  const createBridgeSubStructure = async (body: IApiPayload<BridgeSubStructure>) =>
    projectOtherApiService<BridgeSubStructure>().create(model, body);

  const editBridgeSubStructure = async (body: IApiPayload<BridgeSubStructure>) =>
    projectOtherApiService<BridgeSubStructure>().update(model, bridgeSubStructure?.id || '', body);

  const getPayload = (values: BridgeSubStructure) => {
    return {
      data: {
        ...values,
        id: bridgeSubStructure?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<BridgeSubStructure>,
    payload: IApiPayload<BridgeSubStructure>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.bridgeSubStructure,
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
      title={`project.other.bridge-sub-structure.${
        isEdit ? `edit-bridge-sub-structure` : `create-bridge-sub-structure`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-sub-structure.${
            isEdit ? `edit-bridge-sub-structure` : `create-bridge-sub-structure`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeSubStructure
          }}
          createActionFunc={isEdit ? editBridgeSubStructure : createBridgeSubStructure}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeSubStructure>) => {
            return <BridgeSubStructureForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeSubStructureDrawer;
