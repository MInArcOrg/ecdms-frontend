'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayVehicleInteriorAndPassengerAmenity } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayVehicleInteriorAndPassengerAmenityForm from './railway-vehicle-interior-and-passenger-amenity-form';

interface RailwayVehicleInteriorAndPassengerAmenityDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayVehicleInteriorAndPassengerAmenity: RailwayVehicleInteriorAndPassengerAmenity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleInteriorAndPassengerAmenityDrawer = ({
  open,
  toggle,
  refetch,
  railwayVehicleInteriorAndPassengerAmenity,
  projectId,
  otherSubMenu
}: RailwayVehicleInteriorAndPassengerAmenityDrawerProps) => {
  const isEdit = Boolean(railwayVehicleInteriorAndPassengerAmenity?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_vehicle_identification_id: yup.string().required('Vehicle Identification ID is required'),
    seating_capacity: nullableIntegerSchema(),
    passenger_amenities_availability: yup.string().nullable(),
    accessibility_features_for_passengers_with_disabilities: yup.boolean().nullable(),
    remark: yup.string().nullable()
  });

  const createInteriorAndAmenity = async (body: IApiPayload<RailwayVehicleInteriorAndPassengerAmenity>) =>
    projectOtherApiSecondService<RailwayVehicleInteriorAndPassengerAmenity>().create(otherSubMenu?.apiRoute || '', body);

  const editInteriorAndAmenity = async (body: IApiPayload<RailwayVehicleInteriorAndPassengerAmenity>) =>
    projectOtherApiSecondService<RailwayVehicleInteriorAndPassengerAmenity>().update(
      otherSubMenu?.apiRoute || '',
      railwayVehicleInteriorAndPassengerAmenity.id as string,
      body
    );

  const getPayload = (values: RailwayVehicleInteriorAndPassengerAmenity): IApiPayload<RailwayVehicleInteriorAndPassengerAmenity> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        seating_capacity: values.seating_capacity ? Number(values.seating_capacity) : null
      },
      files: []
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayVehicleInteriorAndPassengerAmenity>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || 'RAILWAY_VEHICLE_INTERIOR_AND_PASSENGER_AMENITY';

      if (defaultFile) {
        await uploadFile(defaultFile, fileType, recordId, 'interior_amenity_document', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-vehicle-interior-and-passenger-amenity.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-vehicle-interior-and-passenger-amenity.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayVehicleInteriorAndPassengerAmenity}
          createActionFunc={isEdit ? editInteriorAndAmenity : createInteriorAndAmenity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayVehicleInteriorAndPassengerAmenity>) => (
            <RailwayVehicleInteriorAndPassengerAmenityForm formik={formik} defaultFile={defaultFile} onDefaultFileChange={setDefaultFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayVehicleInteriorAndPassengerAmenityDrawer;
