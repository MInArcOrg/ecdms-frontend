import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SafetyAndHealthForm from './safety-and-health-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { SafetyAndHealth } from 'src/types/project/other'; // Update import
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface SafetyAndHealthDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  safetyAndHealth: SafetyAndHealth; // Changed from SafetyAndHealth
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const SafetyAndHealthDrawer = (props: SafetyAndHealthDrawerType) => {
  const { open, toggle, refetch, safetyAndHealth, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    road_segment: yup.string().required('Road segment is required'),
    hazard_type_id: yup.string().required('Hazard type is required'),
    potential_impact_id: yup.string().required('Potential impact is required'),
    risk_level_id: yup.string().required('Risk level is required'),
    immediate_action_taken: yup.string().required('Immediate action is required'),
    incident_type_id: yup.string().required('Incident type is required'),
    incident_time: yup.string().required('Incident time is required'),
    medicare_required: yup.boolean().required('Medicare requirement must be specified'),
    total_injury_number: yup.number().min(0, 'Total injuries must be non-negative').required('Total injuries is required'),
    incident_reported_by: yup.string().required('Reporter name is required'),
    personal_protective_equipment_type_id: yup.string().required('PPE type is required'),
    personal_protective_equipment_condition_id: yup.string().required('PPE condition is required'),
    trained_on_equipment_usage: yup.boolean().required('Training status must be specified'),
    training_hours_number: yup.number().min(0, 'Training hours must be non-negative').required('Training hours is required'),
    weather_condition_during_incident_id: yup.string().required('Weather condition is required'),
    injury_severity_id: yup.string().required('Injury severity is required'),
    fatality_number: yup.number().min(0, 'Fatality number must be non-negative').required('Fatality number is required'),
    recommendation: yup.string().required('Recommendation is required'),
    remark: yup.string().nullable()
  });
  const isEdit = Boolean(safetyAndHealth?.id);

  const createSafetyAndHealth = async (body: IApiPayload<SafetyAndHealth>) =>
    projectOtherApiSecondService<SafetyAndHealth>().create(otherSubMenu?.apiRoute || '', body);

  const editSafetyAndHealth = async (body: IApiPayload<SafetyAndHealth>) =>
    projectOtherApiSecondService<SafetyAndHealth>().update(otherSubMenu?.apiRoute || '', safetyAndHealth?.id || '', body);

  const getPayload = (values: SafetyAndHealth) => ({
    data: {
      project_id: projectId,
      road_segment: values.road_segment,
      hazard_type_id: values.hazard_type_id,
      potential_impact_id: values.potential_impact_id,
      risk_level_id: values.risk_level_id,
      immediate_action_taken: values.immediate_action_taken,
      incident_type_id: values.incident_type_id,
      incident_time: values.incident_time,
      medicare_required: values.medicare_required,
      total_injury_number: values.total_injury_number,
      incident_reported_by: values.incident_reported_by,
      personal_protective_equipment_type_id: values.personal_protective_equipment_type_id,
      personal_protective_equipment_condition_id: values.personal_protective_equipment_condition_id,
      trained_on_equipment_usage: values.trained_on_equipment_usage,
      training_hours_number: values.training_hours_number,
      weather_condition_during_incident_id: values.weather_condition_during_incident_id,
      injury_severity_id: values.injury_severity_id,
      fatality_number: values.fatality_number,
      recommendation: values.recommendation,
      remark: values.remark,
      id: safetyAndHealth?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<SafetyAndHealth>, payload: IApiPayload<SafetyAndHealth>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.safetyAndHealth, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.safety-and-health.${isEdit ? `edit-safety-and-health` : `create-safety-and-health`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.safety-and-health.${isEdit ? `edit-safety-and-health` : `create-safety-and-health`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...safetyAndHealth
          }}
          createActionFunc={isEdit ? editSafetyAndHealth : createSafetyAndHealth}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SafetyAndHealth>) => {
            return <SafetyAndHealthForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SafetyAndHealthDrawer;
