// src/views/project/other/railway-power-supply-safety-and-compliance/railway-power-supply-safety-and-compliance-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { RailwayPowerSupplySafetyAndCompliance } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils'; // Assuming this utility exists
import RailwayPowerSupplySafetyAndComplianceForm from './railway-power-supply-safety-and-compliance-form';
import { RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES } from './file-type-config';
import { useTranslation } from 'react-i18next';
import { FileTypeConfig } from '../railway-power-distribution/filet-type-config';

interface RailwayPowerSupplySafetyAndComplianceDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  safetyAndCompliance: RailwayPowerSupplySafetyAndCompliance;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  // fileTypesConfig will now use the specific ComplianceFileTypeConfig from our updated file-type-config.ts
  fileTypesConfig: FileTypeConfig[];
}

const RailwayPowerSupplySafetyAndComplianceDrawer = ({
  open,
  toggle,
  refetch,
  safetyAndCompliance: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayPowerSupplySafetyAndComplianceDrawerProps) => {
  const { t } = useTranslation();
  const isEdit = Boolean(data?.id);
  const apiRoute = otherSubMenu?.apiRoute || '/projects/railway-power-supply-safety-and-compliances';

  // Dynamic state initialization for all files
  const initialFileStates = fileTypesConfig.reduce((acc, config) => {
    // config.key is used here
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
      .required(t('common.validation.required')),
    safety_measures_and_protocols: yup.boolean().nullable(),
    compliance_with_electrical_safety_standards_and_regulations: yup.boolean().nullable(),
    remark: yup.string().nullable()
  });

  const createRecord = async (body: IApiPayload<RailwayPowerSupplySafetyAndCompliance>) =>
    projectOtherApiSecondService<RailwayPowerSupplySafetyAndCompliance>().create(apiRoute, body);

  const editRecord = async (body: IApiPayload<RailwayPowerSupplySafetyAndCompliance>) =>
    projectOtherApiSecondService<RailwayPowerSupplySafetyAndCompliance>().update(
      apiRoute,
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayPowerSupplySafetyAndCompliance
  ): IApiPayload<RailwayPowerSupplySafetyAndCompliance> => {
    // Only the fields from the schema are included in the data payload
    return {
      data: {
        id: values.id,
        project_id: projectId,
        railway_station_platform_layout_id: values.railway_station_platform_layout_id,
        safety_measures_and_protocols: values.safety_measures_and_protocols,
        compliance_with_electrical_safety_standards_and_regulations: values.compliance_with_electrical_safety_standards_and_regulations,
        remark: values.remark
      },
      files: []
    };
  };

  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayPowerSupplySafetyAndCompliance>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      // Dynamic Upload Loop
      for (const config of fileTypesConfig) {
        const file = fileStates[config.key];

        if (file) {
          // Sanitizing key for use in filename (e.g., 'safetyProtocolsFile' -> 'safety_protocols_file')

          await uploadFile(
            file,
            config.type,
            recordId,
            ``,
            '' // No description required here
          );
        }
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
      // NOTE: You might want to handle this error state in the UI
    }
  };

  return (
    <CustomSideDrawer
      title={t(`project.other.railway-power-supply-safety-and-compliance.${isEdit ? 'edit' : 'create'}`)}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={t(`project.other.railway-power-supply-safety-and-compliance.${isEdit ? 'edit' : 'create'}`)}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            // Ensure all fields expected by the schema are present
            ...data
          } as RailwayPowerSupplySafetyAndCompliance}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayPowerSupplySafetyAndCompliance>) => (
            <RailwayPowerSupplySafetyAndComplianceForm
              formik={formik}
              fileTypesConfig={RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES}
              fileStates={fileStates}
              onFileChange={handleFileChange}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayPowerSupplySafetyAndComplianceDrawer;