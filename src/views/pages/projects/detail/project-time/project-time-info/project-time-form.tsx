import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectTime } from 'src/types/project/project-time';
import { convertToGC, getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectTimeFormProps {
  formik: FormikProps<ProjectTime>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectTimeForm: React.FC<ProjectTimeFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl, i18n } = useTranslation();

  useEffect(() => {
    const siteHandoverDate = moment(convertDate(formik.values.site_handover_date));
    const mobilizationDays = formik.values.mobilization_days_no;
    const commencementDate = siteHandoverDate.add(mobilizationDays || 0, 'days');
    formik.setFieldValue('commencement_date', getDynamicDate(i18n, commencementDate.toDate()), false);
  }, [formik.values.site_handover_date, formik.values.mobilization_days_no]);

  useEffect(() => {
    const commencementDate = moment(convertDate(formik.values.commencement_date));
    const contractDuration = formik.values.original_contract_duration;
    const projectCompletionDate = commencementDate.add(contractDuration || 0, 'days');
    formik.setFieldValue('project_completion_date', getDynamicDate(i18n, projectCompletionDate.toDate()), false); // Validate after the last change
  }, [formik.values.commencement_date, formik.values.original_contract_duration]);

  const convertDate = (date: any) => {
    if (i18n.language === 'am') {
      return date ? convertToGC(date) : new Date();
    }
    return date;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.project-time.form.contract-signing-date')}
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
          label={transl('project.project-time.form.site-handover-date')}
          name="site_handover_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="site_handover_date" />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-time.form.mobilization-days-no')}
          placeholder={transl('project.project-time.form.mobilization-days-no')}
          name="mobilization_days_no"
          size="small"
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.project-time.form.commencement-date')}
          name="commencement_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="commencement_date" />}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-time.form.original-contract-duration')}
          placeholder={transl('project.project-time.form.original-contract-duration')}
          name="original_contract_duration"
          size="small"
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.project-time.form.project-completion-date')}
          name="project_completion_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="project_completion_date" />}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-time.form.remark')}
          placeholder={transl('project.project-time.form.remark')}
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
