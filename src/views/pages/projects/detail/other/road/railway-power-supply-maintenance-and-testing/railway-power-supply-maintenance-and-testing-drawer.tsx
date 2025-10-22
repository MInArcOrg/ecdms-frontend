// src/views/project/other/railway-power-supply-maintenance-and-testing/railway-power-supply-maintenance-and-testing-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSupplyMaintenanceAndTesting } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayPowerSupplyMaintenanceAndTestingForm from './railway-power-supply-maintenance-and-testing-form';
import type { FileTypeConfig } from './file-type-config';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface RailwayPowerSupplyMaintenanceAndTestingDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayPowerSupplyMaintenanceAndTesting: RailwayPowerSupplyMaintenanceAndTesting;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayPowerSupplyMaintenanceAndTestingDrawer = ({
  open,
  toggle,
  refetch,
  railwayPowerSupplyMaintenanceAndTesting: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayPowerSupplyMaintenanceAndTestingDrawerProps) => {
  const isEdit = Boolean(data?.id);

  // Dynamic state initialization for all files
  const initialFileStates = fileTypesConfig.reduce((acc, config) => {
    acc[config.key] = null;
    return acc;
  }, {} as Record<string, File | null>);

  const [fileStates, setFileStates] = useState<Record<string, File | null>>(initialFileStates);

  const handleFileChange = (key: string, file: File | null) => {
    setFileStates(prev => ({ ...prev, [key]: file }));
  };

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required('Platform Layout ID is required'),
    maintenance_schedules_and_activities: yup.boolean().nullable(),
    testing_and_commissioning_procedures: yup.boolean().nullable(),
    recent_maintenance_records_date: yup.date().nullable(),
    remark: yup.string().nullable()
  });

  const createRecord = async (body: IApiPayload<RailwayPowerSupplyMaintenanceAndTesting>) =>
    projectOtherApiSecondService<RailwayPowerSupplyMaintenanceAndTesting>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayPowerSupplyMaintenanceAndTesting>) =>
    projectOtherApiSecondService<RailwayPowerSupplyMaintenanceAndTesting>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayPowerSupplyMaintenanceAndTesting
  ): IApiPayload<RailwayPowerSupplyMaintenanceAndTesting> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        recent_maintenance_records_date: convertDateToLocaleDate(values.recent_maintenance_records_date)
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayPowerSupplyMaintenanceAndTesting>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      // Dynamic Upload Loop
      for (const config of fileTypesConfig) {
        const file = fileStates[config.key];

        if (file) {
          const fileName = config.key.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);

          await uploadFile(
            file,
            config.type,
            recordId,
            `${fileName}_document`,
            ''
          );
        }
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-power-supply-maintenance-and-testing.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-power-supply-maintenance-and-testing.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
            recent_maintenance_records_date: formatInitialDateDate(data.recent_maintenance_records_date)
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayPowerSupplyMaintenanceAndTesting>) => (
            <RailwayPowerSupplyMaintenanceAndTestingForm
              formik={formik}
              fileTypesConfig={fileTypesConfig}
              fileStates={fileStates}
              onFileChange={handleFileChange}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayPowerSupplyMaintenanceAndTestingDrawer;