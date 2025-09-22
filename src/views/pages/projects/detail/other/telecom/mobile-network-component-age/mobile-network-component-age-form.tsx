import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import {
  MobileNetwork,
  MobileNetworkComponentAge,
} from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface MobileNetworkComponentAgeFormProps {
  formik: FormikProps<MobileNetworkComponentAge>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const MobileNetworkComponentAgeForm: React.FC<
  MobileNetworkComponentAgeFormProps
> = ({ projectId, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: mobileNetworks } = useQuery({
    queryKey: ["mobile-networks"],
    queryFn: () =>
      projectOtherApiSecondService<MobileNetwork>().getAll(
        "mobile-networks",
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
            "project.other.mobile-network-component-age.details.mobile-network-id",
          )}
          placeholder={transl(
            "project.other.mobile-network-component-age.details.mobile-network-id",
          )}
          name="mobile_network_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            mobileNetworks?.payload.map((network) => ({
              label: network.mobilenetworktype.title,
              value: network.id,
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mobile-network-component-age.details.cell",
              )}
              placeholder={transl(
                "project.other.mobile-network-component-age.details.cell",
              )}
              name="cell"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mobile-network-component-age.details.towers",
              )}
              placeholder={transl(
                "project.other.mobile-network-component-age.details.towers",
              )}
              name="towers"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mobile-network-component-age.details.antennas",
              )}
              placeholder={transl(
                "project.other.mobile-network-component-age.details.antennas",
              )}
              name="antennas"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mobile-network-component-age.details.base-stations",
              )}
              placeholder={transl(
                "project.other.mobile-network-component-age.details.base-stations",
              )}
              name="base_stations"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mobile-network-component-age.details.repeaters",
              )}
              placeholder={transl(
                "project.other.mobile-network-component-age.details.repeaters",
              )}
              name="repeaters"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.mobile-network-component-age.details.switches",
              )}
              placeholder={transl(
                "project.other.mobile-network-component-age.details.switches",
              )}
              name="switches"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.mobile-network-component-age.details.others",
          )}
          placeholder={transl(
            "project.other.mobile-network-component-age.details.others",
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

export default MobileNetworkComponentAgeForm;
