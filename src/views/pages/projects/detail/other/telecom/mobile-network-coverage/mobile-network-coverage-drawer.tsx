'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MobileNetworkCoverageForm from './mobile-network-coverage-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { MobileNetwork, MobileNetworkCoverage } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface MobileNetworkCoverageDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  mobileNetworkCoverage: MobileNetworkCoverage;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  mobileNetworks: MobileNetwork[];
}

const MobileNetworkCoverageDrawer = (props: MobileNetworkCoverageDrawerType) => {
  const { open, toggle, refetch, mobileNetworkCoverage, projectId, otherSubMenu, mobileNetworks } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    network_infrastructure_type_id: yup.string().required('Network infrastructure type is required'),
    mobile_network_id: yup.string().required(),
    total_coverage_area: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    coverage_population_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    active_users_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    average_download_speed: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    average_upload_speed: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    signal_strength: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(mobileNetworkCoverage?.id);

  const createMobileNetworkCoverage = async (body: IApiPayload<MobileNetworkCoverage>) =>
    projectOtherApiSecondService<MobileNetworkCoverage>().create(otherSubMenu?.apiRoute || '', body);

  const editMobileNetworkCoverage = async (body: IApiPayload<MobileNetworkCoverage>) =>
    projectOtherApiSecondService<MobileNetworkCoverage>().update(otherSubMenu?.apiRoute || '', mobileNetworkCoverage?.id || '', body);

  const getPayload = (values: MobileNetworkCoverage) => ({
    data: {
      project_id: projectId,
      mobile_network_id: values.mobile_network_id,
      network_infrastructure_type_id: values.network_infrastructure_type_id,
      total_coverage_area: values.total_coverage_area,
      coverage_population_number: values.coverage_population_number,
      active_users_number: values.active_users_number,
      average_download_speed: values.average_download_speed,
      average_upload_speed: values.average_upload_speed,
      signal_strength: values.signal_strength,
      others: values.others,
      id: mobileNetworkCoverage?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<MobileNetworkCoverage>, payload: IApiPayload<MobileNetworkCoverage>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.networkCoverage, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.network-coverage.${isEdit ? `edit-network-coverage` : `create-network-coverage`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          key={mobileNetworkCoverage?.id || 'new'}
          edit={isEdit}
          title={`project.other.network-coverage.${isEdit ? `edit-network-coverage` : `create-network-coverage`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...mobileNetworkCoverage
          }}
          createActionFunc={isEdit ? editMobileNetworkCoverage : createMobileNetworkCoverage}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MobileNetworkCoverage>) => {
            return (
              <MobileNetworkCoverageForm
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

export default MobileNetworkCoverageDrawer;
