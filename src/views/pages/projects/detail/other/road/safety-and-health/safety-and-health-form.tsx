import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import { SafetyAndHealth } from "src/types/project/other";
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomSwitch from "src/views/shared/form/custom-switch";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface SafetyAndHealthFormProps {
  formik: FormikProps<SafetyAndHealth>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const SafetyAndHealthForm: React.FC<SafetyAndHealthFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();
  const { data: hazardTypes } = useQuery({
    queryKey: ["hazard-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.hazardType.model },
      }),
  });

  const { data: potentialImpacts } = useQuery({
    queryKey: ["potential-impacts"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.potentialImpact.model },
      }),
  });

  const { data: riskLevels } = useQuery({
    queryKey: ["risk-levels"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.riskLevel.model },
      }),
  });

  const { data: incidentTypes } = useQuery({
    queryKey: ["incident-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.incidentType.model },
      }),
  });

  const { data: ppeTypes } = useQuery({
    queryKey: ["ppe-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: {
          model: projectMasterModels.personalProtectiveEquipmentType.model,
        },
      }),
  });

  const { data: ppeConditions } = useQuery({
    queryKey: ["ppe-conditions"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: {
          model: projectMasterModels.personalProtectiveEquipmentCondition.model,
        },
      }),
  });

  const { data: weatherConditionDuringIncidents } = useQuery({
    queryKey: ["weatherConditionDuringIncidents"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: {
          model: projectMasterModels.weatherConditionDuringIncident.model,
        },
      }),
  });

  const { data: injurySeverities } = useQuery({
    queryKey: ["injury-severities"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.injurySeverity.model },
      }),
  });
  console.log("container", formik.errors);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.safety-and-health.details.road-segment")}
          placeholder={transl(
            "project.other.safety-and-health.details.road-segment",
          )}
          name="road_segment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.safety-and-health.details.hazard-type")}
          placeholder={transl(
            "project.other.safety-and-health.details.hazard-type",
          )}
          name="hazard_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            hazardTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.potential-impact",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.potential-impact",
          )}
          name="potential_impact_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            potentialImpacts?.payload.map((impact) => ({
              label: impact.title,
              value: impact.id,
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.safety-and-health.details.risk-level")}
          placeholder={transl(
            "project.other.safety-and-health.details.risk-level",
          )}
          name="risk_level_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            riskLevels?.payload.map((level) => ({
              label: level.title,
              value: level.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.immediate-action-taken",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.immediate-action-taken",
          )}
          name="immediate_action_taken"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.incident-type",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.incident-type",
          )}
          name="incident_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            incidentTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomDynamicDatePicker
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.incident-time",
          )}
          name="incident_time"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="incident_time" />}
        />

        <CustomSwitch
          label={transl(
            "project.other.safety-and-health.details.medicare-required",
          )}
          name="medicare_required"
          checked={formik.values.medicare_required || false}
          onChange={formik.handleChange}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.total-injury-number",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.total-injury-number",
          )}
          name="total_injury_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.incident-reported-by",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.incident-reported-by",
          )}
          name="incident_reported_by"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.safety-and-health.details.ppe-type")}
          placeholder={transl(
            "project.other.safety-and-health.details.ppe-type",
          )}
          name="personal_protective_equipment_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            ppeTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.ppe-condition",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.ppe-condition",
          )}
          name="personal_protective_equipment_condition_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            ppeConditions?.payload.map((condition) => ({
              label: condition.title,
              value: condition.id,
            })) || []
          }
        />
        <CustomSwitch
          label={transl(
            "project.other.safety-and-health.details.trained-on-equipment-usage",
          )}
          name="trained_on_equipment_usage"
          checked={formik.values.trained_on_equipment_usage}
          onChange={formik.handleChange}
        />
        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.training-hours",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.training-hours",
          )}
          name="training_hours_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.weather-condition",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.weather-condition",
          )}
          name="weather_condition_during_incident_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            weatherConditionDuringIncidents?.payload.map((condition) => ({
              label: condition.title,
              value: condition.id,
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.injury-severity",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.injury-severity",
          )}
          name="injury_severity_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            injurySeverities?.payload.map((severity) => ({
              label: severity.title,
              value: severity.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.fatality-number",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.fatality-number",
          )}
          name="fatality_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.safety-and-health.details.recommendation",
          )}
          placeholder={transl(
            "project.other.safety-and-health.details.recommendation",
          )}
          name="recommendation"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.safety-and-health.details.remark")}
          placeholder={transl("project.other.safety-and-health.details.remark")}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload
          label={transl("common.form.file-upload")}
          file={file}
          onFileChange={onFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default SafetyAndHealthForm;
