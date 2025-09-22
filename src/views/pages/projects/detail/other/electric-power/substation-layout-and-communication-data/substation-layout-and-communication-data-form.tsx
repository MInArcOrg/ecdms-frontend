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
import type { SubstationLayoutAndCommunicationData } from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomSelect from "src/views/shared/form/custom-select";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface SubstationLayoutAndCommunicationDataFormProps {
  formik: FormikProps<SubstationLayoutAndCommunicationData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  substations: any[];
}

const SubstationLayoutAndCommunicationDataForm: React.FC<
  SubstationLayoutAndCommunicationDataFormProps
> = ({ formik, file, onFileChange, substations }) => {
  const { t: transl } = useTranslation();

  // Fetch communication systems for dropdown
  const { data: communicationSystems } = useQuery({
    queryKey: ["communication-systems"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: {
          model: projectMasterModels.substationCommunicationSystem.model,
        },
      }),
  });

  // Fetch grounding systems for dropdown
  const { data: groundingSystems } = useQuery({
    queryKey: ["grounding-systems"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.substationGroundingSystem.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.substation-layout-and-communication-data.general-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.substation-layout-and-communication-data.details.substation-id",
              )}
              name="substation_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                substations?.map((substation: any) => ({
                  label: substation.name,
                  value: substation.id,
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
                "project.other.substation-layout-and-communication-data.details.name",
              )}
              placeholder={transl(
                "project.other.substation-layout-and-communication-data.details.name",
              )}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.substation-layout-and-communication-data.layout-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.substation-layout-and-communication-data.details.substation-layout",
              )}
              placeholder={transl(
                "project.other.substation-layout-and-communication-data.details.substation-layout",
              )}
              name="substation_layout"
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
                "project.other.substation-layout-and-communication-data.details.equipped-with-standby-diesel-generator",
              )}
              placeholder={transl(
                "project.other.substation-layout-and-communication-data.details.equipped-with-standby-diesel-generator",
              )}
              name="equipped_with_standby_diesel_generator"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.substation-layout-and-communication-data.details.substation-busbar-type",
              )}
              placeholder={transl(
                "project.other.substation-layout-and-communication-data.details.substation-busbar-type",
              )}
              name="substation_busbar_type"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.substation-layout-and-communication-data.communication-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.substation-layout-and-communication-data.details.substation-communication-system-id",
              )}
              name="substation_communication_system_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                communicationSystems?.payload.map((system: any) => ({
                  label: system.title,
                  value: system.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.substation-layout-and-communication-data.details.substation-grounding-system-id",
              )}
              name="substation_grounding_system_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                groundingSystems?.payload.map((system: any) => ({
                  label: system.title,
                  value: system.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.scada_system || false}
                  onChange={(e) =>
                    formik.setFieldValue("scada_system", e.target.checked)
                  }
                  name="scada_system"
                />
              }
              label={transl(
                "project.other.substation-layout-and-communication-data.details.scada-system",
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.substation-layout-and-communication-data.details.substation-altitude-level",
              )}
              placeholder={transl(
                "project.other.substation-layout-and-communication-data.details.substation-altitude-level",
              )}
              name="substation_altitude_level"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.meters")}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.substation-layout-and-communication-data.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.substation-layout-and-communication-data.details.remark",
          )}
          placeholder={transl(
            "project.other.substation-layout-and-communication-data.details.remark",
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

export default SubstationLayoutAndCommunicationDataForm;
