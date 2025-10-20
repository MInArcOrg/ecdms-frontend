import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformLayout, RailwayStationPlatformPassengerFlowAndCapacity } from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayStationPlatformPassengerFlowAndCapacityFormProps {
  formik: FormikProps<RailwayStationPlatformPassengerFlowAndCapacity>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayStationPlatformPassengerFlowAndCapacityForm: React.FC<
  RailwayStationPlatformPassengerFlowAndCapacityFormProps
> = ({ formik, defaultFile, onDefaultFileChange }) => {
  const { t } = useTranslation();

  const { data: platformIdentifications } = useQuery({
    queryKey: ["platform-identifications"],
    queryFn: () =>
      projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig()),
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t(
            "project.other.railway-station-platform-passenger-flow-and-capacity.details.railway_station_platform_layout_id",
          )}
          name="railway_station_platform_layout_id"
          options={platformIdentifications?.payload.map(
            (item) => ({
              label: item.name,
              value: item.id,
            }),
          ) || []}
          value={formik.values.railway_station_platform_layout_id}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-passenger-flow-and-capacity.details.passenger_flow_during_peak_hour",
          )}
          placeholder='e.g. "1200 passengers/hour"'
          name="passenger_flow_during_peak_hour"
          value={formik.values.passenger_flow_during_peak_hour}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-passenger-flow-and-capacity.details.minimum_passenger_flow",
          )}
          placeholder='e.g. "150 passengers/hour"'
          name="minimum_passenger_flow"
          value={formik.values.minimum_passenger_flow}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-passenger-flow-and-capacity.details.capacity_assessment",
          )}
          placeholder='e.g. "Adequate" or "Needs improvement"'
          name="capacity_assessment"
          value={formik.values.capacity_assessment}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-passenger-flow-and-capacity.details.remark",
          )}
          placeholder={t("common.form.remark-placeholder")}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload
          label={t(
            "common.form.file-upload",
          )}
          file={defaultFile}
          onFileChange={onDefaultFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayStationPlatformPassengerFlowAndCapacityForm;