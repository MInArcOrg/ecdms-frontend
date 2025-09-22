"use client";

import { Grid, Typography, Divider } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type {
  MiniGridStationConsumer,
  MiniGridStation,
} from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomSelect from "src/views/shared/form/custom-select";

interface MiniGridStationConsumerFormProps {
  formik: FormikProps<MiniGridStationConsumer>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  miniGridStations: MiniGridStation[];
}

const MiniGridStationConsumerForm: React.FC<
  MiniGridStationConsumerFormProps
> = ({ formik, file, onFileChange, miniGridStations }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.mini-grid-station-consumer.general-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.mini-grid-station-consumer.details.mini-grid-station-id",
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
                "project.other.mini-grid-station-consumer.details.name",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.name",
              )}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.mini-grid-station-consumer.consumer-types")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mini-grid-station-consumer.details.residential",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.residential",
              )}
              name="residential"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mini-grid-station-consumer.details.commercial",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.commercial",
              )}
              name="commercial"
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
                "project.other.mini-grid-station-consumer.details.productive-industrial",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.productive-industrial",
              )}
              name="productive_industrial"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mini-grid-station-consumer.details.health-centers",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.health-centers",
              )}
              name="health_centers"
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
                "project.other.mini-grid-station-consumer.details.schools",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.schools",
              )}
              name="schools"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mini-grid-station-consumer.details.street-lighting",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.street-lighting",
              )}
              name="street_lighting"
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
                "project.other.mini-grid-station-consumer.details.other",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.other",
              )}
              name="other"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.mini-grid-station-consumer.electricity-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mini-grid-station-consumer.details.expected-electricity-sales",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.expected-electricity-sales",
              )}
              name="expected_electricity_sales"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.kwh")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mini-grid-station-consumer.details.electricity-tariff",
              )}
              placeholder={transl(
                "project.other.mini-grid-station-consumer.details.electricity-tariff",
              )}
              name="electricity_tariff"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.currency")}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.mini-grid-station-consumer.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.mini-grid-station-consumer.details.remark",
          )}
          placeholder={transl(
            "project.other.mini-grid-station-consumer.details.remark",
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

export default MiniGridStationConsumerForm;
