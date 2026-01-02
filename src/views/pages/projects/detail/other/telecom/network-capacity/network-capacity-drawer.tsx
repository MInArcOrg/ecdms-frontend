'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import NetworkCapacityForm from './network-capacity-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { NetworkCapacity, TelecomInfrastructureComponent } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface NetworkCapacityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  networkCapacity: NetworkCapacity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  telecomInfrastructureComponents: TelecomInfrastructureComponent[];
  mobileNetworkTypeMap: Map<string, string>;
}

const NetworkCapacityDrawer = (props: NetworkCapacityDrawerType) => {
  const { open, toggle, refetch, networkCapacity, projectId, otherSubMenu, telecomInfrastructureComponents, mobileNetworkTypeMap } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    network_type_id: yup.string().required('Network type is required'),
    telecom_infrastructure_id: yup.string().required(),
    total_bandwidth: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    users_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(networkCapacity?.id);

  const createNetworkCapacity = async (body: IApiPayload<NetworkCapacity>) =>
    projectOtherApiSecondService<NetworkCapacity>().create(otherSubMenu?.apiRoute || '', body);

  const editNetworkCapacity = async (body: IApiPayload<NetworkCapacity>) =>
    projectOtherApiSecondService<NetworkCapacity>().update(otherSubMenu?.apiRoute || '', networkCapacity?.id || '', body);

  const getPayload = (values: NetworkCapacity) => ({
    data: {
      project_id: projectId,
      telecom_infrastructure_id: values.telecom_infrastructure_id,
      network_type_id: values.network_type_id,
      total_bandwidth: values.total_bandwidth,
      users_number: values.users_number,
      remark: values.remark,
      id: networkCapacity?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<NetworkCapacity>, payload: IApiPayload<NetworkCapacity>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.networkCapacity, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.network-capacity.${isEdit ? `edit-network-capacity` : `create-network-capacity`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          key={networkCapacity?.id || 'new'}
          edit={isEdit}
          title={`project.other.network-capacity.${isEdit ? `edit-network-capacity` : `create-network-capacity`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...networkCapacity
          }}
          createActionFunc={isEdit ? editNetworkCapacity : createNetworkCapacity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<NetworkCapacity>) => {
            return (
              <NetworkCapacityForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                telecomInfrastructureComponents={telecomInfrastructureComponents}
                mobileNetworkTypeMap={mobileNetworkTypeMap}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default NetworkCapacityDrawer;
