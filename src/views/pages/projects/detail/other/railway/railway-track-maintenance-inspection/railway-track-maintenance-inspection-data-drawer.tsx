'use client';
import type { FormikProps } from 'formik';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayTrackMaintenanceAndInspection } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as Yup from 'yup';
import RailwayTrackMaintenanceAndInspectionForm from './railway-track-maintenance-inspection-form';




interface RailwayTrackMaintenanceAndInspectionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayTrackMaintenanceAndInspection: RailwayTrackMaintenanceAndInspection;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayTrackMaintenanceAndInspectionDrawer = (props: RailwayTrackMaintenanceAndInspectionDrawerType) => {
  const { open, toggle, refetch, railwayTrackMaintenanceAndInspection, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const isEdit = Boolean(railwayTrackMaintenanceAndInspection?.id);

  const createRailwayTrackMaintenanceAndInspection = async (body: IApiPayload<RailwayTrackMaintenanceAndInspection>) =>
    projectOtherApiSecondService<RailwayTrackMaintenanceAndInspection>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwayTrackMaintenanceAndInspection = async (body: IApiPayload<RailwayTrackMaintenanceAndInspection>) =>
    projectOtherApiSecondService<RailwayTrackMaintenanceAndInspection>().update(otherSubMenu?.apiRoute || '', railwayTrackMaintenanceAndInspection?.id || '', body);

  const validationSchema = Yup.object().shape({
    scheduled_maintenance_activity_id: Yup.string().required(),
    maintenance_method: Yup.string().nullable(),
    track_maintenance_frequency_id: Yup.string().required(),
    recent_maintenance_date: Yup.date().nullable(),
    inspection_reports_and_findings: Yup.string().nullable(),
    remark: Yup.string().nullable()
  });

  const getPayload = (values: RailwayTrackMaintenanceAndInspection) => ({
    data: {
      project_id: projectId,
      scheduled_maintenance_activity_id: values.scheduled_maintenance_activity_id,
      maintenance_method: values.maintenance_method,
      track_maintenance_frequency_id: values.track_maintenance_frequency_id,
      recent_maintenance_date: values.recent_maintenance_date,
      inspection_reports_and_findings: values.inspection_reports_and_findings,
      remark: values.remark,
      id: railwayTrackMaintenanceAndInspection?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<RailwayTrackMaintenanceAndInspection>, payload: IApiPayload<RailwayTrackMaintenanceAndInspection>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.electric_grid_control_center_data, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-track-maintenance-and-inspection.${isEdit ? `edit-railway-track-maintenance-and-inspection` : `create-railway-track-maintenance-and-inspection`}`}
      handleClose={handleClose}
      open={open}
      model="railwaytrackmaintenanceandinspection"
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-track-maintenance-and-inspection.${isEdit ? `edit-railway-track-maintenance-and-inspection` : `create-railway-track-maintenance-and-inspection`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayTrackMaintenanceAndInspection
          }}
          createActionFunc={isEdit ? editRailwayTrackMaintenanceAndInspection : createRailwayTrackMaintenanceAndInspection}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayTrackMaintenanceAndInspection>) => {
            return <RailwayTrackMaintenanceAndInspectionForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayTrackMaintenanceAndInspectionDrawer;
