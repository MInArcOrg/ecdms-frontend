// src/views/project/other/railway-maintenance-workforce-and-facility-staff/railway-maintenance-workforce-and-facility-staff-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayMaintenanceWorkforceAndFacilityStaff } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayMaintenanceWorkforceAndFacilityStaffForm from './railway-maintenance-workforce-and-facility-staff-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceWorkforceAndFacilityStaffDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayMaintenanceWorkforceAndFacilityStaff: RailwayMaintenanceWorkforceAndFacilityStaff;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayMaintenanceWorkforceAndFacilityStaffDrawer = ({
  open,
  toggle,
  refetch,
  railwayMaintenanceWorkforceAndFacilityStaff: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayMaintenanceWorkforceAndFacilityStaffDrawerProps) => {
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
    maintenance_personnel_number: yup
      .number()
      .required('Personnel number is required')
      .min(0, 'Must be a non-negative number')
      .nullable(),
    staff_facilities: yup.boolean().required('Staff facilities availability is required'),
    training_facilities_and_resources: yup.boolean().required('Training resources availability is required'),
    trainers_instructors_number: yup
      .number()
      .min(0, 'Must be a non-negative number')
      .nullable(),
    remark: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayMaintenanceWorkforceAndFacilityStaff>) =>
    projectOtherApiSecondService<RailwayMaintenanceWorkforceAndFacilityStaff>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayMaintenanceWorkforceAndFacilityStaff>) =>
    projectOtherApiSecondService<RailwayMaintenanceWorkforceAndFacilityStaff>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayMaintenanceWorkforceAndFacilityStaff
  ): IApiPayload<RailwayMaintenanceWorkforceAndFacilityStaff> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        maintenance_personnel_number: values.maintenance_personnel_number || null,
        trainers_instructors_number: values.trainers_instructors_number || null,
        staff_facilities: !!values.staff_facilities,
        training_facilities_and_resources: !!values.training_facilities_and_resources,
        remark: values.remark || null,
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayMaintenanceWorkforceAndFacilityStaff>) => {
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
      title={`project.other.railway-maintenance-workforce-and-facility-staff.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-maintenance-workforce-and-facility-staff.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayMaintenanceWorkforceAndFacilityStaff>) => (
            <RailwayMaintenanceWorkforceAndFacilityStaffForm
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

export default RailwayMaintenanceWorkforceAndFacilityStaffDrawer;