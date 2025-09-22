"use client";

import { Grid, Typography, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import type { Dam } from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface DamFormProps {
  formik: FormikProps<Dam>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const DamForm: React.FC<DamFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: damTypes } = useQuery({
    queryKey: ["dam-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.damType.model },
      }),
  });

  const { data: spillwayTypes } = useQuery({
    queryKey: ["spillway-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.spillwayType.model },
      }),
  });

  const { data: turbineTypes } = useQuery({
    queryKey: ["turbine-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.turbineType.model },
      }),
  });

  const { data: generatorTypes } = useQuery({
    queryKey: ["generator-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.generatorType.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.dam.dam-details")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl("project.other.dam.details.dam-type")}
              placeholder={transl("project.other.dam.details.dam-type")}
              name="dam_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                damTypes?.payload.map((type) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.dam.details.dam-height")}
              placeholder={transl("project.other.dam.details.dam-height")}
              name="dam_height"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.meters")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl("project.other.dam.details.spillway-type")}
              placeholder={transl("project.other.dam.details.spillway-type")}
              name="spillway_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                spillwayTypes?.payload.map((type) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.dam.details.penstock-length")}
              placeholder={transl("project.other.dam.details.penstock-length")}
              name="penstock_length"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.meters")}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.dam.turbine-generator-details")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl("project.other.dam.details.turbine-type")}
              placeholder={transl("project.other.dam.details.turbine-type")}
              name="turbine_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                turbineTypes?.payload.map((type) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.dam.details.turbine-number")}
              placeholder={transl("project.other.dam.details.turbine-number")}
              name="turbine_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl("project.other.dam.details.generator-type")}
              placeholder={transl("project.other.dam.details.generator-type")}
              name="generator_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                generatorTypes?.payload.map((type) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.dam.details.generator-number")}
              placeholder={transl("project.other.dam.details.generator-number")}
              name="generator_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.dam.additional-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.dam.details.national-priority-rank")}
              placeholder={transl(
                "project.other.dam.details.national-priority-rank",
              )}
              name="national_priority_rank"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.dam.details.remark")}
          placeholder={transl("project.other.dam.details.remark")}
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

export default DamForm;
