import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { DataCenter, DataCenterComponentAge } from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface DataCenterComponentAgeFormProps {
  formik: FormikProps<DataCenterComponentAge>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: String;
}

const DataCenterComponentAgeForm: React.FC<DataCenterComponentAgeFormProps> = ({
  formik,
  projectId,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();
  const { data: dataCenters } = useQuery({
    queryKey: ["data-centers"],
    queryFn: () =>
      projectOtherApiSecondService<DataCenter>().getAll("data-centers", {
        filter: { project_id: projectId },
      }),
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={transl(
            "project.other.data-center-component-age.details.data-center-id",
          )}
          placeholder={transl(
            "project.other.data-center-component-age.details.data-center-id",
          )}
          name="data_center_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            dataCenters?.payload.map((type) => ({
              label: type?.dataCenterType?.title,
              value: type.id,
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.data-center-component-age.details.servers",
              )}
              placeholder={transl(
                "project.other.data-center-component-age.details.servers",
              )}
              name="servers"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.data-center-component-age.details.storage-devices",
              )}
              placeholder={transl(
                "project.other.data-center-component-age.details.storage-devices",
              )}
              name="storage_devices"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.data-center-component-age.details.networking-equipment",
              )}
              placeholder={transl(
                "project.other.data-center-component-age.details.networking-equipment",
              )}
              name="networking_equipment"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.data-center-component-age.details.cooling-systems",
              )}
              placeholder={transl(
                "project.other.data-center-component-age.details.cooling-systems",
              )}
              name="cooling_systems"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.data-center-component-age.details.backup-generators",
              )}
              placeholder={transl(
                "project.other.data-center-component-age.details.backup-generators",
              )}
              name="backup_generators"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.data-center-component-age.details.others",
          )}
          placeholder={transl(
            "project.other.data-center-component-age.details.others",
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

export default DataCenterComponentAgeForm;
