'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayVehicleSafetyAndCompliance } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayVehicleSafetyAndComplianceForm from './railway-vehicle-safety-and-compliance-form';

interface RailwayVehicleSafetyAndComplianceDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayVehicleSafetyAndCompliance: RailwayVehicleSafetyAndCompliance;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleSafetyAndComplianceDrawer = ({
  open,
  toggle,
  refetch,
  railwayVehicleSafetyAndCompliance,
  projectId,
  otherSubMenu
}: RailwayVehicleSafetyAndComplianceDrawerProps) => {
  const isEdit = Boolean(railwayVehicleSafetyAndCompliance?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_vehicle_identification_id: yup.string().required('Vehicle Identification ID is required'),
    safety_features_and_systems: yup.string().nullable(),
    comply_with_regulatory_standards_and_certifications: yup.boolean().nullable(),
    incident_records_number: yup.number().integer('Must be a whole number').nullable().typeError('Incident count must be a number'),
    action_taken_to_accidents: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createSafetyAndCompliance = async (body: IApiPayload<RailwayVehicleSafetyAndCompliance>) =>
    projectOtherApiSecondService<RailwayVehicleSafetyAndCompliance>().create(otherSubMenu?.apiRoute || '', body);

  const editSafetyAndCompliance = async (body: IApiPayload<RailwayVehicleSafetyAndCompliance>) =>
    projectOtherApiSecondService<RailwayVehicleSafetyAndCompliance>().update(
      otherSubMenu?.apiRoute || '',
      railwayVehicleSafetyAndCompliance.id as string,
      body
    );

  const getPayload = (values: RailwayVehicleSafetyAndCompliance): IApiPayload<RailwayVehicleSafetyAndCompliance> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        incident_records_number: values.incident_records_number ? Number(values.incident_records_number) : null
      },
      files: []
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayVehicleSafetyAndCompliance>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || 'RAILWAY_VEHICLE_SAFETY_AND_COMPLIANCE';

      if (defaultFile) {
        await uploadFile(defaultFile, fileType, recordId, 'safety_compliance_document', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-vehicle-safety-and-compliance.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-vehicle-safety-and-compliance.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayVehicleSafetyAndCompliance}
          createActionFunc={isEdit ? editSafetyAndCompliance : createSafetyAndCompliance}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayVehicleSafetyAndCompliance>) => (
            <RailwayVehicleSafetyAndComplianceForm formik={formik} defaultFile={defaultFile} onDefaultFileChange={setDefaultFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayVehicleSafetyAndComplianceDrawer;
