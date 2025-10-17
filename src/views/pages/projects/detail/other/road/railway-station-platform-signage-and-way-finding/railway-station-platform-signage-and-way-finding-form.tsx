import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformLayout, RailwayStationPlatformSignageAndWayFinding } from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayStationPlatformSignageAndWayFindingFormProps {
  formik: FormikProps<RailwayStationPlatformSignageAndWayFinding>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
  wayFindingFile: File | null;
  onWayFindingFileChange: (file: File | null) => void;
}

const RailwayStationPlatformSignageAndWayFindingForm: React.FC<
  RailwayStationPlatformSignageAndWayFindingFormProps
> = ({
  formik,
  defaultFile,
  onDefaultFileChange,
  wayFindingFile,
  onWayFindingFileChange,
}) => {
    const { t } = useTranslation();
    const { data: platformIdentifications } = useQuery({
      queryKey: ["platform-identifications"],
      queryFn: () =>
        projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig()),
    });
    return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <CustomSelectBox
            fullWidth
            required
            label={t(
              "project.other.railway-station-platform-signage-and-way-finding.details.railway_station_platform_layout_id",
            )}
            name="railway_station_platform_layout_id"
            options={platformIdentifications?.payload.map(
              (item) => ({
                label: item.name,
                value: item.id,
              }),
            ) || []}
            value={formik.values.railway_station_platform_layout_id}
            size="small"
            sx={{ mb: 2 }}
          />


          <CustomTextBox
            fullWidth
            label={t(
              "project.other.railway-station-platform-signage-and-way-finding.details.signage_type_and_placement",
            )}
            placeholder="e.g. Overhead, Platform edge, Directional"
            name="signage_type_and_placement"
            value={formik.values.signage_type_and_placement}
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomTextBox
            fullWidth
            label={t(
              "project.other.railway-station-platform-signage-and-way-finding.details.accessibility_signage",
            )}
            placeholder="e.g. Tactile maps, Braille signs, High-contrast text"
            name="accessibility_signage"
            value={formik.values.accessibility_signage}
            size="small"
            sx={{ mb: 2 }}
          />

          <CustomTextBox
            fullWidth
            label={t(
              "project.other.railway-station-platform-signage-and-way-finding.details.remark",
            )}
            placeholder={t("project.other.railway-station-platform-signage-and-way-finding.details.remark")}
            name="remark"
            value={formik.values.remark}
            size="small"
            sx={{ mb: 2 }}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFileUpload
            label={t("common.form.file-upload")}
            file={defaultFile}
            onFileChange={onDefaultFileChange}
          />
          <CustomFileUpload
            label={t("project.other.railway-station-platform-signage-and-way-finding.details.way-finding-aid-document-upload")}
            file={wayFindingFile}
            onFileChange={onWayFindingFileChange}
          />
        </Grid>
      </Grid>
    );
  };

export default RailwayStationPlatformSignageAndWayFindingForm;