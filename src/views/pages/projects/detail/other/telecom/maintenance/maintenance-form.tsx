"use client";

import {
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
} from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { Maintenance } from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface MaintenanceFormProps {
  formik: FormikProps<Maintenance>;
  files: {
    maintenanceDocument: File | null;
    infrastructureImage: File | null;
  };
  onFileChange: (fileType: string, file: File | null) => void;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({
  formik,
  files,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.maintenance.maintenance-details")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.maintenance_frequency || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "maintenance_frequency",
                      e.target.checked,
                    )
                  }
                  name="maintenance_frequency"
                />
              }
              label={transl(
                "project.other.maintenance.details.maintenance-frequency",
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.service_level_agreement || false}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "service_level_agreement",
                      e.target.checked,
                    )
                  }
                  name="service_level_agreement"
                />
              }
              label={transl(
                "project.other.maintenance.details.service-level-agreement",
              )}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.maintenance.details.remark")}
          placeholder={transl("project.other.maintenance.details.remark")}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mt: 2, mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.maintenance.file-types.maintenance-document")}
        </Typography>
        <CustomFileUpload
          label={transl("common.form.file-upload")}
          file={files.maintenanceDocument}
          onFileChange={(file) => onFileChange("maintenanceDocument", file)}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.maintenance.file-types.infrastructure-image")}
        </Typography>
        <CustomFileUpload
          label={transl("common.form.file-upload")}
          file={files.infrastructureImage}
          onFileChange={(file) => onFileChange("infrastructureImage", file)}
        />
      </Grid>
    </Grid>
  );
};

export default MaintenanceForm;
