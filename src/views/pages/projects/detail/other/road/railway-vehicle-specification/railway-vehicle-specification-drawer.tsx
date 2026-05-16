'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayVehicleSpecification } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayVehicleSpecificationForm from './railway-vehicle-specification-form';

interface RailwayVehicleSpecificationDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayVehicleSpecification: RailwayVehicleSpecification;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleSpecificationDrawer = ({
  open,
  toggle,
  refetch,
  railwayVehicleSpecification,
  projectId,
  otherSubMenu
}: RailwayVehicleSpecificationDrawerProps) => {
  const isEdit = Boolean(railwayVehicleSpecification?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    railway_vehicle_identification_id: yup.string().required('Vehicle Identification ID is required'),
    vehicle_dimensions: yup.string().nullable(),
    vehicle_weight_and_load_capacity: yup.string().nullable(),
    maximum_speed: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    braking_system_type_id: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createVehicleSpecification = async (body: IApiPayload<RailwayVehicleSpecification>) =>
    projectOtherApiSecondService<RailwayVehicleSpecification>().create(otherSubMenu?.apiRoute || '', body);

  const editVehicleSpecification = async (body: IApiPayload<RailwayVehicleSpecification>) =>
    projectOtherApiSecondService<RailwayVehicleSpecification>().update(
      otherSubMenu?.apiRoute || '',
      railwayVehicleSpecification.id as string,
      body
    );

  const getPayload = (values: RailwayVehicleSpecification): IApiPayload<RailwayVehicleSpecification> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        maximum_speed: values.maximum_speed ? Number(values.maximum_speed) : null
      },
      files: []
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayVehicleSpecification>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || 'RAILWAY_VEHICLE_SPECIFICATION';

      if (defaultFile) {
        await uploadFile(defaultFile, fileType, recordId, 'specification_document', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-vehicle-specification.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-vehicle-specification.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayVehicleSpecification}
          createActionFunc={isEdit ? editVehicleSpecification : createVehicleSpecification}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayVehicleSpecification>) => (
            <RailwayVehicleSpecificationForm formik={formik} defaultFile={defaultFile} onDefaultFileChange={setDefaultFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayVehicleSpecificationDrawer;
