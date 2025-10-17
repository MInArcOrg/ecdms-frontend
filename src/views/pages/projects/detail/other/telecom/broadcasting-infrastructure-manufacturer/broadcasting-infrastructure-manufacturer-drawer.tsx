'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BroadcastingInfrastructureManufacturerForm from './broadcasting-infrastructure-manufacturer-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { BroadcastingInfrastructureManufacturer, BroadcastingInfrastructure } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface BroadcastingInfrastructureManufacturerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  broadcastingInfrastructures: BroadcastingInfrastructure[];
}

const BroadcastingInfrastructureManufacturerDrawer = (props: BroadcastingInfrastructureManufacturerDrawerType) => {
  const { open, toggle, refetch, broadcastingInfrastructureManufacturer, projectId, otherSubMenu, broadcastingInfrastructures } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().nullable(),
    broadcasting_infrastructure_id: yup.string().required('Broadcasting Infrastructure is required'),
    name: yup.string().required('Name is required').max(100, 'Name cannot exceed 100 characters'),
    antennas: yup.string().nullable().max(100, 'Antennas cannot exceed 100 characters'),
    transmitters: yup.string().nullable().max(100, 'Transmitters cannot exceed 100 characters'),
    towers: yup.string().nullable().max(100, 'Towers cannot exceed 100 characters'),
    cables: yup.string().nullable().max(100, 'Cables cannot exceed 100 characters'),
    others: yup.string().nullable().max(100, 'Others cannot exceed 100 characters')
  });

  const isEdit = Boolean(broadcastingInfrastructureManufacturer?.id);

  const createBroadcastingInfrastructureManufacturer = async (body: IApiPayload<BroadcastingInfrastructureManufacturer>) =>
    projectOtherApiSecondService<BroadcastingInfrastructureManufacturer>().create(otherSubMenu?.apiRoute || '', body);

  const editBroadcastingInfrastructureManufacturer = async (body: IApiPayload<BroadcastingInfrastructureManufacturer>) =>
    projectOtherApiSecondService<BroadcastingInfrastructureManufacturer>().update(
      otherSubMenu?.apiRoute || '',
      broadcastingInfrastructureManufacturer?.id || '',
      body
    );

  const getPayload = (values: BroadcastingInfrastructureManufacturer) => ({
    data: {
      project_id: projectId,
      broadcasting_infrastructure_id: values.broadcasting_infrastructure_id,
      name: values.name,
      antennas: values.antennas,
      transmitters: values.transmitters,
      towers: values.towers,
      cables: values.cables,
      others: values.others,
      id: broadcastingInfrastructureManufacturer?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<BroadcastingInfrastructureManufacturer>,
    payload: IApiPayload<BroadcastingInfrastructureManufacturer>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.broadcastingInfrastructureManufacturer,
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
      title={`project.other.broadcasting-infrastructure-manufacturer.${
        isEdit ? `edit-broadcasting-infrastructure-manufacturer` : `create-broadcasting-infrastructure-manufacturer`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.broadcasting-infrastructure-manufacturer.${
            isEdit ? `edit-broadcasting-infrastructure-manufacturer` : `create-broadcasting-infrastructure-manufacturer`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...broadcastingInfrastructureManufacturer
          }}
          createActionFunc={isEdit ? editBroadcastingInfrastructureManufacturer : createBroadcastingInfrastructureManufacturer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BroadcastingInfrastructureManufacturer>) => {
            return (
              <BroadcastingInfrastructureManufacturerForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                broadcastingInfrastructures={broadcastingInfrastructures}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BroadcastingInfrastructureManufacturerDrawer;
