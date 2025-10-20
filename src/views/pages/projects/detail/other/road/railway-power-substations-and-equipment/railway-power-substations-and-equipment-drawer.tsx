'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSubstationAndEquipment } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayPowerSubstationAndEquipmentForm from './railway-power-substations-and-equipment-form';

interface RailwayPowerSubstationAndEquipmentDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayPowerSubstationAndEquipment: RailwayPowerSubstationAndEquipment;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

// File Type Constants
const FILE_TYPE_DEFAULT = "RAILWAY_POWER_SUBSTATION_AND_EQUIPMENT";
const FILE_TYPE_COMPONENT = "TRANSFORMER_SWITCHGEAR_OTHER_COMPONENT_FILE";

const RailwayPowerSubstationAndEquipmentDrawer = ({
  open,
  toggle,
  refetch,
  railwayPowerSubstationAndEquipment,
  projectId,
  otherSubMenu
}: RailwayPowerSubstationAndEquipmentDrawerProps) => {
  const isEdit = Boolean(railwayPowerSubstationAndEquipment?.id);

  // State for the two distinct files
  const [defaultFile, setDefaultFile] = useState<File | null>(null); // RAILWAY_POWER_SUBSTATION_AND_EQUIPMENT
  // Renamed to match the component file convention:
  const [transformerSwitchgearFile, setTransformerSwitchgearFile] = useState<File | null>(null); // TRANSFORMER_SWITCHGEAR_OTHER_COMPONENT_FILE

  const validationSchema = yup.object().shape({
    railway_station_platform_layout_id: yup
      .string()
      .required('Platform Layout ID is required'),
    substation_capacity_and_equipment_specifications: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createSubstation = async (body: IApiPayload<RailwayPowerSubstationAndEquipment>) =>
    projectOtherApiSecondService<RailwayPowerSubstationAndEquipment>().create(otherSubMenu?.apiRoute || '', body);

  const editSubstation = async (body: IApiPayload<RailwayPowerSubstationAndEquipment>) =>
    projectOtherApiSecondService<RailwayPowerSubstationAndEquipment>().update(
      otherSubMenu?.apiRoute || '',
      railwayPowerSubstationAndEquipment.id as string,
      body
    );

  const getPayload = (
    values: RailwayPowerSubstationAndEquipment
  ): IApiPayload<RailwayPowerSubstationAndEquipment> => {
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
    setTransformerSwitchgearFile(null); // Renamed handler
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayPowerSubstationAndEquipment>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;

      // 1. Upload Default Substation File (RAILWAY_POWER_SUBSTATION_AND_EQUIPMENT)
      if (defaultFile) {
        await uploadFile(
          defaultFile,
          FILE_TYPE_DEFAULT,
          recordId,
          'substation_main_document',
          ''
        );
      }

      // 2. Upload Transformer/Switchgear Component File (TRANSFORMER_SWITCHGEAR_OTHER_COMPONENT_FILE)
      if (transformerSwitchgearFile) { // Renamed state
        await uploadFile(
          transformerSwitchgearFile, // Renamed state
          FILE_TYPE_COMPONENT,
          recordId,
          'transformer_switchgear_component_document',
          ''
        );
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-power-substations-and-equipment.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-power-substations-and-equipment.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayPowerSubstationAndEquipment}
          createActionFunc={isEdit ? editSubstation : createSubstation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayPowerSubstationAndEquipment>) => (
            <RailwayPowerSubstationAndEquipmentForm
              formik={formik}
              defaultFile={defaultFile}
              onDefaultFileChange={setDefaultFile}
              transformerSwitchgearFile={transformerSwitchgearFile} // <--- Renamed Prop
              onTransformerSwitchgearFileChange={setTransformerSwitchgearFile} // <--- Renamed Handler
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayPowerSubstationAndEquipmentDrawer;