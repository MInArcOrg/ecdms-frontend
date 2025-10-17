'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayVehicleIdentification } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import RailwayVehicleIdentificationForm from './railway-vehicle-identification-form';

interface RailwayVehicleIdentificationDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayVehicleIdentification: RailwayVehicleIdentification;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleIdentificationDrawer = ({
  open,
  toggle,
  refetch,
  railwayVehicleIdentification,
  projectId,
  otherSubMenu
}: RailwayVehicleIdentificationDrawerProps) => {
  const isEdit = Boolean(railwayVehicleIdentification?.id);
  const [defaultFile, setDefaultFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    vehicle_identification_number: yup.string().nullable(),
    vehicle_type: yup.string().nullable(),
    manufacturer_supplier_name: yup.string().nullable(),
    manufacturer_supplier_address: yup.string().nullable(),
    manufacture_year: yup
      .number()
      .nullable()
      .typeError('Manufacture year must be a number')
      .min(1800, 'Must be a valid year')
      .max(new Date().getFullYear(), 'Must be current or past year'),
    ownership_or_leasing_details: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const createVehicleIdentification = async (body: IApiPayload<RailwayVehicleIdentification>) =>
    projectOtherApiSecondService<RailwayVehicleIdentification>().create(otherSubMenu?.apiRoute || '', body);

  const editVehicleIdentification = async (body: IApiPayload<RailwayVehicleIdentification>) =>
    projectOtherApiSecondService<RailwayVehicleIdentification>().update(
      otherSubMenu?.apiRoute || '',
      railwayVehicleIdentification.id as string,
      body
    );

  const getPayload = (values: RailwayVehicleIdentification): IApiPayload<RailwayVehicleIdentification> => {
    return {
      data: {
        ...values,
        project_id: projectId,
        manufacture_year: values.manufacture_year ? Number(values.manufacture_year) : null
      },
      files: []
    };
  };

  const handleClose = () => {
    setDefaultFile(null);
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<RailwayVehicleIdentification>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing record ID in response');

      const recordId = response.payload.id;
      const fileType = otherSubMenu?.fileType || 'RAILWAY_VEHICLE_IDENTIFICATION';

      if (defaultFile) {
        await uploadFile(defaultFile, fileType, recordId, 'vehicle_document', '');
      }

      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed or record ID missing:', error);
    }
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-vehicle-identification.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-vehicle-identification.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={railwayVehicleIdentification}
          createActionFunc={isEdit ? editVehicleIdentification : createVehicleIdentification}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayVehicleIdentification>) => (
            <RailwayVehicleIdentificationForm formik={formik} defaultFile={defaultFile} onDefaultFileChange={setDefaultFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayVehicleIdentificationDrawer;
