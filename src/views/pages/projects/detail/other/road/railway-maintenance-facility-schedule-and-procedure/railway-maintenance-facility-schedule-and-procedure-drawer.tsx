// src/views/project/other/railway-maintenance-facility-schedule-and-procedure/railway-maintenance-facility-schedule-and-procedure-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayMaintenanceFacilityScheduleAndProcedure } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayMaintenanceFacilityScheduleAndProcedureForm from './railway-maintenance-facility-schedule-and-procedure-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceFacilityScheduleAndProcedureDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayMaintenanceFacilityScheduleAndProcedure: RailwayMaintenanceFacilityScheduleAndProcedure;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayMaintenanceFacilityScheduleAndProcedureDrawer = ({
  open,
  toggle,
  refetch,
  railwayMaintenanceFacilityScheduleAndProcedure: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayMaintenanceFacilityScheduleAndProcedureDrawerProps) => {
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
    facility_name: yup
      .string()
      .required('Facility Name is required'),
    maintenance_schedules_and_routines_availability: yup.boolean().required('Availability is required'),
    procedures_for_planned_and_preventive_maintenance_availability: yup.boolean().required('Availability is required'),
    documentation_and_record_keeping_practices_availability: yup.boolean().required('Availability is required'),
    remark: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayMaintenanceFacilityScheduleAndProcedure>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityScheduleAndProcedure>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayMaintenanceFacilityScheduleAndProcedure>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityScheduleAndProcedure>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayMaintenanceFacilityScheduleAndProcedure
  ): IApiPayload<RailwayMaintenanceFacilityScheduleAndProcedure> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        maintenance_schedules_and_routines_availability: !!values.maintenance_schedules_and_routines_availability,
        procedures_for_planned_and_preventive_maintenance_availability: !!values.procedures_for_planned_and_preventive_maintenance_availability,
        documentation_and_record_keeping_practices_availability: !!values.documentation_and_record_keeping_practices_availability,
        remark: values.remark || null,
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayMaintenanceFacilityScheduleAndProcedure>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      // Dynamic Upload Loop
      for (const config of fileTypesConfig) {
        const file = fileStates[config.key];

        if (file) {

          await uploadFile(
            file,
            config.type,
            recordId,
            `${'fileName'}_document`,
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
      title={`project.other.railway-maintenance-facility-schedule-and-procedure.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-maintenance-facility-schedule-and-procedure.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayMaintenanceFacilityScheduleAndProcedure>) => (
            <RailwayMaintenanceFacilityScheduleAndProcedureForm
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

export default RailwayMaintenanceFacilityScheduleAndProcedureDrawer;