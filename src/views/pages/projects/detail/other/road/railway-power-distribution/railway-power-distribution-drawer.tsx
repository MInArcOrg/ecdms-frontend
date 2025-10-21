// src/views/project/other/railway-power-distribution/railway-power-distribution-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerDistribution } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayPowerDistributionForm from './railway-power-distribution-form';
import type { FileTypeConfig } from './filet-type-config';

interface RailwayPowerDistributionDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayPowerDistribution: RailwayPowerDistribution;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[]; // Receives the array of 4 file configs
}

const RailwayPowerDistributionDrawer = ({
  open,
  toggle,
  refetch,
  railwayPowerDistribution,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayPowerDistributionDrawerProps) => {
  const isEdit = Boolean(railwayPowerDistribution?.id);

  // Dynamic state initialization for all files: { mainDocument: null, networkLayout: null, ... }
  const initialFileStates = fileTypesConfig.reduce((acc, config) => {
    acc[config.key] = null;
    return acc;
  }, {} as Record<string, File | null>);

  const [fileStates, setFileStates] = useState<Record<string, File | null>>(initialFileStates);

  const handleFileChange = (key: string, file: File | null) => {
    // Generic handler to update state for any of the four files
    setFileStates(prev => ({ ...prev, [key]: file }));
  };

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required('Platform Layout ID is required'),
    remark: yup.string().nullable()
  });

  const createRecord = async (body: IApiPayload<RailwayPowerDistribution>) =>
    projectOtherApiSecondService<RailwayPowerDistribution>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayPowerDistribution>) =>
    projectOtherApiSecondService<RailwayPowerDistribution>().update(
      otherSubMenu?.apiRoute || '',
      railwayPowerDistribution.id as string,
      body
    );

  const getPayload = (
    values: RailwayPowerDistribution
  ): IApiPayload<RailwayPowerDistribution> => {
    return {
      data: {
        ...values,
        project_id: projectId
      },
      files: []
    };
  };


  const handleClose = () => {
    // Reset all file states on close
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayPowerDistribution>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      // Dynamic Upload Loop: Iterates over the 4 file types
      for (const config of fileTypesConfig) {
        const file = fileStates[config.key];

        if (file) {
          // Converts camelCase key to snake_case for the API file name (e.g., 'networkLayout' -> 'network_layout')
          const fileName = config.key.replace(/([A-Z])/g, (g) => `_${g[0].toLowerCase()}`);

          await uploadFile(
            file,
            config.type, // The specific file type constant (e.g., 'DISTRIBUTION_NETWORK_LAYOUT_CONFIGURATION')
            recordId,
            `${fileName}_document`, // e.g., 'network_layout_document'
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
      title={`project.other.railway-power-distribution.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-power-distribution.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayPowerDistribution}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayPowerDistribution>) => (
            <RailwayPowerDistributionForm
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

export default RailwayPowerDistributionDrawer;