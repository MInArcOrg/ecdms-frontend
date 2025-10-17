'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MiniGridStationBackupPowerSourceForm from './mini-grid-station-backup-power-source-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { MiniGridStationBackupPowerSource, MiniGridStation } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface MiniGridStationBackupPowerSourceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  miniGridStationBackupPowerSource: MiniGridStationBackupPowerSource;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  miniGridStations: MiniGridStation[];
}

const MiniGridStationBackupPowerSourceDrawer = (props: MiniGridStationBackupPowerSourceDrawerType) => {
  const { open, toggle, refetch, miniGridStationBackupPowerSource, projectId, otherSubMenu, miniGridStations } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    mini_grid_station_id: yup.string().required('Mini Grid Station is required'),
    name: yup.string().required('Name is required'),
    capacity: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    installation_year: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Must be an integer'),
    distribution_lines_total_length: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    lifetime: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Must be an integer'),
    commissioning_date: yup.string().nullable(),
    other: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(miniGridStationBackupPowerSource?.id);

  const createMiniGridStationBackupPowerSource = async (body: IApiPayload<MiniGridStationBackupPowerSource>) =>
    projectOtherApiSecondService<MiniGridStationBackupPowerSource>().create(otherSubMenu?.apiRoute || '', body);

  const editMiniGridStationBackupPowerSource = async (body: IApiPayload<MiniGridStationBackupPowerSource>) =>
    projectOtherApiSecondService<MiniGridStationBackupPowerSource>().update(
      otherSubMenu?.apiRoute || '',
      miniGridStationBackupPowerSource?.id || '',
      body
    );

  const getPayload = (values: MiniGridStationBackupPowerSource) => ({
    data: {
      project_id: projectId,
      mini_grid_station_id: values.mini_grid_station_id,
      name: values.name,
      capacity: values.capacity,
      installation_year: values.installation_year,
      distribution_lines_total_length: values.distribution_lines_total_length,
      lifetime: values.lifetime,
      commissioning_date: values.commissioning_date,
      other: values.other,
      remark: values.remark,
      id: miniGridStationBackupPowerSource?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<MiniGridStationBackupPowerSource>,
    payload: IApiPayload<MiniGridStationBackupPowerSource>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.mini_grid_station_backup_power_source,
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
      title={`project.other.mini-grid-station-backup-power-source.${
        isEdit ? `edit-mini-grid-station-backup-power-source` : `create-mini-grid-station-backup-power-source`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mini-grid-station-backup-power-source.${
            isEdit ? `edit-mini-grid-station-backup-power-source` : `create-mini-grid-station-backup-power-source`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...miniGridStationBackupPowerSource
          }}
          createActionFunc={isEdit ? editMiniGridStationBackupPowerSource : createMiniGridStationBackupPowerSource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MiniGridStationBackupPowerSource>) => {
            return (
              <MiniGridStationBackupPowerSourceForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                miniGridStations={miniGridStations}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MiniGridStationBackupPowerSourceDrawer;
