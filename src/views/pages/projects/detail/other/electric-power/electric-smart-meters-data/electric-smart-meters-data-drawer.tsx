'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ElectricSmartMetersDataForm from './electric-smart-meters-data-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { ElectricSmartMetersData, MiniGridStation } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface ElectricSmartMetersDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  electricSmartMetersData: ElectricSmartMetersData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  miniGridStations: MiniGridStation[];
  Model: any[];
  smartMeterTypes: any[];
}

const ElectricSmartMetersDataDrawer = (props: ElectricSmartMetersDataDrawerType) => {
  const { open, toggle, refetch, electricSmartMetersData, projectId, otherSubMenu, miniGridStations, Model, smartMeterTypes } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    mini_grid_station_id: yup.string().required('Mini Grid Station is required'),
    name: yup.string().required('Name is required'),
    owner_operator: yup.string().nullable(),
    facility_type: yup.string().required('Facility Type is required'),
    service_area: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    manufacturer: yup.string().nullable(),
    model_id: yup.string().required('Model is required'),
    smart_meter_type_id: yup.string().required('Smart Meter Type is required'),
    installation_year: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Installation year must be an integer'),
    smart_meters_installed_number: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Smart meters installed number must be an integer'),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(electricSmartMetersData?.id);

  const createElectricSmartMetersData = async (body: IApiPayload<ElectricSmartMetersData>) =>
    projectOtherApiSecondService<ElectricSmartMetersData>().create(otherSubMenu?.apiRoute || '', body);

  const editElectricSmartMetersData = async (body: IApiPayload<ElectricSmartMetersData>) =>
    projectOtherApiSecondService<ElectricSmartMetersData>().update(otherSubMenu?.apiRoute || '', electricSmartMetersData?.id || '', body);

  const getPayload = (values: ElectricSmartMetersData) => ({
    data: {
      project_id: projectId,
      mini_grid_station_id: values.mini_grid_station_id,
      name: values.name,
      owner_operator: values.owner_operator,
      facility_type: values.facility_type,
      service_area: values.service_area,
      manufacturer: values.manufacturer,
      model_id: values.model_id,
      smart_meter_type_id: values.smart_meter_type_id,
      installation_year: values.installation_year,
      smart_meters_installed_number: values.smart_meters_installed_number,
      remark: values.remark,
      id: electricSmartMetersData?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ElectricSmartMetersData>, payload: IApiPayload<ElectricSmartMetersData>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.electric_smart_meters_data, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.electric-smart-meters-data.${isEdit ? `edit-electric-smart-meters-data` : `create-electric-smart-meters-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-smart-meters-data.${isEdit ? `edit-electric-smart-meters-data` : `create-electric-smart-meters-data`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...electricSmartMetersData,
            facility_type: electricSmartMetersData?.facility_type || 'Oil Immersed'
          }}
          createActionFunc={isEdit ? editElectricSmartMetersData : createElectricSmartMetersData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricSmartMetersData>) => {
            return (
              <ElectricSmartMetersDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                miniGridStations={miniGridStations}
                smartMeterModels={Model}
                smartMeterTypes={smartMeterTypes}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ElectricSmartMetersDataDrawer;
