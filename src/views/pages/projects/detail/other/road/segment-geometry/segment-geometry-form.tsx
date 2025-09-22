"use client";

import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import type { SegmentGeometry } from "src/types/project/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomSwitch from "src/views/shared/form/custom-switch";

interface SegmentGeometryFormProps {
  formik: FormikProps<SegmentGeometry>;
}

const SegmentGeometryForm: React.FC<SegmentGeometryFormProps> = ({
  formik,
}) => {
  const { t: transl } = useTranslation();

  const { data: crossSectionTypes } = useQuery({
    queryKey: ["cross-section-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.crossSectionType.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.segment-geometry.details.name")}
          placeholder={transl("project.other.segment-geometry.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl(
            "project.other.segment-geometry.details.cross-section-type",
          )}
          placeholder={transl(
            "project.other.segment-geometry.details.cross-section-type",
          )}
          name="cross_section_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            crossSectionTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.segment-geometry.details.carriage-way-width",
          )}
          placeholder={transl(
            "project.other.segment-geometry.details.carriage-way-width",
          )}
          name="carriage_way_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.segment-geometry.details.lane-width")}
          placeholder={transl(
            "project.other.segment-geometry.details.lane-width",
          )}
          name="lane_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.segment-geometry.details.shoulder-width",
          )}
          placeholder={transl(
            "project.other.segment-geometry.details.shoulder-width",
          )}
          name="shoulder_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.segment-geometry.details.grade-percentage",
          )}
          placeholder={transl(
            "project.other.segment-geometry.details.grade-percentage",
          )}
          name="grade_percentage"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.segment-geometry.details.elevation-change",
          )}
          placeholder={transl(
            "project.other.segment-geometry.details.elevation-change",
          )}
          name="elevation_change"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.segment-geometry.details.cross-slope-percentage",
          )}
          placeholder={transl(
            "project.other.segment-geometry.details.cross-slope-percentage",
          )}
          name="cross_slope_percentage"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          label={transl(
            "project.other.segment-geometry.details.property-access-control",
          )}
          name="property_access_control"
          sx={{ mb: 2 }}
        />
        <CustomSwitch
          label={transl(
            "project.other.segment-geometry.details.similar-for-all-lane",
          )}
          name="similar_for_all_lane"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default SegmentGeometryForm;
