'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ThermalBiomassIncinerationForm from './thermal-biomass-incineration-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { ThermalBiomassIncinerationData } from 'src/types/project/other';

interface ThermalBiomassIncinerationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  thermalBiomassIncinerationData: ThermalBiomassIncinerationData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const ThermalBiomassIncinerationDrawer = (props: ThermalBiomassIncinerationDrawerType) => {
  const { open, toggle, refetch, thermalBiomassIncinerationData, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    type_id: yup.string().uuid().required('Type is required'),
    fuel_source_id: yup.string().uuid().required('Fuel Source is required'),
    heat_rate_at_max_capacity: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(thermalBiomassIncinerationData?.id);

  const createThermalBiomassIncinerationData = async (body: IApiPayload<ThermalBiomassIncinerationData>) =>
    projectOtherApiSecondService<ThermalBiomassIncinerationData>().create(otherSubMenu?.apiRoute || '', body);

  const editThermalBiomassIncinerationData = async (body: IApiPayload<ThermalBiomassIncinerationData>) =>
    projectOtherApiSecondService<ThermalBiomassIncinerationData>().update(
      otherSubMenu?.apiRoute || '',
      thermalBiomassIncinerationData?.id || '',
      body
    );

  const getPayload = (values: ThermalBiomassIncinerationData) => ({
    data: {
      project_id: projectId,
      type_id: values.type_id,
      fuel_source_id: values.fuel_source_id,
      heat_rate_at_max_capacity: values.heat_rate_at_max_capacity,
      remark: values.remark,
      id: thermalBiomassIncinerationData?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ThermalBiomassIncinerationData>,
    payload: IApiPayload<ThermalBiomassIncinerationData>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.thermalBiomassIncinerationData,
        response.payload.id,
        '',
        ''
      );
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.thermal-biomass-incineration.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.thermal-biomass-incineration.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            id: thermalBiomassIncinerationData?.id || '',
            project_id: projectId,
            type_id: thermalBiomassIncinerationData?.type_id || '',
            fuel_source_id: thermalBiomassIncinerationData?.fuel_source_id || '',
            heat_rate_at_max_capacity: thermalBiomassIncinerationData?.heat_rate_at_max_capacity || undefined,
            remark: thermalBiomassIncinerationData?.remark || ''
          }}
          createActionFunc={isEdit ? editThermalBiomassIncinerationData : createThermalBiomassIncinerationData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ThermalBiomassIncinerationData>) => (
            <ThermalBiomassIncinerationForm formik={formik} file={uploadableFile} onFileChange={onFileChange} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ThermalBiomassIncinerationDrawer;
