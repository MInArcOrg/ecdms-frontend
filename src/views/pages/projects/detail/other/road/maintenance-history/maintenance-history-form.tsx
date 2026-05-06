import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import { MaintenanceHistory, RoadSegment } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface MaintenanceHistoryFormProps {
  formik: FormikProps<MaintenanceHistory>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const MaintenanceHistoryForm: React.FC<MaintenanceHistoryFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: roadSegments } = useQuery({
    queryKey: ['roadSegments', formik.values.project_id],
    queryFn: () =>
      projectOtherApiService<RoadSegment>().getAll(
        'roadsegment',
        dropDownConfig({
          filter: { project_id: formik.values.project_id }
        })
      )
  });

  const { data: maintenanceTypes } = useQuery({
    queryKey: ['maintenance-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceType.model }
      })
  });

  const { data: severityLevels } = useQuery({
    queryKey: ['severity-levels'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.severityLevel.model }
      })
  });

  const { data: suggestedRepairs } = useQuery({
    queryKey: ['suggested-repairs'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.suggestedRepair.model }
      })
  });

  const { data: recommendedActionUrgencies } = useQuery({
    queryKey: ['recommended-action-urgencies'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.recommendedActionUrgency.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.maintenance-history.details.road-segment')}
          placeholder={transl('project.other.maintenance-history.details.road-segment')}
          name="road_segment_id"
          size="small"
          sx={{ mb: 2 }}
          options={roadSegments?.payload.map((item) => ({ label: item.name, value: item.id })) || []}
        />

        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.other.maintenance-history.details.last-maintenance-date')}
          name="last_maintenance_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="last_maintenance_date" />}
        />
        <CustomSelect
          fullWidth
          label={transl('project.other.maintenance-history.details.maintenance-type')}
          placeholder={transl('project.other.maintenance-history.details.maintenance-type')}
          name="maintenance_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            maintenanceTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.maintenance-history.details.maintenance-cost')}
          placeholder={transl('project.other.maintenance-history.details.maintenance-cost')}
          name="maintenance_cost"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.maintenance-history.details.severity-level')}
          placeholder={transl('project.other.maintenance-history.details.severity-level')}
          name="severity_level_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            severityLevels?.payload.map((level) => ({
              label: level.title,
              value: level.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.maintenance-history.details.suggested-repair')}
          placeholder={transl('project.other.maintenance-history.details.suggested-repair')}
          name="suggested_repair_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            suggestedRepairs?.payload.map((repair) => ({
              label: repair.title,
              value: repair.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.maintenance-history.details.recommended-action-urgency')}
          placeholder={transl('project.other.maintenance-history.details.recommended-action-urgency')}
          name="recommended_action_urgency_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            recommendedActionUrgencies?.payload.map((urgency) => ({
              label: urgency.title,
              value: urgency.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.maintenance-history.details.remark')}
          placeholder={transl('project.other.maintenance-history.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default MaintenanceHistoryForm;
