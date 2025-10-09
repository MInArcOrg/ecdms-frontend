import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayVehicleIdentification, RailwayVehicleOperationalPerformance } from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayVehicleOperationalPerformanceFormProps {
  formik: FormikProps<RailwayVehicleOperationalPerformance>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayVehicleOperationalPerformanceForm: React.FC<
  RailwayVehicleOperationalPerformanceFormProps
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
            "project.other.railway-vehicle-operational-performance.details.railway_vehicle_identification_id",
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
            "project.other.railway-vehicle-operational-performance.details.fuel_or_energy_consumption",
          )}
          placeholder={t(
            "project.other.railway-vehicle-operational-performance.details.fuel_or_energy_consumption",
          )} name="fuel_or_energy_consumption"
          value={formik.values.fuel_or_energy_consumption}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-operational-performance.details.mileage_or_operating_hours",
          )}
          placeholder={t(
            "project.other.railway-vehicle-operational-performance.details.mileage_or_operating_hours",
          )}
          name="mileage_or_operating_hours"
          value={formik.values.mileage_or_operating_hours}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-operational-performance.details.reliability_and_availability",
          )}
          placeholder={t(
            "project.other.railway-vehicle-operational-performance.details.reliability_and_availability",
          )} name="reliability_and_availability"
          value={formik.values.reliability_and_availability}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-operational-performance.details.performance_indicators",
          )}
          placeholder={t(
            "project.other.railway-vehicle-operational-performance.details.performance_indicators",
          )} name="performance_indicators"
          value={formik.values.performance_indicators}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-operational-performance.details.remark",
          )}
          placeholder={t(
            "project.other.railway-vehicle-operational-performance.details.remark",
          )}
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

export default RailwayVehicleOperationalPerformanceForm;