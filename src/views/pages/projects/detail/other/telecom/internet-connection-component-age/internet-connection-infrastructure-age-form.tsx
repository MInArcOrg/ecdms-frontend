import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import {
  InternetConnection,
  InternetConnectionInfrastructureAge,
} from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface InternetConnectionInfrastructureAgeFormProps {
  formik: FormikProps<InternetConnectionInfrastructureAge>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const InternetConnectionInfrastructureAgeForm: React.FC<
  InternetConnectionInfrastructureAgeFormProps
> = ({ projectId, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: internetConnections } = useQuery({
    queryKey: ["internet-connections"],
    queryFn: () =>
      projectOtherApiSecondService<InternetConnection>().getAll(
        "internet-connections",
        dropDownConfig({
          filter: {
            project_id: projectId,
          },
        }),
      ),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl(
            "project.other.internet-connection-infrastructure-age.details.internet-connection-id",
          )}
          placeholder={transl(
            "project.other.internet-connection-infrastructure-age.details.internet-connection-id",
          )}
          name="internet_connection_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            internetConnections?.payload.map((connection) => ({
              label: connection.internetConnectionType?.title,
              value: connection.id,
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.internet-connection-infrastructure-age.details.routers",
              )}
              placeholder={transl(
                "project.other.internet-connection-infrastructure-age.details.routers",
              )}
              name="routers"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.internet-connection-infrastructure-age.details.switches",
              )}
              placeholder={transl(
                "project.other.internet-connection-infrastructure-age.details.switches",
              )}
              name="switches"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.internet-connection-infrastructure-age.details.modems",
              )}
              placeholder={transl(
                "project.other.internet-connection-infrastructure-age.details.modems",
              )}
              name="modems"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.internet-connection-infrastructure-age.details.cables",
              )}
              placeholder={transl(
                "project.other.internet-connection-infrastructure-age.details.cables",
              )}
              name="cables"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.internet-connection-infrastructure-age.details.others",
          )}
          placeholder={transl(
            "project.other.internet-connection-infrastructure-age.details.others",
          )}
          name="others"
          size="small"
          multiline
          rows={2}
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

export default InternetConnectionInfrastructureAgeForm;
