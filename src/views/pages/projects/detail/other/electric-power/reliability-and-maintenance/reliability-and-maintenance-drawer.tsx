'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ReliabilityAndMaintenanceForm from './reliability-and-maintenance-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { ReliabilityAndMaintenance } from 'src/types/project/other';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface ReliabilityAndMaintenanceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  reliabilityAndMaintenance: ReliabilityAndMaintenance;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const ReliabilityAndMaintenanceDrawer = (props: ReliabilityAndMaintenanceDrawerType) => {
  const { open, toggle, refetch, reliabilityAndMaintenance, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    maintenance_frequency_id: yup.string().required('Maintenance frequency is required'),
    total_outage_duration: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    total_interruption_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    saidi: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    saifi: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    automatic_fault_detection_restoration_system_installed: yup.boolean().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(reliabilityAndMaintenance?.id);

  const createReliabilityAndMaintenance = async (body: IApiPayload<ReliabilityAndMaintenance>) =>
    projectOtherApiSecondService<ReliabilityAndMaintenance>().create(otherSubMenu?.apiRoute || '', body);

  const editReliabilityAndMaintenance = async (body: IApiPayload<ReliabilityAndMaintenance>) =>
    projectOtherApiSecondService<ReliabilityAndMaintenance>().update(
      otherSubMenu?.apiRoute || '',
      reliabilityAndMaintenance?.id || '',
      body
    );

  const getPayload = (values: ReliabilityAndMaintenance) => ({
    data: {
      project_id: projectId,
      maintenance_frequency_id: values.maintenance_frequency_id,
      total_outage_duration: values.total_outage_duration,
      total_interruption_number: values.total_interruption_number,
      saidi: values.saidi,
      saifi: values.saifi,
      automatic_fault_detection_restoration_system_installed: values.automatic_fault_detection_restoration_system_installed,
      remark: values.remark,
      id: reliabilityAndMaintenance?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<ReliabilityAndMaintenance>, payload: IApiPayload<ReliabilityAndMaintenance>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.reliabilityAndMaintenance, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.reliability-and-maintenance.${
        isEdit ? `edit-reliability-and-maintenance` : `create-reliability-and-maintenance`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.reliability-and-maintenance.${
            isEdit ? `edit-reliability-and-maintenance` : `create-reliability-and-maintenance`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...reliabilityAndMaintenance
          }}
          createActionFunc={isEdit ? editReliabilityAndMaintenance : createReliabilityAndMaintenance}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ReliabilityAndMaintenance>) => {
            return <ReliabilityAndMaintenanceForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ReliabilityAndMaintenanceDrawer;
