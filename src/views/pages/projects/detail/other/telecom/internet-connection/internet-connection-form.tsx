"use client";

import {
  Grid,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import type { InternetConnection } from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface InternetConnectionFormProps {
  formik: FormikProps<InternetConnection>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const InternetConnectionForm: React.FC<InternetConnectionFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();

  const { data: internetConnectionTypes } = useQuery({
    queryKey: ["internet-connection-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.internetConnectionType.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl(
            "project.other.internet-connection.details.internet-connection-type",
          )}
          placeholder={transl(
            "project.other.internet-connection.details.internet-connection-type",
          )}
          name="internet_connection_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            internetConnectionTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.internet-connection.connection-components")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

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
                "project.other.internet-connection.details.routers",
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
                "project.other.internet-connection.details.switches",
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.modems || false}
                  onChange={(e) =>
                    formik.setFieldValue("modems", e.target.checked)
                  }
                  name="modems"
                />
              }
              label={transl("project.other.internet-connection.details.modems")}
            />
          </Grid>
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
              label={transl("project.other.internet-connection.details.cables")}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.internet-connection.details.others")}
          placeholder={transl(
            "project.other.internet-connection.details.others",
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

export default InternetConnectionForm;
