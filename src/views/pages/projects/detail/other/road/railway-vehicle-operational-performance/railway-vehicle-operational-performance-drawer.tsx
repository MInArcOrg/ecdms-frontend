'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayVehicleOperationalPerformance } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayVehicleOperationalPerformanceForm from './railway-vehicle-operational-performance-form';

interface RailwayVehicleOperationalPerformanceDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayVehicleOperationalPerformance: RailwayVehicleOperationalPerformance;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleOperationalPerformanceDrawer = ({
  open,
  toggle,
  refetch,
  railwayVehicleOperationalPerformance,
  projectId,
  otherSubMenu
}: RailwayVehicleOperationalPerformanceDrawerProps) => {
  const isEdit = Boolean(railwayVehicleOperationalPerformance?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_vehicle_identification_id: yup.string().required('Vehicle Identification ID is required'),
    fuel_or_energy_consumption: yup.string().nullable(),
    mileage_or_operating_hours: yup.string().nullable(),
    reliability_and_availability: yup.string().nullable(),
    performance_indicators: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createOperationalPerformance = async (body: IApiPayload<RailwayVehicleOperationalPerformance>) =>
    projectOtherApiSecondService<RailwayVehicleOperationalPerformance>().create(otherSubMenu?.apiRoute || '', body);

  const editOperationalPerformance = async (body: IApiPayload<RailwayVehicleOperationalPerformance>) =>
    projectOtherApiSecondService<RailwayVehicleOperationalPerformance>().update(
      otherSubMenu?.apiRoute || '',
      railwayVehicleOperationalPerformance.id as string,
      body
    );

  const getPayload = (values: RailwayVehicleOperationalPerformance): IApiPayload<RailwayVehicleOperationalPerformance> => {
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

  const onActionSuccess = async (response: IApiResponse<RailwayVehicleOperationalPerformance>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || 'RAILWAY_VEHICLE_OPERATIONAL_PERFORMANCE';

      if (defaultFile) {
        await uploadFile(defaultFile, fileType, recordId, 'performance_document', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-vehicle-operational-performance.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-vehicle-operational-performance.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayVehicleOperationalPerformance}
          createActionFunc={isEdit ? editOperationalPerformance : createOperationalPerformance}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayVehicleOperationalPerformance>) => (
            <RailwayVehicleOperationalPerformanceForm formik={formik} defaultFile={defaultFile} onDefaultFileChange={setDefaultFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayVehicleOperationalPerformanceDrawer;
