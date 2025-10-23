// src/views/project/other/railway-maintenance-facility-and-security/railway-maintenance-facility-and-security-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayMaintenanceFacilityAndSecurity } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayMaintenanceFacilityAndSecurityForm from './railway-maintenance-facility-and-security-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceFacilityAndSecurityDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayMaintenanceFacilityAndSecurity: RailwayMaintenanceFacilityAndSecurity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayMaintenanceFacilityAndSecurityDrawer = ({
  open,
  toggle,
  refetch,
  railwayMaintenanceFacilityAndSecurity: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayMaintenanceFacilityAndSecurityDrawerProps) => {
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
    fire_safety_measures: yup
      .string()
      .required('Fire Safety Measures are required'),
    ventilation_and_exhaust_system_availability: yup.boolean().required('Availability is required'),
    security_measures: yup
      .string()
      .required('Security Measures are required'),
    remark: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayMaintenanceFacilityAndSecurity>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityAndSecurity>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayMaintenanceFacilityAndSecurity>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityAndSecurity>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayMaintenanceFacilityAndSecurity
  ): IApiPayload<RailwayMaintenanceFacilityAndSecurity> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        ventilation_and_exhaust_system_availability: !!values.ventilation_and_exhaust_system_availability,
        remark: values.remark || null,
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayMaintenanceFacilityAndSecurity>) => {
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
      title={`project.other.railway-maintenance-facility-and-security.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-maintenance-facility-and-security.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayMaintenanceFacilityAndSecurity>) => (
            <RailwayMaintenanceFacilityAndSecurityForm
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

export default RailwayMaintenanceFacilityAndSecurityDrawer;