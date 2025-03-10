'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeAreaDataForm from './bridge-area-data-form';

import { useState } from 'react';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { BridgeAreaData } from 'src/types/project/other';

interface BridgeAreaDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeAreaData: BridgeAreaData;
  projectId: string;
  model: string;
}

const BridgeAreaDataDrawer = (props: BridgeAreaDataDrawerType) => {
  const { open, toggle, refetch, bridgeAreaData, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    bridge_name: yup.string().required('Bridge name is required'),
    area_topography_id: yup.string().required('Area topography is required')
  });

  const isEdit = Boolean(bridgeAreaData?.id);

  const createBridgeAreaData = async (body: IApiPayload<BridgeAreaData>) =>
    projectOtherApiService<BridgeAreaData>().create(model, body);

  const editBridgeAreaData = async (body: IApiPayload<BridgeAreaData>) =>
    projectOtherApiService<BridgeAreaData>().update(model, bridgeAreaData?.id || '', body);

  const getPayload = (values: BridgeAreaData) => {
    return {
      data: {
        ...values,
        id: bridgeAreaData?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BridgeAreaData>, payload: IApiPayload<BridgeAreaData>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.bridgeAreaData, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-area-data.${isEdit ? `edit-bridge-area-data` : `create-bridge-area-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-area-data.${isEdit ? `edit-bridge-area-data` : `create-bridge-area-data`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeAreaData
          }}
          createActionFunc={isEdit ? editBridgeAreaData : createBridgeAreaData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeAreaData>) => {
            return <BridgeAreaDataForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeAreaDataDrawer;
