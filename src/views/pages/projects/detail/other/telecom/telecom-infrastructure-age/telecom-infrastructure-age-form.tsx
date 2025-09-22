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
import type { TelecomInfrastructureAge } from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface TelecomInfrastructureAgeFormProps {
  formik: FormikProps<TelecomInfrastructureAge>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const TelecomInfrastructureAgeForm: React.FC<
  TelecomInfrastructureAgeFormProps
> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.telecom-infrastructure-age.infrastructure-components",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.cables || false}
                  onChange={(e) =>
                    formik.setFieldValue("cables", e.target.checked)
                  }
                  name="cables"
                />
              }
              label={transl(
                "project.other.telecom-infrastructure-age.details.cables",
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.wires || false}
                  onChange={(e) =>
                    formik.setFieldValue("wires", e.target.checked)
                  }
                  name="wires"
                />
              }
              label={transl(
                "project.other.telecom-infrastructure-age.details.wires",
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.routers || false}
                  onChange={(e) =>
                    formik.setFieldValue("routers", e.target.checked)
                  }
                  name="routers"
                />
              }
              label={transl(
                "project.other.telecom-infrastructure-age.details.routers",
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.switches || false}
                  onChange={(e) =>
                    formik.setFieldValue("switches", e.target.checked)
                  }
                  name="switches"
                />
              }
              label={transl(
                "project.other.telecom-infrastructure-age.details.switches",
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.hubs || false}
                  onChange={(e) =>
                    formik.setFieldValue("hubs", e.target.checked)
                  }
                  name="hubs"
                />
              }
              label={transl(
                "project.other.telecom-infrastructure-age.details.hubs",
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.repeaters || false}
                  onChange={(e) =>
                    formik.setFieldValue("repeaters", e.target.checked)
                  }
                  name="repeaters"
                />
              }
              label={transl(
                "project.other.telecom-infrastructure-age.details.repeaters",
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.antennas || false}
                  onChange={(e) =>
                    formik.setFieldValue("antennas", e.target.checked)
                  }
                  name="antennas"
                />
              }
              label={transl(
                "project.other.telecom-infrastructure-age.details.antennas",
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.towers || false}
                  onChange={(e) =>
                    formik.setFieldValue("towers", e.target.checked)
                  }
                  name="towers"
                />
              }
              label={transl(
                "project.other.telecom-infrastructure-age.details.towers",
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />
        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.telecom-infrastructure-age.details.remark",
          )}
          placeholder={transl(
            "project.other.telecom-infrastructure-age.details.remark",
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

export default TelecomInfrastructureAgeForm;
