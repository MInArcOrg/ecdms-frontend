// src/views/project/other/railway-maintenance-facility-infrastructure-and-utility/railway-maintenance-facility-infrastructure-and-utility-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayMaintenanceFacilityInfrastructureAndUtility } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayMaintenanceFacilityInfrastructureAndUtilityForm from './railway-maintenance-facility-infrastructure-and-utility-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceFacilityInfrastructureAndUtilityDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayMaintenanceFacilityInfrastructureAndUtility: RailwayMaintenanceFacilityInfrastructureAndUtility;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayMaintenanceFacilityInfrastructureAndUtilityDrawer = ({
  open,
  toggle,
  refetch,
  railwayMaintenanceFacilityInfrastructureAndUtility: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayMaintenanceFacilityInfrastructureAndUtilityDrawerProps) => {
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
    rail_tracks_and_turnout_availability: yup.boolean().required('Rail tracks availability is required'),
    fueling_and_refueling_facility_availability: yup.boolean().required('Fueling facility availability is required'),
    compressed_air_system_availability: yup.boolean().required('Compressed air system availability is required'),
    remarks: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayMaintenanceFacilityInfrastructureAndUtility>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityInfrastructureAndUtility>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayMaintenanceFacilityInfrastructureAndUtility>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityInfrastructureAndUtility>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayMaintenanceFacilityInfrastructureAndUtility
  ): IApiPayload<RailwayMaintenanceFacilityInfrastructureAndUtility> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        rail_tracks_and_turnout_availability: !!values.rail_tracks_and_turnout_availability,
        fueling_and_refueling_facility_availability: !!values.fueling_and_refueling_facility_availability,
        compressed_air_system_availability: !!values.compressed_air_system_availability,
        remarks: values.remarks || null,
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayMaintenanceFacilityInfrastructureAndUtility>) => {
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
      title={`project.other.railway-maintenance-facility-infrastructure-and-utilities.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-maintenance-facility-infrastructure-and-utilities.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayMaintenanceFacilityInfrastructureAndUtility>) => (
            <RailwayMaintenanceFacilityInfrastructureAndUtilityForm
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

export default RailwayMaintenanceFacilityInfrastructureAndUtilityDrawer;