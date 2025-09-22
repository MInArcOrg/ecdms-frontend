import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import { RoadSurfaceCondition } from "src/types/project/other";
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomSwitch from "src/views/shared/form/custom-switch";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RoadSurfaceConditionFormProps {
  formik: FormikProps<RoadSurfaceCondition>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RoadSurfaceConditionForm: React.FC<RoadSurfaceConditionFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();

  const { data: assessmentConditions } = useQuery({
    queryKey: ["assessment-conditions"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.assessmentCondition.model },
      }),
  });

  const { data: surfaceTypes } = useQuery({
    queryKey: ["surface-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.surfaceType.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.road-surface-condition.details.road-segment",
          )}
          placeholder={transl(
            "project.other.road-surface-condition.details.road-segment",
          )}
          name="road_segment"
          size="small"
          sx={{ mb: 2 }}
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <CustomSwitch
              label={transl(
                "project.other.road-surface-condition.details.cracks",
              )}
              name="cracks"
              checked={formik.values.cracks || false}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSwitch
              label={transl(
                "project.other.road-surface-condition.details.rutting",
              )}
              name="rutting"
              checked={formik.values.rutting || false}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSwitch
              label={transl(
                "project.other.road-surface-condition.details.patching",
              )}
              name="patching"
              checked={formik.values.patching || false}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSwitch
              label={transl(
                "project.other.road-surface-condition.details.drainage-problems",
              )}
              name="drainage_problems"
              checked={formik.values.drainage_problems || false}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.road-surface-condition.details.surface-type",
          )}
          placeholder={transl(
            "project.other.road-surface-condition.details.surface-type",
          )}
          name="surface_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            surfaceTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.road-surface-condition.details.assessment-condition",
          )}
          placeholder={transl(
            "project.other.road-surface-condition.details.assessment-condition",
          )}
          name="assessment_condition_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            assessmentConditions?.payload.map((condition) => ({
              label: condition.title,
              value: condition.id,
            })) || []
          }
        />

        <CustomDynamicDatePicker
          fullWidth
          label={transl(
            "project.other.road-surface-condition.details.action-taken-date",
          )}
          name="action_taken_date"
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="action_taken_date" />}
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.road-surface-condition.details.action-taken",
          )}
          placeholder={transl(
            "project.other.road-surface-condition.details.action-taken",
          )}
          name="action_taken"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.road-surface-condition.details.action-taken-cost",
          )}
          placeholder={transl(
            "project.other.road-surface-condition.details.action-taken-cost",
          )}
          name="action_taken_cost"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.road-surface-condition.details.remark")}
          placeholder={transl(
            "project.other.road-surface-condition.details.remark",
          )}
          name="remark"
          size="small"
          multiline
          rows={4}
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

export default RoadSurfaceConditionForm;
