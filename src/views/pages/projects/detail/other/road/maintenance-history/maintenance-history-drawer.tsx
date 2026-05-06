import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MaintenanceHistoryForm from './maintenance-history-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { MaintenanceHistory } from 'src/types/project/other'; // Update import
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface MaintenanceHistoryDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  maintenanceHistory: MaintenanceHistory; // Changed from MaintenanceHistory
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const MaintenanceHistoryDrawer = (props: MaintenanceHistoryDrawerType) => {
  const { open, toggle, refetch, maintenanceHistory, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    road_segment_id: yup.string().uuid().required('Road segment is required'),
    last_maintenance_date: yup.mixed().required('Last maintenance date is required'),
    maintenance_type_id: yup.string().uuid().required('Maintenance type is required'),
    severity_level_id: yup.string().uuid().required('Severity level is required'),
    suggested_repair_id: yup.string().uuid().required('Suggested repair is required'),
    recommended_action_urgency_id: yup.string().uuid().required('Recommended action urgency is required'),
    maintenance_cost: yup.number().nullable().typeError('Maintenance cost must be a number'),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(maintenanceHistory?.id);

  const createMaintenanceHistory = async (body: IApiPayload<MaintenanceHistory>) =>
    projectOtherApiSecondService<MaintenanceHistory>().create(otherSubMenu?.apiRoute || '', body);

  const editMaintenanceHistory = async (body: IApiPayload<MaintenanceHistory>) =>
    projectOtherApiSecondService<MaintenanceHistory>().update(otherSubMenu?.apiRoute || '', maintenanceHistory?.id || '', body);

  const getPayload = (values: MaintenanceHistory) => ({
    data: {
      project_id: projectId,
      road_segment_id: values.road_segment_id,
      last_maintenance_date: values.last_maintenance_date,
      maintenance_type_id: values.maintenance_type_id,
      maintenance_cost: values.maintenance_cost,
      severity_level_id: values.severity_level_id,
      suggested_repair_id: values.suggested_repair_id,
      recommended_action_urgency_id: values.recommended_action_urgency_id,
      remark: values.remark,
      id: maintenanceHistory?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<MaintenanceHistory>, payload: IApiPayload<MaintenanceHistory>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.maintenanceHistory, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.maintenance-history.${isEdit ? `edit-maintenance-history` : `create-maintenance-history`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.maintenance-history.${isEdit ? `edit-maintenance-history` : `create-maintenance-history`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...maintenanceHistory,
            project_id: projectId,
            road_segment_id: maintenanceHistory?.road_segment_id || maintenanceHistory?.roadSegment?.id || '',
            maintenance_type_id: maintenanceHistory?.maintenance_type_id || maintenanceHistory?.maintenanceType?.id || '',
            severity_level_id: maintenanceHistory?.severity_level_id || maintenanceHistory?.severityLevel?.id || '',
            suggested_repair_id: maintenanceHistory?.suggested_repair_id || maintenanceHistory?.suggestedRepair?.id || '',
            recommended_action_urgency_id:
              maintenanceHistory?.recommended_action_urgency_id || maintenanceHistory?.recommendedActionUrgency?.id || ''
          }}
          createActionFunc={isEdit ? editMaintenanceHistory : createMaintenanceHistory}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MaintenanceHistory>) => {
            return <MaintenanceHistoryForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MaintenanceHistoryDrawer;
