'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SatelliteNetworkForm from './satellite-network-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { SatelliteNetwork } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface SatelliteNetworkDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  satelliteNetwork: SatelliteNetwork;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const SatelliteNetworkDrawer = (props: SatelliteNetworkDrawerType) => {
  const { open, toggle, refetch, satelliteNetwork, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    satellite_network_type_id: yup.string().required('Satellite network type is required'),
    satellite: yup.boolean().nullable(),
    ground_stations: yup.boolean().nullable(),
    modems: yup.boolean().nullable(),
    routers: yup.boolean().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(satelliteNetwork?.id);

  const createSatelliteNetwork = async (body: IApiPayload<SatelliteNetwork>) =>
    projectOtherApiSecondService<SatelliteNetwork>().create(otherSubMenu?.apiRoute || '', body);

  const editSatelliteNetwork = async (body: IApiPayload<SatelliteNetwork>) =>
    projectOtherApiSecondService<SatelliteNetwork>().update(otherSubMenu?.apiRoute || '', satelliteNetwork?.id || '', body);

  const getPayload = (values: SatelliteNetwork) => ({
    data: {
      ...values,
      project_id: projectId,
      satellite_network_type_id: values.satellite_network_type_id,
      satellite: values.satellite,
      ground_stations: values.ground_stations,
      modems: values.modems,
      routers: values.routers,
      others: values.others,
      id: satelliteNetwork?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<SatelliteNetwork>, payload: IApiPayload<SatelliteNetwork>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.satelliteNetwork, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.satellite-network.${isEdit ? `edit-satellite-network` : `create-satellite-network`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.satellite-network.${isEdit ? `edit-satellite-network` : `create-satellite-network`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...satelliteNetwork
          }}
          createActionFunc={isEdit ? editSatelliteNetwork : createSatelliteNetwork}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SatelliteNetwork>) => {
            return <SatelliteNetworkForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SatelliteNetworkDrawer;
