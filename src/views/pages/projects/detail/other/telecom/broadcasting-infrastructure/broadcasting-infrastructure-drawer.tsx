'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BroadcastingInfrastructureForm from './broadcasting-infrastructure-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { BroadcastingInfrastructure } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface BroadcastingInfrastructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  broadcastingInfrastructure: BroadcastingInfrastructure;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BroadcastingInfrastructureDrawer = (props: BroadcastingInfrastructureDrawerType) => {
  const { open, toggle, refetch, broadcastingInfrastructure, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().nullable(),
    broadcasting_infrastructure_type_id: yup.string().required('Broadcasting infrastructure type is required'),
    broadcasting_network: yup.boolean().nullable(),
    antennas: yup.boolean().nullable(),
    transmitters: yup.boolean().nullable(),
    towers: yup.boolean().nullable(),
    cables: yup.boolean().nullable(),
    others: yup.string().nullable().max(100, 'Others cannot exceed 100 characters')
  });

  const isEdit = Boolean(broadcastingInfrastructure?.id);

  const createBroadcastingInfrastructure = async (body: IApiPayload<BroadcastingInfrastructure>) =>
    projectOtherApiSecondService<BroadcastingInfrastructure>().create(otherSubMenu?.apiRoute || '', body);

  const editBroadcastingInfrastructure = async (body: IApiPayload<BroadcastingInfrastructure>) =>
    projectOtherApiSecondService<BroadcastingInfrastructure>().update(
      otherSubMenu?.apiRoute || '',
      broadcastingInfrastructure?.id || '',
      body
    );

  const getPayload = (values: BroadcastingInfrastructure) => ({
    data: {
      project_id: projectId,
      broadcasting_infrastructure_type_id: values.broadcasting_infrastructure_type_id,
      broadcasting_network: values.broadcasting_network,
      antennas: values.antennas,
      transmitters: values.transmitters,
      towers: values.towers,
      cables: values.cables,
      others: values.others,
      id: broadcastingInfrastructure?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BroadcastingInfrastructure>, payload: IApiPayload<BroadcastingInfrastructure>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.broadcastingInfrastructure, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.broadcasting-infrastructure.${
        isEdit ? `edit-broadcasting-infrastructure` : `create-broadcasting-infrastructure`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.broadcasting-infrastructure.${
            isEdit ? `edit-broadcasting-infrastructure` : `create-broadcasting-infrastructure`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...broadcastingInfrastructure
          }}
          createActionFunc={isEdit ? editBroadcastingInfrastructure : createBroadcastingInfrastructure}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BroadcastingInfrastructure>) => {
            return <BroadcastingInfrastructureForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BroadcastingInfrastructureDrawer;
