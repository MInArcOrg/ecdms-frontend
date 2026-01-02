'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MobileNetworkCapacityForm from './mobile-network-capacity-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { MobileNetwork, MobileNetworkCapacity } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface MobileNetworkCapacityDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  mobileNetworkCapacity: MobileNetworkCapacity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  mobileNetworks: MobileNetwork[];
}

const MobileNetworkCapacityDrawer = (props: MobileNetworkCapacityDrawerType) => {
  const { open, toggle, refetch, mobileNetworkCapacity, projectId, otherSubMenu, mobileNetworks } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    network_type_id: yup.string().required('Network type is required'),
    mobile_network_id: yup.string().required(),
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

  const isEdit = Boolean(mobileNetworkCapacity?.id);

  const createMobileNetworkCapacity = async (body: IApiPayload<MobileNetworkCapacity>) =>
    projectOtherApiSecondService<MobileNetworkCapacity>().create(otherSubMenu?.apiRoute || '', body);

  const editMobileNetworkCapacity = async (body: IApiPayload<MobileNetworkCapacity>) =>
    projectOtherApiSecondService<MobileNetworkCapacity>().update(otherSubMenu?.apiRoute || '', mobileNetworkCapacity?.id || '', body);

  const getPayload = (values: MobileNetworkCapacity) => ({
    data: {
      project_id: projectId,
      mobile_network_id: values.mobile_network_id,
      network_type_id: values.network_type_id,
      total_bandwidth: values.total_bandwidth,
      users_number: values.users_number,
      remark: values.remark,
      id: mobileNetworkCapacity?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<MobileNetworkCapacity>, payload: IApiPayload<MobileNetworkCapacity>) => {
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
          key={mobileNetworkCapacity?.id || 'new'}
          edit={isEdit}
          title={`project.other.network-capacity.${isEdit ? `edit-network-capacity` : `create-network-capacity`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...mobileNetworkCapacity
          }}
          createActionFunc={isEdit ? editMobileNetworkCapacity : createMobileNetworkCapacity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MobileNetworkCapacity>) => {
            return (
              <MobileNetworkCapacityForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                mobileNetworks={mobileNetworks}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MobileNetworkCapacityDrawer;
