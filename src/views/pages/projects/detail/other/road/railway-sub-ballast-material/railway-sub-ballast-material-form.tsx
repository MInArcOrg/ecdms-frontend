import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import CustomTextBox from "src/views/shared/form/custom-text-box";

import {
  RailwaySubBallastMaterial, // Updated import
} from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import { useQuery } from "@tanstack/react-query";
import { dropDownConfig } from "src/configs/api-constants";

interface RailwaySubBallastMaterialFormProps {
  // Updated interface name
  formik: FormikProps<RailwaySubBallastMaterial>; // Updated type
}

const RailwaySubBallastMaterialForm: React.FC<
  RailwaySubBallastMaterialFormProps
> = ({ formik }) => {
  // Updated component name
  const { t } = useTranslation();

  // You would typically fetch these options from an API or define them elsewhere
  const { data: subBallastMaterialTypeOptions } = useQuery({
    queryKey: [projectMasterModels.subBallastMaterialType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.subBallastMaterialType.model,
          },
        }),
      ),
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-sub-ballast-material.details.railway-line-section-name",
          )} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.railway-line-section-name",
          )} // Updated translation key
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* New Field: Sub-ballast Material Type */}
        <CustomSelectBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-sub-ballast-material.details.sub-ballast-material-type-id",
          )} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.sub-ballast-material-type-id",
          )} // Updated translation key
          name="sub_ballast_material_type_id"
          size="small"
          options={
            subBallastMaterialTypeOptions?.payload.map((item) => ({
              value: item.id,
              label: item.title,
            })) || []
          } // Pass your options here
          sx={{ mb: 2 }}
        />

        {/* New Field: Layer Thickness */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-sub-ballast-material.details.layer-thickness",
          )} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.layer-thickness",
          )} // Updated translation key
          name="layer_thickness"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* New Field: Layer Depth */}
        <CustomTextBox
          type="number"
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-sub-ballast-material.details.layer-depth",
          )} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.layer-depth",
          )} // Updated translation key
          name="layer_depth"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* New Field: Density */}
        <CustomTextBox
          type="number"
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-sub-ballast-material.details.density",
          )} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.density",
          )} // Updated translation key
          name="density"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* New Field: Moisture Content */}
        <CustomTextBox
          type="number"
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-sub-ballast-material.details.moisture-content",
          )} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.moisture-content",
          )} // Updated translation key
          name="moisture_content"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* New Field: Method Used for Compaction */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-sub-ballast-material.details.method-used-for-compaction",
          )} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.method-used-for-compaction",
          )} // Updated translation key
          name="method_used_for_compaction"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* New Field: Compaction Density */}
        <CustomTextBox
          type="number"
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-sub-ballast-material.details.compaction-density",
          )} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.compaction-density",
          )} // Updated translation key
          name="compaction_density"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Remark Field */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t("project.other.railway-sub-ballast-material.details.remark")} // Updated translation key
          placeholder={t(
            "project.other.railway-sub-ballast-material.details.remark",
          )} // Updated translation key
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default RailwaySubBallastMaterialForm; // Updated export name
