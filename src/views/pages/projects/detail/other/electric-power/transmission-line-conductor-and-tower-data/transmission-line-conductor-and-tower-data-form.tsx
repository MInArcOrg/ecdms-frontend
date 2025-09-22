"use client";

import { Grid, Typography, Divider } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type {
  TransmissionLineConductorAndTowerData,
  TransmissionLine,
} from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomSelect from "src/views/shared/form/custom-select";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface TransmissionLineConductorAndTowerDataFormProps {
  formik: FormikProps<TransmissionLineConductorAndTowerData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  transmissionLines: TransmissionLine[];
}

const TransmissionLineConductorAndTowerDataForm: React.FC<
  TransmissionLineConductorAndTowerDataFormProps
> = ({ formik, file, onFileChange, transmissionLines }) => {
  const { t: transl } = useTranslation();

  // Fetch conductor code names for dropdown
  const { data: conductorCodeNames } = useQuery({
    queryKey: ["conductor-code-names"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.conductorCodeName.model },
      }),
  });

  // Fetch tower types for dropdown
  const { data: towerTypes } = useQuery({
    queryKey: ["tower-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.towerType.model },
      }),
  });

  // Fetch tower foundation types for dropdown
  const { data: towerFoundationTypes } = useQuery({
    queryKey: ["tower-foundation-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.towerFoundationType.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.transmission-line-conductor-and-tower-data.general-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.transmission-line-id",
              )}
              name="transmission_line_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                transmissionLines?.map((line: any) => ({
                  label: line.name,
                  value: line.id,
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
                "project.other.transmission-line-conductor-and-tower-data.details.name",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.name",
              )}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.transmission-line-conductor-and-tower-data.conductor-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductor-type",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductor-type",
              )}
              name="conductor_type"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductor-code-name-id",
              )}
              name="conductor_code_name_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                conductorCodeNames?.payload.map((type) => ({
                  label: type.title,
                  value: type.id,
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
                "project.other.transmission-line-conductor-and-tower-data.details.strands-number",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.strands-number",
              )}
              name="strands_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductor-size",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductor-size",
              )}
              name="conductor_size"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.mm2")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductors-per-phase-number",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductors-per-phase-number",
              )}
              name="conductors_per_phase_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductor-diameter",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.conductor-diameter",
              )}
              name="conductor_diameter"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.mm")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.each-strand-diameter",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.each-strand-diameter",
              )}
              name="each_strand_diameter"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.mm")}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.transmission-line-conductor-and-tower-data.tower-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.tower-type-id",
              )}
              name="tower_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                towerTypes?.payload.map((type: any) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.tower-height",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.tower-height",
              )}
              name="tower_height"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.meters")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.tower-foundation-type-id",
              )}
              name="tower_foundation_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                towerFoundationTypes?.payload.map((type: any) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.transmission-line-conductor-and-tower-data.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.other-equipment",
              )}
              placeholder={transl(
                "project.other.transmission-line-conductor-and-tower-data.details.other-equipment",
              )}
              name="other_equipment"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.transmission-line-conductor-and-tower-data.details.remark",
          )}
          placeholder={transl(
            "project.other.transmission-line-conductor-and-tower-data.details.remark",
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

export default TransmissionLineConductorAndTowerDataForm;
