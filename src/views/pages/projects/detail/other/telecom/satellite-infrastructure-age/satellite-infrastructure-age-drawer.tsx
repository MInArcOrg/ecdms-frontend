'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SatelliteInfrastructureAgeForm from './satellite-infrastructure-age-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { SatelliteInfrastructureAge, SatelliteNetwork } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface SatelliteInfrastructureAgeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  satelliteInfrastructureAge: SatelliteInfrastructureAge;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  satelliteNetworks: SatelliteNetwork[];
}

const SatelliteInfrastructureAgeDrawer = (props: SatelliteInfrastructureAgeDrawerType) => {
  const { open, toggle, refetch, satelliteInfrastructureAge, projectId, otherSubMenu, satelliteNetworks } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    satellite_network_id: yup.string().required('Satellite network is required'),
    satellite: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    ground_stations: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    modems: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    routers: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(satelliteInfrastructureAge?.id);

  const createSatelliteInfrastructureAge = async (body: IApiPayload<SatelliteInfrastructureAge>) =>
    projectOtherApiSecondService<SatelliteInfrastructureAge>().create(otherSubMenu?.apiRoute || '', body);

  const editSatelliteInfrastructureAge = async (body: IApiPayload<SatelliteInfrastructureAge>) =>
    projectOtherApiSecondService<SatelliteInfrastructureAge>().update(
      otherSubMenu?.apiRoute || '',
      satelliteInfrastructureAge?.id || '',
      body
    );

  const getPayload = (values: SatelliteInfrastructureAge) => ({
    data: {
      project_id: projectId,
      satellite_network_id: values.satellite_network_id,
      satellite: values.satellite,
      ground_stations: values.ground_stations,
      modems: values.modems,
      routers: values.routers,
      others: values.others,
      id: satelliteInfrastructureAge?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<SatelliteInfrastructureAge>, payload: IApiPayload<SatelliteInfrastructureAge>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.satelliteInfrastructureAge, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.satellite-infrastructure-age.${isEdit ? `edit-satellite-infrastructure-age` : `create-satellite-infrastructure-age`
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.satellite-infrastructure-age.${isEdit ? `edit-satellite-infrastructure-age` : `create-satellite-infrastructure-age`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...satelliteInfrastructureAge
          }}
          createActionFunc={isEdit ? editSatelliteInfrastructureAge : createSatelliteInfrastructureAge}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SatelliteInfrastructureAge>) => {
            return (
              <SatelliteInfrastructureAgeForm
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

export default SatelliteInfrastructureAgeDrawer;
