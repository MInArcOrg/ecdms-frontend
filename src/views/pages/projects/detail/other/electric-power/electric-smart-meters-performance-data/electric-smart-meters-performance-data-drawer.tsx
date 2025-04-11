'use client';
import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ElectricSmartMetersPerformanceDataForm from './electric-smart-meters-performance-data-form';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { ElectricSmartMetersData, ElectricSmartMetersPerformanceData } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface ElectricSmartMetersPerformanceDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  electricSmartMetersPerformanceData: ElectricSmartMetersPerformanceData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  electricSmartMetersData: ElectricSmartMetersData[];
  maintenanceFrequencies: any[];
}

const ElectricSmartMetersPerformanceDataDrawer = (props: ElectricSmartMetersPerformanceDataDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    electricSmartMetersPerformanceData,
    projectId,
    otherSubMenu,
    electricSmartMetersData,
    maintenanceFrequencies
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    electric_smart_meters_data_id: yup.string().required('Electric Smart Meters Data is required'),
    name: yup.string().required('Name is required'),
    maintenance_frequency_id: yup.string().required('Maintenance Frequency is required'),
    average_meter_lifespan: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Average meter lifespan must be an integer'),
    average_meter_accuracy: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    safety_problems_encountered: yup.string().nullable(),
    work_accidents_number: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Work accidents number must be an integer'),
    on_site_safety_regulation_implemented: yup.boolean().nullable(),
    other: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(electricSmartMetersPerformanceData?.id);

  const createElectricSmartMetersPerformanceData = async (body: IApiPayload<ElectricSmartMetersPerformanceData>) =>
    projectOtherApiSecondService<ElectricSmartMetersPerformanceData>().create(otherSubMenu?.apiRoute || '', body);

  const editElectricSmartMetersPerformanceData = async (body: IApiPayload<ElectricSmartMetersPerformanceData>) =>
    projectOtherApiSecondService<ElectricSmartMetersPerformanceData>().update(
      otherSubMenu?.apiRoute || '',
      electricSmartMetersPerformanceData?.id || '',
      body
    );

  const getPayload = (values: ElectricSmartMetersPerformanceData) => ({
    data: {
      project_id: projectId,
      electric_smart_meters_data_id: values.electric_smart_meters_data_id,
      name: values.name,
      maintenance_frequency_id: values.maintenance_frequency_id,
      average_meter_lifespan: values.average_meter_lifespan,
      average_meter_accuracy: values.average_meter_accuracy,
      safety_problems_encountered: values.safety_problems_encountered,
      work_accidents_number: values.work_accidents_number,
      on_site_safety_regulation_implemented: values.on_site_safety_regulation_implemented,
      other: values.other,
      remark: values.remark,
      id: electricSmartMetersPerformanceData?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ElectricSmartMetersPerformanceData>,
    payload: IApiPayload<ElectricSmartMetersPerformanceData>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.electric_smart_meters_performance_data,
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
      title={`project.other.electric-smart-meters-performance-data.${isEdit ? `edit-electric-smart-meters-performance-data` : `create-electric-smart-meters-performance-data`
        }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-smart-meters-performance-data.${isEdit ? `edit-electric-smart-meters-performance-data` : `create-electric-smart-meters-performance-data`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...electricSmartMetersPerformanceData,
            on_site_safety_regulation_implemented: electricSmartMetersPerformanceData?.on_site_safety_regulation_implemented || false
          }}
          createActionFunc={isEdit ? editElectricSmartMetersPerformanceData : createElectricSmartMetersPerformanceData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricSmartMetersPerformanceData>) => {
            return (
              <ElectricSmartMetersPerformanceDataForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                electricSmartMetersData={electricSmartMetersData}
                maintenanceFrequencies={maintenanceFrequencies}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ElectricSmartMetersPerformanceDataDrawer;
