'use client';

import type { FormikProps } from 'formik';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { SatelliteNetwork, SatelliteNetworkCapacity } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SatelliteNetworkCapacityForm from './satellite-network-capacity-form';

interface SatelliteNetworkCapacityDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  satelliteNetworkCapacity: SatelliteNetworkCapacity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  satelliteNetworks: SatelliteNetwork[];
}

const SatelliteNetworkCapacityDrawer = ({
  open,
  toggle,
  refetch,
  satelliteNetworkCapacity,
  projectId,
  otherSubMenu,
  satelliteNetworks
}: SatelliteNetworkCapacityDrawerProps) => {
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    satellite_network_id: yup.string().required('Satellite network is required'),
    network_type_id: yup.string().required('Network type is required'),
    total_bandwidth: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
    users_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(satelliteNetworkCapacity?.id);

  const createSatelliteNetworkCapacity = async (body: IApiPayload<SatelliteNetworkCapacity>) =>
    projectOtherApiSecondService<SatelliteNetworkCapacity>().create(otherSubMenu?.apiRoute || '', body);

  const editSatelliteNetworkCapacity = async (body: IApiPayload<SatelliteNetworkCapacity>) =>
    projectOtherApiSecondService<SatelliteNetworkCapacity>().update(otherSubMenu?.apiRoute || '', satelliteNetworkCapacity?.id || '', body);

  const getPayload = (values: SatelliteNetworkCapacity) => ({
    data: {
      project_id: projectId,
      satellite_network_id: values.satellite_network_id,
      network_type_id: values.network_type_id,
      total_bandwidth: values.total_bandwidth,
      users_number: values.users_number,
      remark: values.remark,
      id: satelliteNetworkCapacity?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<SatelliteNetworkCapacity>,
    payload: IApiPayload<SatelliteNetworkCapacity>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.satelliteNetworkCapacity, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.satellite-network-capacity.${isEdit ? `edit-satellite-network-capacity` : `create-satellite-network-capacity`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          key={satelliteNetworkCapacity?.id || 'new'}
          edit={isEdit}
          title={`project.other.satellite-network-capacity.${isEdit ? `edit-satellite-network-capacity` : `create-satellite-network-capacity`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...satelliteNetworkCapacity
          }}
          createActionFunc={isEdit ? editSatelliteNetworkCapacity : createSatelliteNetworkCapacity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SatelliteNetworkCapacity>) => {
            return (
              <SatelliteNetworkCapacityForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                satelliteNetworks={satelliteNetworks}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SatelliteNetworkCapacityDrawer;

