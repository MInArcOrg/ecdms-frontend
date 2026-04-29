'use client';

import type { FormikProps } from 'formik';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { SatelliteNetwork, SatelliteNetworkCoverage } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SatelliteNetworkCoverageForm from './satellite-network-coverage-form';

interface SatelliteNetworkCoverageDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  satelliteNetworkCoverage: SatelliteNetworkCoverage;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  satelliteNetworks: SatelliteNetwork[];
}

const SatelliteNetworkCoverageDrawer = ({
  open,
  toggle,
  refetch,
  satelliteNetworkCoverage,
  projectId,
  otherSubMenu,
  satelliteNetworks
}: SatelliteNetworkCoverageDrawerProps) => {
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    satellite_network_id: yup.string().required('Satellite network is required'),
    network_infrastructure_type_id: yup.string().required('Network infrastructure type is required'),
    total_coverage_area: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
    coverage_population_no: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    active_users_no: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    average_download_speed: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
    average_upload_speed: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
    signal_strength: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(satelliteNetworkCoverage?.id);

  const createSatelliteNetworkCoverage = async (body: IApiPayload<SatelliteNetworkCoverage>) =>
    projectOtherApiSecondService<SatelliteNetworkCoverage>().create(otherSubMenu?.apiRoute || '', body);

  const editSatelliteNetworkCoverage = async (body: IApiPayload<SatelliteNetworkCoverage>) =>
    projectOtherApiSecondService<SatelliteNetworkCoverage>().update(otherSubMenu?.apiRoute || '', satelliteNetworkCoverage?.id || '', body);

  const getPayload = (values: SatelliteNetworkCoverage) => ({
    data: {
      project_id: projectId,
      satellite_network_id: values.satellite_network_id,
      network_infrastructure_type_id: values.network_infrastructure_type_id,
      total_coverage_area: values.total_coverage_area,
      coverage_population_no: values.coverage_population_no,
      active_users_no: values.active_users_no,
      average_download_speed: values.average_download_speed,
      average_upload_speed: values.average_upload_speed,
      signal_strength: values.signal_strength,
      others: values.others,
      id: satelliteNetworkCoverage?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<SatelliteNetworkCoverage>,
    payload: IApiPayload<SatelliteNetworkCoverage>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.satelliteNetworkCoverage, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.satellite-network-coverage.${isEdit ? `edit-satellite-network-coverage` : `create-satellite-network-coverage`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          key={satelliteNetworkCoverage?.id || 'new'}
          edit={isEdit}
          title={`project.other.satellite-network-coverage.${isEdit ? `edit-satellite-network-coverage` : `create-satellite-network-coverage`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...satelliteNetworkCoverage
          }}
          createActionFunc={isEdit ? editSatelliteNetworkCoverage : createSatelliteNetworkCoverage}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SatelliteNetworkCoverage>) => {
            return (
              <SatelliteNetworkCoverageForm
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

export default SatelliteNetworkCoverageDrawer;
