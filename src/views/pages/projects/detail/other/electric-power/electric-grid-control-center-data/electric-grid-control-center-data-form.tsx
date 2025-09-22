"use client";

import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type {
  ElectricGridControlCenterData,
  MiniGridStation,
} from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface ElectricGridControlCenterDataFormProps {
  formik: FormikProps<ElectricGridControlCenterData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  miniGridStations: MiniGridStation[];
  controlSystemTypes: any[];
  communicationLinks: any[];
}

const ElectricGridControlCenterDataForm: React.FC<
  ElectricGridControlCenterDataFormProps
> = ({
  formik,
  file,
  onFileChange,
  miniGridStations,
  controlSystemTypes,
  communicationLinks,
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.electric-grid-control-center-data.general-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-grid-control-center-data.details.mini-grid-station-id",
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
                "project.other.electric-grid-control-center-data.details.name",
              )}
              placeholder={transl(
                "project.other.electric-grid-control-center-data.details.name",
              )}
              name="name"
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
                "project.other.electric-grid-control-center-data.details.installation-year",
              )}
              placeholder={transl(
                "project.other.electric-grid-control-center-data.details.installation-year",
              )}
              name="installation_year"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-grid-control-center-data.control-system",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-grid-control-center-data.details.control-system-type-id",
              )}
              name="control_system_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                controlSystemTypes?.map((type: any) => ({
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
                "project.other.electric-grid-control-center-data.details.communication-links-id",
              )}
              name="communication_links_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                communicationLinks?.map((link: any) => ({
                  label: link.title,
                  value: link.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-grid-control-center-data.capabilities",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formik.values.energy_management_system_capability || false
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "energy_management_system_capability",
                      e.target.checked,
                    );
                  }}
                  name="energy_management_system_capability"
                />
              }
              label={transl(
                "project.other.electric-grid-control-center-data.details.energy-management-system-capability",
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.remote_control_capability || false}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "remote_control_capability",
                      e.target.checked,
                    );
                  }}
                  name="remote_control_capability"
                />
              }
              label={transl(
                "project.other.electric-grid-control-center-data.details.remote-control-capability",
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-grid-control-center-data.details.average-measured-data-reliability",
              )}
              placeholder={transl(
                "project.other.electric-grid-control-center-data.details.average-measured-data-reliability",
              )}
              name="average_measured_data_reliability"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-grid-control-center-data.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.electric-grid-control-center-data.details.remark",
          )}
          placeholder={transl(
            "project.other.electric-grid-control-center-data.details.remark",
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

export default ElectricGridControlCenterDataForm;
