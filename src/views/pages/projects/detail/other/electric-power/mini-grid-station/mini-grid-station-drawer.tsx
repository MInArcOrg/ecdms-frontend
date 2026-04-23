'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MiniGridStationForm from './mini-grid-station-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { MiniGridStation } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { limitNumberDigits } from 'src/utils/validator/number';

interface MiniGridStationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  miniGridStation: MiniGridStation;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  substations: any[];
}

const MiniGridStationDrawer = (props: MiniGridStationDrawerType) => {
  const { open, toggle, refetch, miniGridStation, projectId, otherSubMenu, substations } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    substation_id: yup.string().uuid().required('Substation is required'),
    name: yup.string().max(100).required('Name is required'),
    minigrid_size: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    battery_type_id: yup.string().uuid().nullable(),
    battery_size: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    inverter: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    system_voltage: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    expected_annual_generation: limitNumberDigits(
      yup
        .number()
        .nullable()
        .max(1000000, 'Must be less than or equal to 1000000')
        .transform((value) => (isNaN(value) ? null : value)),
      { maxIntegerDigits: 7, maxDecimalPlaces: 2 }
    ),
  });

  const isEdit = Boolean(miniGridStation?.id);

  const createMiniGridStation = async (body: IApiPayload<MiniGridStation>) =>
    projectOtherApiSecondService<MiniGridStation>().create(otherSubMenu?.apiRoute || '', body);

  const editMiniGridStation = async (body: IApiPayload<MiniGridStation>) =>
    projectOtherApiSecondService<MiniGridStation>().update(otherSubMenu?.apiRoute || '', miniGridStation?.id || '', body);

  const getPayload = (values: MiniGridStation) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<MiniGridStation>, payload: IApiPayload<MiniGridStation>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.mini_grid_station, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.mini-grid-station.${isEdit ? `edit-mini-grid-station` : `create-mini-grid-station`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mini-grid-station.${isEdit ? `edit-mini-grid-station` : `create-mini-grid-station`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...miniGridStation,
            diesel_generator: miniGridStation?.diesel_generator || 'Not Equipped'
          }}
          createActionFunc={isEdit ? editMiniGridStation : createMiniGridStation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MiniGridStation>) => {
            return <MiniGridStationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} substations={substations} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MiniGridStationDrawer;
