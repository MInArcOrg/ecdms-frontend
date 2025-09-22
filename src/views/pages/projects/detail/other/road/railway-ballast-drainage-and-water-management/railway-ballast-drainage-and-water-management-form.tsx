import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import CustomTextBox from "src/views/shared/form/custom-text-box";

import {
  RailwayBallastDrainageAndWaterManagement, // Updated type import
} from "src/types/project/other";

interface RailwayBallastDrainageAndWaterManagementFormProps {
  formik: FormikProps<RailwayBallastDrainageAndWaterManagement>;
}

const RailwayBallastDrainageAndWaterManagementForm: React.FC<
  RailwayBallastDrainageAndWaterManagementFormProps
> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-ballast-drainage-and-water-management.details.railway-line-section-name",
          )}
          placeholder={t(
            "project.other.railway-ballast-drainage-and-water-management.details.railway-line-section-name",
          )}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-ballast-drainage-and-water-management.details.drainage-condition-assessment",
          )}
          placeholder={t(
            "project.other.railway-ballast-drainage-and-water-management.details.drainage-condition-assessment",
          )}
          name="drainage_condition_assessment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-type",
          )}
          placeholder={t(
            "project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-type",
          )}
          name="drainage_infrastructure_type"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-ballast-drainage-and-water-management.details.water-management-measures",
          )}
          placeholder={t(
            "project.other.railway-ballast-drainage-and-water-management.details.water-management-measures",
          )}
          name="water_management_measures"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-length",
          )}
          placeholder={t(
            "project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-length",
          )}
          name="drainage_infrastructure_length"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t(
            "project.other.railway-ballast-drainage-and-water-management.details.remark",
          )}
          placeholder={t(
            "project.other.railway-ballast-drainage-and-water-management.details.remark",
          )}
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

export default RailwayBallastDrainageAndWaterManagementForm;
