'use client';
import type { FormikProps } from 'formik';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { ElectricGridControlCenterData, ElectricGridControlCenterPerformanceAndMaintenance } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ElectricGridControlCenterPerformanceAndMaintenanceForm from './electric-grid-control-center-performance-and-maintenance-form';

interface ElectricGridControlCenterPerformanceAndMaintenanceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  electricGridControlCenterData: ElectricGridControlCenterData[];
  maintenanceFrequencies: any[];
}

const ElectricGridControlCenterPerformanceAndMaintenanceDrawer = (props: ElectricGridControlCenterPerformanceAndMaintenanceDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    electricGridControlCenterPerformanceAndMaintenance,
    projectId,
    otherSubMenu,
    electricGridControlCenterData,
    maintenanceFrequencies
  } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    electric_grid_control_center_data_id: yup.string().uuid().required('Electric Grid Control Center Data is required'),
    name: yup.string().max(100).required('Name is required'),
    maintenance_frequency_id: yup.string().uuid().required('Maintenance Frequency is required'),
    total_system_downtime_outage_duration: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    total_interruptions_number: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer('Total interruptions number must be an integer'),
    saidi: yup.string().max(100).nullable(),
    saifi: yup.string().max(100).nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(electricGridControlCenterPerformanceAndMaintenance?.id);

  const createElectricGridControlCenterPerformanceAndMaintenance = async (
    body: IApiPayload<ElectricGridControlCenterPerformanceAndMaintenance>
  ) => projectOtherApiSecondService<ElectricGridControlCenterPerformanceAndMaintenance>().create(otherSubMenu?.apiRoute || '', body);

  const editElectricGridControlCenterPerformanceAndMaintenance = async (
    body: IApiPayload<ElectricGridControlCenterPerformanceAndMaintenance>
  ) =>
    projectOtherApiSecondService<ElectricGridControlCenterPerformanceAndMaintenance>().update(
      otherSubMenu?.apiRoute || '',
      electricGridControlCenterPerformanceAndMaintenance?.id || '',
      body
    );

  const getPayload = (values: ElectricGridControlCenterPerformanceAndMaintenance) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<ElectricGridControlCenterPerformanceAndMaintenance>,
    payload: IApiPayload<ElectricGridControlCenterPerformanceAndMaintenance>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.electric_grid_control_center_performance_and_maintenance,
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
      title={`project.other.electric-grid-control-center-performance-and-maintenance.${
        isEdit
          ? `edit-electric-grid-control-center-performance-and-maintenance`
          : `create-electric-grid-control-center-performance-and-maintenance`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-grid-control-center-performance-and-maintenance.${
            isEdit
              ? `edit-electric-grid-control-center-performance-and-maintenance`
              : `create-electric-grid-control-center-performance-and-maintenance`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={electricGridControlCenterPerformanceAndMaintenance}
          createActionFunc={
            isEdit ? editElectricGridControlCenterPerformanceAndMaintenance : createElectricGridControlCenterPerformanceAndMaintenance
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricGridControlCenterPerformanceAndMaintenance>) => {
            return (
              <ElectricGridControlCenterPerformanceAndMaintenanceForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                electricGridControlCenterData={electricGridControlCenterData}
                maintenanceFrequencies={maintenanceFrequencies}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ElectricGridControlCenterPerformanceAndMaintenanceDrawer;
