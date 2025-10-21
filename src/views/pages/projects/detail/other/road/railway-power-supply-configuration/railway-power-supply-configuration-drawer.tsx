'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSupplyConfiguration } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayPowerSupplyConfigurationForm from './railway-power-supply-configuration-form';

interface RailwayPowerSupplyConfigurationDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayPowerSupplyConfiguration: RailwayPowerSupplyConfiguration;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

// File Type Constant (Matching the entity name)
const FILE_TYPE_DEFAULT = 'RAILWAY_POWER_SUPPLY_CONFIGURATION';

const RailwayPowerSupplyConfigurationDrawer = ({
  open,
  toggle,
  refetch,
  railwayPowerSupplyConfiguration,
  projectId,
  otherSubMenu
}: RailwayPowerSupplyConfigurationDrawerProps) => {
  const isEdit = Boolean(railwayPowerSupplyConfiguration?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  // Validation Schema based on the attributes
  const validationSchema = yup.object().shape({
    power_supply_system_type_id: yup
      .string()
      .required('Power Supply System Type ID is required'),
    voltage_level_and_frequency: yup.string().nullable(),
    power_supply_capacity_and_load_requirements: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createRecord = async (body: IApiPayload<RailwayPowerSupplyConfiguration>) =>
    projectOtherApiSecondService<RailwayPowerSupplyConfiguration>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayPowerSupplyConfiguration>) =>
    projectOtherApiSecondService<RailwayPowerSupplyConfiguration>().update(
      otherSubMenu?.apiRoute || '',
      railwayPowerSupplyConfiguration.id as string,
      body
    );

  const getPayload = (values: RailwayPowerSupplyConfiguration): IApiPayload<RailwayPowerSupplyConfiguration> => {
    return {
      data: {
        ...values,
        project_id: projectId
      },
      files: []
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayPowerSupplyConfiguration>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || FILE_TYPE_DEFAULT;

      // Single file upload
      if (defaultFile) {
        await uploadFile(defaultFile, fileType, recordId, 'power_supply_config_document', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-power-supply-configuration.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-power-supply-configuration.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayPowerSupplyConfiguration}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayPowerSupplyConfiguration>) => (
            <RailwayPowerSupplyConfigurationForm
              formik={formik}
              defaultFile={defaultFile}
              onDefaultFileChange={setDefaultFile}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayPowerSupplyConfigurationDrawer;