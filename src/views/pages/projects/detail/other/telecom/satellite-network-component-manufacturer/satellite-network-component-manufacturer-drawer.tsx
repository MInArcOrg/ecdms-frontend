'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SatelliteNetworkComponentManufacturerForm from './satellite-network-component-manufacturer-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { SatelliteNetworkComponentManufacturer, SatelliteNetwork } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface SatelliteNetworkComponentManufacturerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  satelliteNetworks: SatelliteNetwork[];
}

const SatelliteNetworkComponentManufacturerDrawer = (props: SatelliteNetworkComponentManufacturerDrawerType) => {
  const { open, toggle, refetch, satelliteNetworkComponentManufacturer, projectId, otherSubMenu, satelliteNetworks } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    satellite_network_id: yup.string().required('Satellite network is required'),
    satellite: yup.string().nullable(),
    ground_stations: yup.string().nullable(),
    modems: yup.string().nullable(),
    routers: yup.string().nullable(),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(satelliteNetworkComponentManufacturer?.id);

  const createSatelliteNetworkComponentManufacturer = async (body: IApiPayload<SatelliteNetworkComponentManufacturer>) =>
    projectOtherApiSecondService<SatelliteNetworkComponentManufacturer>().create(otherSubMenu?.apiRoute || '', body);

  const editSatelliteNetworkComponentManufacturer = async (body: IApiPayload<SatelliteNetworkComponentManufacturer>) =>
    projectOtherApiSecondService<SatelliteNetworkComponentManufacturer>().update(
      otherSubMenu?.apiRoute || '',
      satelliteNetworkComponentManufacturer?.id || '',
      body
    );

  const getPayload = (values: SatelliteNetworkComponentManufacturer) => ({
    data: {
      project_id: projectId,
      satellite_network_id: values.satellite_network_id,
      satellite: values.satellite,
      ground_stations: values.ground_stations,
      modems: values.modems,
      routers: values.routers,
      others: values.others,
      id: satelliteNetworkComponentManufacturer?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<SatelliteNetworkComponentManufacturer>,
    payload: IApiPayload<SatelliteNetworkComponentManufacturer>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.satelliteNetworkComponentManufacturer,
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
      title={`project.other.satellite-network-component-manufacturer.${
        isEdit ? `edit-satellite-network-component-manufacturer` : `create-satellite-network-component-manufacturer`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.satellite-network-component-manufacturer.${
            isEdit ? `edit-satellite-network-component-manufacturer` : `create-satellite-network-component-manufacturer`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...satelliteNetworkComponentManufacturer
          }}
          createActionFunc={isEdit ? editSatelliteNetworkComponentManufacturer : createSatelliteNetworkComponentManufacturer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SatelliteNetworkComponentManufacturer>) => {
            return (
              <SatelliteNetworkComponentManufacturerForm
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

export default SatelliteNetworkComponentManufacturerDrawer;
