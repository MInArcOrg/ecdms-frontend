"use client";

import {
  Grid,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import type { ReliabilityAndMaintenance } from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface ReliabilityAndMaintenanceFormProps {
  formik: FormikProps<ReliabilityAndMaintenance>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ReliabilityAndMaintenanceForm: React.FC<
  ReliabilityAndMaintenanceFormProps
> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: maintenanceFrequencies } = useQuery({
    queryKey: ["maintenance-frequencies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceFrequency.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.reliability-and-maintenance.maintenance-details",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.reliability-and-maintenance.details.maintenance-frequency",
              )}
              placeholder={transl(
                "project.other.reliability-and-maintenance.details.maintenance-frequency",
              )}
              name="maintenance_frequency_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                maintenanceFrequencies?.payload.map((frequency) => ({
                  label: frequency.title,
                  value: frequency.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.reliability-and-maintenance.reliability-metrics",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.reliability-and-maintenance.details.total-outage-duration",
              )}
              placeholder={transl(
                "project.other.reliability-and-maintenance.details.total-outage-duration",
              )}
              name="total_outage_duration"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.hours")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.reliability-and-maintenance.details.total-interruption-number",
              )}
              placeholder={transl(
                "project.other.reliability-and-maintenance.details.total-interruption-number",
              )}
              name="total_interruption_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.reliability-and-maintenance.details.saidi",
              )}
              placeholder={transl(
                "project.other.reliability-and-maintenance.details.saidi",
              )}
              name="saidi"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.reliability-and-maintenance.details.saifi",
              )}
              placeholder={transl(
                "project.other.reliability-and-maintenance.details.saifi",
              )}
              name="saifi"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    formik.values
                      .automatic_fault_detection_restoration_system_installed ||
                    false
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "automatic_fault_detection_restoration_system_installed",
                      e.target.checked,
                    );
                  }}
                  name="automatic_fault_detection_restoration_system_installed"
                />
              }
              label={transl(
                "project.other.reliability-and-maintenance.details.automatic-fault-detection",
              )}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.reliability-and-maintenance.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.reliability-and-maintenance.details.remark",
          )}
          placeholder={transl(
            "project.other.reliability-and-maintenance.details.remark",
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

export default ReliabilityAndMaintenanceForm;
