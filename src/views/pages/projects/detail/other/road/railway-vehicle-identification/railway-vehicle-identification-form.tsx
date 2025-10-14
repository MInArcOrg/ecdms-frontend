import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { RailwayVehicleIdentification } from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayVehicleIdentificationFormProps {
  formik: FormikProps<RailwayVehicleIdentification>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayVehicleIdentificationForm: React.FC<
  RailwayVehicleIdentificationFormProps
> = ({ formik, defaultFile, onDefaultFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-identification.details.vehicle_identification_number",
          )}
          placeholder={t(
            "project.other.railway-vehicle-identification.details.vehicle_identification_number",
          )}
          name="vehicle_identification_number"
          value={formik.values.vehicle_identification_number}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-identification.details.vehicle_type",
          )}
          placeholder={t(
            "project.other.railway-vehicle-identification.details.vehicle_type",
          )}
          name="vehicle_type"
          value={formik.values.vehicle_type}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-identification.details.manufacturer_supplier_name",
          )}
          placeholder={t(
            "project.other.railway-vehicle-identification.details.manufacturer_supplier_name",
          )}
          name="manufacturer_supplier_name"
          value={formik.values.manufacturer_supplier_name}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-identification.details.manufacturer_supplier_address",
          )}
          placeholder={t(
            "project.other.railway-vehicle-identification.details.manufacturer_supplier_address",
          )}
          name="manufacturer_supplier_address"
          value={formik.values.manufacturer_supplier_address}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-identification.details.manufacture_year",
          )}
          placeholder="e.g. 2023"
          name="manufacture_year"
          value={formik.values.manufacture_year}
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-identification.details.ownership_or_leasing_details",
          )}
          placeholder={t(
            "project.other.railway-vehicle-identification.details.ownership_or_leasing_details",
          )}
          name="ownership_or_leasing_details"
          value={formik.values.ownership_or_leasing_details}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-vehicle-identification.details.remark",
          )}
          placeholder={t(
            "project.other.railway-vehicle-identification.details.remark",
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
          label={t("common.form.technical-document-upload")}
          file={defaultFile}
          onFileChange={onDefaultFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayVehicleIdentificationForm;