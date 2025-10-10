import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayVehicleIdentification, RailwayVehicleSafetyAndCompliance } from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomSwitch from "src/views/shared/form/custom-switch";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayVehicleSafetyAndComplianceFormProps {
  formik: FormikProps<RailwayVehicleSafetyAndCompliance>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayVehicleSafetyAndComplianceForm: React.FC<
  RailwayVehicleSafetyAndComplianceFormProps
> = ({ formik, defaultFile, onDefaultFileChange }) => {
  const { t } = useTranslation();
  const { data: vehicleIdentifications } = useQuery({
    queryKey: ["vehicle-identifications"],
    queryFn: () =>
      projectOtherApiSecondService<RailwayVehicleIdentification>().getAll('railway-vehicle-identifications', dropDownConfig()),
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t(
            "project.other.railway-vehicle-safety-and-compliance.details.railway_vehicle_identification_id",
          )}
          name="railway_vehicle_identification_id"
          options={vehicleIdentifications?.payload.map(
            (item) => ({
              label: item.vehicle_type + " - " + item.manufacturer_supplier_name + " - " + item.manufacture_year,
              value: item.id,
            }),
          ) || []}
          value={formik.values.railway_vehicle_identification_id}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-safety-and-compliance.details.safety_features_and_systems",
          )}
          placeholder="e.g. PTC, ATP, emergency brakes"
          name="safety_features_and_systems"
          value={formik.values.safety_features_and_systems}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomSwitch
          label={t(
            "project.other.railway-vehicle-safety-and-compliance.details.comply_with_regulatory_standards_and_certifications",
          )}
          name="comply_with_regulatory_standards_and_certifications"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-safety-and-compliance.details.incident_records_number",
          )}
          placeholder="Total number of incidents"
          name="incident_records_number"
          value={formik.values.incident_records_number}
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-safety-and-compliance.details.action_taken_to_accidents",
          )}
          placeholder="Summary of post-incident actions"
          name="action_taken_to_accidents"
          value={formik.values.action_taken_to_accidents}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-safety-and-compliance.details.remark",
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
          label={t("common.form.file-upload")}
          file={defaultFile}
          onFileChange={onDefaultFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayVehicleSafetyAndComplianceForm;