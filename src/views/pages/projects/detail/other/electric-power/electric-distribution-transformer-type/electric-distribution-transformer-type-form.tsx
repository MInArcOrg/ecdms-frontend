"use client";

import {
  Grid,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type {
  ElectricDistributionTransformerType,
  MiniGridStation,
} from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomSelect from "src/views/shared/form/custom-select";

interface ElectricDistributionTransformerTypeFormProps {
  formik: FormikProps<ElectricDistributionTransformerType>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  miniGridStations: MiniGridStation[];
  transformerTypes: any[];
  protectionInstalled: any[];
  safetyProblemsEncountered: any[];
}

const ElectricDistributionTransformerTypeForm: React.FC<
  ElectricDistributionTransformerTypeFormProps
> = ({
  formik,
  file,
  onFileChange,
  miniGridStations,
  transformerTypes,
  protectionInstalled,
  safetyProblemsEncountered,
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.electric-distribution-transformer-type.general-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-distribution-transformer-type.details.mini-grid-station-id",
              )}
              name="mini_grid_station_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                miniGridStations?.map((station: MiniGridStation) => ({
                  label: station.name,
                  value: station.id,
                })) || []
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
                "project.other.electric-distribution-transformer-type.details.name",
              )}
              placeholder={transl(
                "project.other.electric-distribution-transformer-type.details.name",
              )}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-distribution-transformer-type.technical-specifications",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-distribution-transformer-type.details.transformer-type-id",
              )}
              name="transformer_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                transformerTypes?.map((type: any) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-distribution-transformer-type.details.cooling-type",
              )}
              name="cooling_type"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: "Oil Immersed", value: "Oil Immersed" },
                { label: "Dry type", value: "Dry type" },
              ]}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-distribution-transformer-type.details.transformer-power-rating",
              )}
              placeholder={transl(
                "project.other.electric-distribution-transformer-type.details.transformer-power-rating",
              )}
              name="transformer_power_rating"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.kva")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-distribution-transformer-type.details.lifetime",
              )}
              placeholder={transl(
                "project.other.electric-distribution-transformer-type.details.lifetime",
              )}
              name="lifetime"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.years")}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-distribution-transformer-type.safety-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-distribution-transformer-type.details.protection-installed-id",
              )}
              name="protection_installed_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                protectionInstalled?.map((protection: any) => ({
                  label: protection.title,
                  value: protection.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-distribution-transformer-type.details.safety-problems-encountered-id",
              )}
              name="safety_problems_encountered_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                safetyProblemsEncountered?.map((problem: any) => ({
                  label: problem.title,
                  value: problem.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-distribution-transformer-type.details.work-accidents-number",
              )}
              placeholder={transl(
                "project.other.electric-distribution-transformer-type.details.work-accidents-number",
              )}
              name="work_accidents_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formik.values.on_site_safety_regulation_implemented || false
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "on_site_safety_regulation_implemented",
                      e.target.checked,
                    );
                  }}
                  name="on_site_safety_regulation_implemented"
                />
              }
              label={transl(
                "project.other.electric-distribution-transformer-type.details.on-site-safety-regulation-implemented",
              )}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-distribution-transformer-type.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.electric-distribution-transformer-type.details.remark",
          )}
          placeholder={transl(
            "project.other.electric-distribution-transformer-type.details.remark",
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

export default ElectricDistributionTransformerTypeForm;
