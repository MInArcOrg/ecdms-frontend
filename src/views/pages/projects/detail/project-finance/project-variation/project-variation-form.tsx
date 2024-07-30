import { Grid } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "src/configs/i18n";
import { ProjectVariation } from "src/types/project/project-finance";
import { getDynamicDate } from "src/views/components/custom/ethio-calendar/ethio-calendar-utils";
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface ProjectVariationFormProps {
  formik: FormikProps<ProjectVariation>;
}

const ProjectVariationForm: React.FC<ProjectVariationFormProps> = ({
  formik,
}) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <CustomTextBox
            fullWidth
            label={transl("project.variation.form.amount")}
            placeholder={transl("project.variation.form.amount")}
            name="amount"
            size="small"
            type="number"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CustomTextBox
            fullWidth
            label={transl("project.variation.form.amount-percent")}
            placeholder={transl("project.variation.form.amount-percent")}
            name="percentage"
            size="small"
            type="number"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomDynamicDatePicker
            label={transl("project.variation.form.approval-date")}
            name="approval_date"
            required
            showYearDropdown
            showMonthDropdown
            customInput={<CustomTextBox />}
          />
        </Grid>
        <Grid item xs={12}>

        <CustomTextBox
            fullWidth
            label={transl("project.variation.form.extension-time")}
            placeholder={transl("project.variation.form.extension-time")}
            name="extension_time"
            size="small"
            type="number"
            sx={{ mb: 2 }}
          />
          </Grid>
        <Grid item xs={12}>
          <CustomTextBox
            fullWidth
            label={transl("project.variation.form.justification")}
            placeholder={transl("project.variation.form.justification")}
            name="justification"
            multiline
            rows="4"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextBox
            fullWidth
            label={transl("project.variation.form.remark")}
            placeholder={transl("project.variation.form.remark")}
            name="remark"
            multiline
            rows="4"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectVariationForm;
