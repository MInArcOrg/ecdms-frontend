// src/views/project/other/railway-power-supply-environmental-and-other-factor/railway-power-supply-environmental-and-other-factor-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSupplyEnvironmentalAndOtherFactor } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayPowerSupplyEnvironmentalAndOtherFactorForm from './railway-power-supply-environmental-and-other-factor-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayPowerSupplyEnvironmentalAndOtherFactorDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayPowerSupplyEnvironmentalAndOtherFactor: RailwayPowerSupplyEnvironmentalAndOtherFactor;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayPowerSupplyEnvironmentalAndOtherFactorDrawer = ({
  open,
  toggle,
  refetch,
  railwayPowerSupplyEnvironmentalAndOtherFactor: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayPowerSupplyEnvironmentalAndOtherFactorDrawerProps) => {
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
    environmental_compliance_measures: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayPowerSupplyEnvironmentalAndOtherFactor>) =>
    projectOtherApiSecondService<RailwayPowerSupplyEnvironmentalAndOtherFactor>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayPowerSupplyEnvironmentalAndOtherFactor>) =>
    projectOtherApiSecondService<RailwayPowerSupplyEnvironmentalAndOtherFactor>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayPowerSupplyEnvironmentalAndOtherFactor
  ): IApiPayload<RailwayPowerSupplyEnvironmentalAndOtherFactor> => {
    return {
      data: {
        ...values,
        project_id: projectId,
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayPowerSupplyEnvironmentalAndOtherFactor>) => {
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
      title={`project.other.railway-power-supply-environmental-and-other-factor.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-power-supply-environmental-and-other-factor.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayPowerSupplyEnvironmentalAndOtherFactor>) => (
            <RailwayPowerSupplyEnvironmentalAndOtherFactorForm
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

export default RailwayPowerSupplyEnvironmentalAndOtherFactorDrawer;