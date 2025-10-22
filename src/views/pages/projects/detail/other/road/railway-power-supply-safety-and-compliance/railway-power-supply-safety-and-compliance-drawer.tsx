// src/views/project/other/railway-power-supply-safety-and-compliance/railway-power-supply-safety-and-compliance-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSupplySafetyAndCompliance } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayPowerSupplySafetyAndComplianceForm from './railway-power-supply-safety-and-compliance-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayPowerSupplySafetyAndComplianceDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayPowerSupplySafetyAndCompliance: RailwayPowerSupplySafetyAndCompliance;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayPowerSupplySafetyAndComplianceDrawer = ({
  open,
  toggle,
  refetch,
  railwayPowerSupplySafetyAndCompliance: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayPowerSupplySafetyAndComplianceDrawerProps) => {
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
    safety_measures_and_protocols: yup.boolean().required('Safety measure status is required'),
    compliance_with_electrical_safety_standards_and_regulations: yup.boolean().required('Compliance status is required'),
    remark: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayPowerSupplySafetyAndCompliance>) =>
    projectOtherApiSecondService<RailwayPowerSupplySafetyAndCompliance>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayPowerSupplySafetyAndCompliance>) =>
    projectOtherApiSecondService<RailwayPowerSupplySafetyAndCompliance>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayPowerSupplySafetyAndCompliance
  ): IApiPayload<RailwayPowerSupplySafetyAndCompliance> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        // Ensure boolean fields are explicitly coerced if necessary, though Formik usually handles this well
        safety_measures_and_protocols: !!values.safety_measures_and_protocols,
        compliance_with_electrical_safety_standards_and_regulations: !!values.compliance_with_electrical_safety_standards_and_regulations
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
      title={`project.other.railway-power-supply-safety-and-compliance.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-power-supply-safety-and-compliance.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayPowerSupplySafetyAndCompliance>) => (
            <RailwayPowerSupplySafetyAndComplianceForm
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

export default RailwayPowerSupplySafetyAndComplianceDrawer;