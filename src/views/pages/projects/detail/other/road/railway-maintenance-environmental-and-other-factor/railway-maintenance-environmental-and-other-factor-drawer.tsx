// src/views/project/other/railway-maintenance-environmental-and-other-factor/railway-maintenance-environmental-and-other-factor-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayMaintenanceEnvironmentalAndOtherFactor } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayMaintenanceEnvironmentalAndOtherFactorForm from './railway-maintenance-environmental-and-other-factor-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceEnvironmentalAndOtherFactorDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayMaintenanceEnvironmentalAndOtherFactor: RailwayMaintenanceEnvironmentalAndOtherFactor;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayMaintenanceEnvironmentalAndOtherFactorDrawer = ({
  open,
  toggle,
  refetch,
  railwayMaintenanceEnvironmentalAndOtherFactor: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayMaintenanceEnvironmentalAndOtherFactorDrawerProps) => {
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
    environmental_compliance_measures: yup
      .string()
      .required('Environmental Compliance Measures are required'),
    noise_reduction_measures: yup
      .string()
      .required('Noise Reduction Measures are required'),
    sustainable_design_features: yup
      .string()
      .required('Sustainable Design Features are required'),
    remark: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayMaintenanceEnvironmentalAndOtherFactor>) =>
    projectOtherApiSecondService<RailwayMaintenanceEnvironmentalAndOtherFactor>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayMaintenanceEnvironmentalAndOtherFactor>) =>
    projectOtherApiSecondService<RailwayMaintenanceEnvironmentalAndOtherFactor>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayMaintenanceEnvironmentalAndOtherFactor
  ): IApiPayload<RailwayMaintenanceEnvironmentalAndOtherFactor> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        remark: values.remark || null,
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayMaintenanceEnvironmentalAndOtherFactor>) => {
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
      title={`project.other.railway-maintenance-environmental-and-other-factor.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-maintenance-environmental-and-other-factor.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayMaintenanceEnvironmentalAndOtherFactor>) => (
            <RailwayMaintenanceEnvironmentalAndOtherFactorForm
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

export default RailwayMaintenanceEnvironmentalAndOtherFactorDrawer;