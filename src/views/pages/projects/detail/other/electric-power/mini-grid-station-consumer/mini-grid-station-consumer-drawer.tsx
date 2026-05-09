'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MiniGridStationConsumerForm from './mini-grid-station-consumer-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { MiniGridStationConsumer, MiniGridStation } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';

interface MiniGridStationConsumerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  miniGridStationConsumer: MiniGridStationConsumer;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  miniGridStations: MiniGridStation[];
}

const MiniGridStationConsumerDrawer = (props: MiniGridStationConsumerDrawerType) => {
  const { open, toggle, refetch, miniGridStationConsumer, projectId, otherSubMenu, miniGridStations } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const numberField = nullableNumberSchema();
  const integerField = nullableIntegerSchema();

  const validationSchema = yup.object().shape({
    mini_grid_station_id: yup.string().required('Mini Grid Station is required'),
    name: yup.string().required('Name is required'),
    residential: limitNumberDigits(integerField.min(0, 'Residential must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    commercial: limitNumberDigits(integerField.min(0, 'Commercial must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    productive_industrial: limitNumberDigits(integerField.min(0, 'Productive industrial must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    health_centers: limitNumberDigits(integerField.min(0, 'Health centers must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    schools: limitNumberDigits(integerField.min(0, 'Schools must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    street_lighting: limitNumberDigits(integerField.min(0, 'Street lighting must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    other: limitNumberDigits(integerField.min(0, 'Other must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    expected_electricity_sales: limitNumberDigits(numberField.min(0, 'Expected electricity sales must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    electricity_tariff: limitNumberDigits(numberField.min(0, 'Electricity tariff must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(miniGridStationConsumer?.id);

  const createMiniGridStationConsumer = async (body: IApiPayload<MiniGridStationConsumer>) =>
    projectOtherApiSecondService<MiniGridStationConsumer>().create(otherSubMenu?.apiRoute || '', body);

  const editMiniGridStationConsumer = async (body: IApiPayload<MiniGridStationConsumer>) =>
    projectOtherApiSecondService<MiniGridStationConsumer>().update(otherSubMenu?.apiRoute || '', miniGridStationConsumer?.id || '', body);

  const getPayload = (values: MiniGridStationConsumer) => ({
    data: {
      project_id: projectId,
      mini_grid_station_id: values.mini_grid_station_id,
      name: values.name,
      residential: values.residential,
      commercial: values.commercial,
      productive_industrial: values.productive_industrial,
      health_centers: values.health_centers,
      schools: values.schools,
      street_lighting: values.street_lighting,
      other: values.other,
      expected_electricity_sales: values.expected_electricity_sales,
      electricity_tariff: values.electricity_tariff,
      remark: values.remark,
      id: miniGridStationConsumer?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<MiniGridStationConsumer>, payload: IApiPayload<MiniGridStationConsumer>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.mini_grid_station_consumer, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.mini-grid-station-consumer.${isEdit ? `edit-mini-grid-station-consumer` : `create-mini-grid-station-consumer`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mini-grid-station-consumer.${
            isEdit ? `edit-mini-grid-station-consumer` : `create-mini-grid-station-consumer`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...miniGridStationConsumer
          }}
          createActionFunc={isEdit ? editMiniGridStationConsumer : createMiniGridStationConsumer}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MiniGridStationConsumer>) => {
            return (
              <MiniGridStationConsumerForm
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

export default MiniGridStationConsumerDrawer;
