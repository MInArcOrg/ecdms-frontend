'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MaintenanceForm from './maintenance-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { Maintenance, TelecomInfrastructureComponent } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface MaintenanceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  maintenance: Maintenance;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
  telecomInfrastructureComponents: TelecomInfrastructureComponent[];
  mobileNetworkTypeMap: Map<string, string>;
}

const MaintenanceDrawer = (props: MaintenanceDrawerType) => {
  const { open, toggle, refetch, maintenance, projectId, otherSubMenu, telecomInfrastructureComponents, mobileNetworkTypeMap } = props;
  const [uploadableFiles, setUploadableFiles] = useState<{
    maintenanceDocument: File | null;
    infrastructureImage: File | null;
  }>({
    maintenanceDocument: null,
    infrastructureImage: null
  });

  const onFileChange = (fileType: string, file: File | null) => {
    setUploadableFiles((prev) => ({
      ...prev,
      [fileType]: file
    }));
  };

  const validationSchema = yup.object().shape({
    telecom_infrastructure_id: yup.string().required(),
    maintenance_frequency: yup.boolean().nullable(),
    service_level_agreement: yup.boolean().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(maintenance?.id);

  const createMaintenance = async (body: IApiPayload<Maintenance>) =>
    projectOtherApiSecondService<Maintenance>().create(otherSubMenu?.apiRoute || '', body);

  const editMaintenance = async (body: IApiPayload<Maintenance>) =>
    projectOtherApiSecondService<Maintenance>().update(otherSubMenu?.apiRoute || '', maintenance?.id || '', body);

  const getPayload = (values: Maintenance) => ({
    data: {
      project_id: projectId,
      telecom_infrastructure_id: values.telecom_infrastructure_id,
      maintenance_frequency: values.maintenance_frequency,
      service_level_agreement: values.service_level_agreement,
      remark: values.remark,
      id: maintenance?.id
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<Maintenance>, payload: IApiPayload<Maintenance>) => {
    const recordId = response.payload.id;

    // Upload maintenance document if provided
    if (uploadableFiles.maintenanceDocument) {
      await uploadFile(uploadableFiles.maintenanceDocument, uploadableProjectFileTypes.other.maintenance, recordId, '', '');
    }

    // Upload infrastructure image if provided
    if (uploadableFiles.infrastructureImage) {
      await uploadFile(uploadableFiles.infrastructureImage, uploadableProjectFileTypes.other.infrastructureImage, recordId, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.maintenance.${isEdit ? `edit-maintenance` : `create-maintenance`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.maintenance.${isEdit ? `edit-maintenance` : `create-maintenance`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...maintenance
          }}
          createActionFunc={isEdit ? editMaintenance : createMaintenance}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Maintenance>) => {
            return (
              <MaintenanceForm
                files={uploadableFiles}
                onFileChange={onFileChange}
                formik={formik}
                telecomInfrastructureComponents={telecomInfrastructureComponents}
                mobileNetworkTypeMap={mobileNetworkTypeMap}
              />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MaintenanceDrawer;
