// src/views/project/other/railway-maintenance-facility-layout-and-design/railway-maintenance-facility-layout-and-design-drawer.tsx

'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayMaintenanceFacilityLayoutAndDesign } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayMaintenanceFacilityLayoutAndDesignForm from './railway-maintenance-facility-layout-and-design-form';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceFacilityLayoutAndDesignDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayMaintenanceFacilityLayoutAndDesign: RailwayMaintenanceFacilityLayoutAndDesign;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayMaintenanceFacilityLayoutAndDesignDrawer = ({
  open,
  toggle,
  refetch,
  railwayMaintenanceFacilityLayoutAndDesign: data,
  projectId,
  otherSubMenu,
  fileTypesConfig
}: RailwayMaintenanceFacilityLayoutAndDesignDrawerProps) => {
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
    facility_layout_and_dimension: yup.string().nullable(),
    maintenance_bays_number_and_size: yup.string().nullable(),
    spare_parts_and_equipment_storage_areas: yup.string().nullable(),
    office_and_administrative_areas_availability: yup.boolean().required('Office/Admin availability is required'),
    remark: yup.string().nullable(),
  });

  const createRecord = async (body: IApiPayload<RailwayMaintenanceFacilityLayoutAndDesign>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityLayoutAndDesign>().create(otherSubMenu?.apiRoute || '', body);

  const editRecord = async (body: IApiPayload<RailwayMaintenanceFacilityLayoutAndDesign>) =>
    projectOtherApiSecondService<RailwayMaintenanceFacilityLayoutAndDesign>().update(
      otherSubMenu?.apiRoute || '',
      data.id as string,
      body
    );

  const getPayload = (
    values: RailwayMaintenanceFacilityLayoutAndDesign
  ): IApiPayload<RailwayMaintenanceFacilityLayoutAndDesign> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        office_and_administrative_areas_availability: !!values.office_and_administrative_areas_availability, // Coerce boolean
        facility_layout_and_dimension: values.facility_layout_and_dimension || null,
        maintenance_bays_number_and_size: values.maintenance_bays_number_and_size || null,
        spare_parts_and_equipment_storage_areas: values.spare_parts_and_equipment_storage_areas || null,
        remark: values.remark || null,
      },
      files: []
    };
  };


  const handleClose = () => {
    setFileStates(initialFileStates);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayMaintenanceFacilityLayoutAndDesign>) => {
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
      title={`project.other.railway-maintenance-facility-layout-and-design.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-maintenance-facility-layout-and-design.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...data,
          }}
          createActionFunc={isEdit ? editRecord : createRecord}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayMaintenanceFacilityLayoutAndDesign>) => (
            <RailwayMaintenanceFacilityLayoutAndDesignForm
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

export default RailwayMaintenanceFacilityLayoutAndDesignDrawer;