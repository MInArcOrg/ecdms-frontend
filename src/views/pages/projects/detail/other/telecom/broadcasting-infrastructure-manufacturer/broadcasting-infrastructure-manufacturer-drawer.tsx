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
    broadcasting_infrastructure_id: yup.string().required('Broadcasting Infrastructure is required'),
    antennas: yup.string().nullable(),
    transmitters: yup.string().nullable(),
    towers: yup.string().nullable(),
    cables: yup.string().nullable(),
    others: yup.string().nullable()
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
      title={`project.other.broadcasting-infrastructure-manufacturer.${isEdit ? `edit-broadcasting-infrastructure-manufacturer` : `create-broadcasting-infrastructure-manufacturer`
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.broadcasting-infrastructure-manufacturer.${isEdit ? `edit-broadcasting-infrastructure-manufacturer` : `create-broadcasting-infrastructure-manufacturer`
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
