"use client";

import { Grid, Typography, Divider } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type {
  SatelliteInfrastructureAge,
  SatelliteNetwork,
} from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface SatelliteInfrastructureAgeFormProps {
  formik: FormikProps<SatelliteInfrastructureAge>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  satelliteNetworks: SatelliteNetwork[];
}

const SatelliteInfrastructureAgeForm: React.FC<
  SatelliteInfrastructureAgeFormProps
> = ({ formik, file, onFileChange, satelliteNetworks }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl(
            "project.other.satellite-infrastructure-age.details.satellite-network",
          )}
          placeholder={transl(
            "project.other.satellite-infrastructure-age.details.satellite-network",
          )}
          name="satellite_network_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            satelliteNetworks.map((network) => ({
              label: network.satellite_network_type_id || network.id,
              value: network.id,
            })) || []
          }
        />

        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.satellite-infrastructure-age.infrastructure-age",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.satellite-infrastructure-age.details.satellite",
              )}
              placeholder={transl(
                "project.other.satellite-infrastructure-age.details.satellite",
              )}
              name="satellite"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.satellite-infrastructure-age.details.ground-stations",
              )}
              placeholder={transl(
                "project.other.satellite-infrastructure-age.details.ground-stations",
              )}
              name="ground_stations"
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
                "project.other.satellite-infrastructure-age.details.modems",
              )}
              placeholder={transl(
                "project.other.satellite-infrastructure-age.details.modems",
              )}
              name="modems"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.satellite-infrastructure-age.details.routers",
              )}
              placeholder={transl(
                "project.other.satellite-infrastructure-age.details.routers",
              )}
              name="routers"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.satellite-infrastructure-age.details.others",
          )}
          placeholder={transl(
            "project.other.satellite-infrastructure-age.details.others",
          )}
          name="others"
          size="small"
          multiline
          rows={3}
          sx={{ mt: 2, mb: 2 }}
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

export default SatelliteInfrastructureAgeForm;
