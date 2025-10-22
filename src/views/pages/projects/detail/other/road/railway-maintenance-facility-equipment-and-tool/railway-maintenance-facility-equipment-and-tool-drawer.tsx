// src/views/project/other/railway-maintenance-facility-equipment-and-tool/railway-maintenance-facility-equipment-and-tool-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayMaintenanceFacilityEquipmentAndTool } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayMaintenanceFacilityEquipmentAndToolForm from './railway-maintenance-facility-equipment-and-tool-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceFacilityEquipmentAndToolDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayMaintenanceFacilityEquipmentAndTool: RailwayMaintenanceFacilityEquipmentAndTool;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayMaintenanceFacilityEquipmentAndToolDrawer = ({
  open,
  toggle,
  refetch,
  railwayMaintenanceFacilityEquipmentAndTool: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayMaintenanceFacilityEquipmentAndToolDrawerProps) => {
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
    maintenance_equipment_and_tool_available_type: yup.string().nullable(),
    hoists_cranes_and_lifting_equipment: yup.boolean().required('Lifting equipment availability is required'),
    diagnostic_and_testing_equipment: yup.string().nullable(),
    tools_and_machinery_specific_to_maintenance_activities: yup.string().nullable(),
    remark: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayMaintenanceFacilityEquipmentAndTool>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityEquipmentAndTool>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayMaintenanceFacilityEquipmentAndTool>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityEquipmentAndTool>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayMaintenanceFacilityEquipmentAndTool
  ): IApiPayload<RailwayMaintenanceFacilityEquipmentAndTool> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        hoists_cranes_and_lifting_equipment: !!values.hoists_cranes_and_lifting_equipment, // Coerce boolean
        maintenance_equipment_and_tool_available_type: values.maintenance_equipment_and_tool_available_type || null,
        diagnostic_and_testing_equipment: values.diagnostic_and_testing_equipment || null,
        tools_and_machinery_specific_to_maintenance_activities: values.tools_and_machinery_specific_to_maintenance_activities || null,
        remark: values.remark || null,
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayMaintenanceFacilityEquipmentAndTool>) => {
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
      title={`project.other.railway-maintenance-facility-equipment-and-tool.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-maintenance-facility-equipment-and-tool.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayMaintenanceFacilityEquipmentAndTool>) => (
            <RailwayMaintenanceFacilityEquipmentAndToolForm
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

export default RailwayMaintenanceFacilityEquipmentAndToolDrawer;