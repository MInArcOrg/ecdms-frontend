import { Grid } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProjectStakeholder } from "src/types/project/project-stakeholder";
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface ProjectStakeholderFormProps {
  formik: FormikProps<ProjectStakeholder>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectStakeholderForm: React.FC<ProjectStakeholderFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();

  const institutionOptions = [
    { label: transl("institution.option1"), value: "option1" },
    { label: transl("institution.option2"), value: "option2" },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <CustomSelect
          size="small"
          name="stakeholder.stakeholdertype_id"
          label={transl("project.project-stakeholder.form.stakeholder-type")}
          options={institutionOptions}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6}>
        <CustomTextBox
          fullWidth
          label={transl("project.project-stakeholder.form.title")}
          placeholder={transl("project.project-stakeholder.form.title")}
          name="title"
          size="small"
          value={formik.values.title}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.project-stakeholder.form.description")}
          placeholder={transl("project.project-stakeholder.form.description")}
          name="description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.project-stakeholder.form.remark")}
          placeholder={transl("project.project-stakeholder.form.remark")}
          name="remark"
          multiline
          rows={2}
          value={formik.values.remark}
          onChange={formik.handleChange}
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

export default ProjectStakeholderForm;
