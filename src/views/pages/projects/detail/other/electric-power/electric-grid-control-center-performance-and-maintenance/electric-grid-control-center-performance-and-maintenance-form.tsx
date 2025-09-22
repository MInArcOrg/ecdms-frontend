"use client";

import { Grid, Typography, Divider } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type {
  ElectricGridControlCenterPerformanceAndMaintenance,
  ElectricGridControlCenterData,
} from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomSelect from "src/views/shared/form/custom-select";

interface ElectricGridControlCenterPerformanceAndMaintenanceFormProps {
  formik: FormikProps<ElectricGridControlCenterPerformanceAndMaintenance>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  electricGridControlCenterData: ElectricGridControlCenterData[];
  maintenanceFrequencies: any[];
}

const ElectricGridControlCenterPerformanceAndMaintenanceForm: React.FC<
  ElectricGridControlCenterPerformanceAndMaintenanceFormProps
> = ({
  formik,
  file,
  onFileChange,
  electricGridControlCenterData,
  maintenanceFrequencies,
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.electric-grid-control-center-performance-and-maintenance.general-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.electric-grid-control-center-data-id",
              )}
              name="electric_grid_control_center_data_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                electricGridControlCenterData?.map(
                  (data: ElectricGridControlCenterData) => ({
                    label: data.name,
                    value: data.id,
                  }),
                ) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              required
              label={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.name",
              )}
              placeholder={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.name",
              )}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.maintenance-frequency-id",
              )}
              name="maintenance_frequency_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                maintenanceFrequencies?.map((frequency: any) => ({
                  label: frequency.title,
                  value: frequency.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-grid-control-center-performance-and-maintenance.performance-metrics",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.total-system-downtime-outage-duration",
              )}
              placeholder={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.total-system-downtime-outage-duration",
              )}
              name="total_system_downtime_outage_duration"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.total-interruptions-number",
              )}
              placeholder={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.total-interruptions-number",
              )}
              name="total_interruptions_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.saidi",
              )}
              placeholder={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.saidi",
              )}
              name="saidi"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.saifi",
              )}
              placeholder={transl(
                "project.other.electric-grid-control-center-performance-and-maintenance.details.saifi",
              )}
              name="saifi"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-grid-control-center-performance-and-maintenance.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.electric-grid-control-center-performance-and-maintenance.details.remark",
          )}
          placeholder={transl(
            "project.other.electric-grid-control-center-performance-and-maintenance.details.remark",
          )}
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

export default ElectricGridControlCenterPerformanceAndMaintenanceForm;
