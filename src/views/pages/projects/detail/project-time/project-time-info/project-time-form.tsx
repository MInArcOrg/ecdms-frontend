import { Grid } from "@mui/material";
import { FormikProps } from "formik";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import { ProjectTime } from "src/types/project/project-time";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import moment from 'moment';

interface ProjectTimeFormProps {
  formik: FormikProps<ProjectTime>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectTimeForm: React.FC<ProjectTimeFormProps> = ({
  formik,
  file,
  onFileChange
}) => {
  const { t: transl } = useTranslation();

  const handleValueChange = useCallback((name: keyof ProjectTime, value: any) => {
    formik.setFieldValue(name, value);

    if (name === 'site_handover_date' || name === 'mobilization_days_no') {
      const siteHandoverDate = moment(formik.values.site_handover_date);
      const mobilizationDays = formik.values.mobilization_days_no;
      if (siteHandoverDate.isValid() && mobilizationDays !== undefined) {
        const commencementDate = siteHandoverDate.add(mobilizationDays + 1, 'days').format("YYYY-MM-DD");
        formik.setFieldValue('commencement_date', commencementDate);
      }
    }

    if (name === 'commencement_date' || name === 'original_contract_duration') {
      const commencementDate = moment(formik.values.commencement_date);
      const contractDuration = formik.values.original_contract_duration;
      if (commencementDate.isValid() && contractDuration !== undefined) {
        const projectCompletionDate = commencementDate.add(contractDuration, 'days').format("YYYY-MM-DD");
        formik.setFieldValue('project_completion_date', projectCompletionDate);
      }
    }
  }, [formik]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl("project.project-time.form.contract-signing-date")}
          name="contract_signing_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="contract_signing_date" />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl("project.project-time.form.site-handover-date")}
          name="site_handover_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="site_handover_date" />}
          onChange={(date) => handleValueChange('site_handover_date', date)}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomTextBox
          fullWidth
          label={transl("project.project-time.form.mobilization-days-no")}
          placeholder={transl("project.project-time.form.mobilization-days-no")}
          name="mobilization_days_no"
          size="small"
          type="number"
          onValueChange={(value: string | number) => handleValueChange('mobilization_days_no', Number(value))}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl("project.project-time.form.commencement-date")}
          name="commencement_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="commencement_date" />}
          onChange={(date) => handleValueChange('commencement_date', date)}
        />
      </Grid>
      <Grid item xs={12}  >
        <CustomTextBox
          fullWidth
          label={transl("project.project-time.form.original-contract-duration")}
          placeholder={transl("project.project-time.form.original-contract-duration")}
          name="original_contract_duration"
          size="small"
          type="number"
          onValueChange={(value: string | number) => handleValueChange('original_contract_duration', Number(value))}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl("project.project-time.form.project-completion-date")}
          name="project_completion_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="project_completion_date" />}
          onChange={(date) => handleValueChange('project_completion_date', date)}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.project-variation.form.remark")}
          placeholder={transl("project.project-variation.form.remark")}
          name="remark"
          multiline
          rows="4"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ProjectTimeForm;
