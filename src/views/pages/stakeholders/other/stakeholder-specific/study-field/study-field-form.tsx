import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import generalMasterDataApiService from "src/services/general/general-master-data-service";
import { StudyField } from "src/types/stakeholder/other";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface StudyFieldFormProps {
  formik: FormikProps<StudyField>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StudyFieldForm: React.FC<StudyFieldFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();
  const { data: studyLevels } = useQuery({
    queryKey: ["general-master", "study-levels"],
    queryFn: () => generalMasterDataApiService.getAll("study-levels", {}),
  });
  const { data: studyPrograms } = useQuery({
    queryKey: ["general-master", "study-programs"],
    queryFn: () => generalMasterDataApiService.getAll("study-programs", {}),
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomSelect
          size="small"
          sx={{mb:2}}
          name="studyfield_id"
          label={transl(
            "stakeholder.other.study-field.details.study-level"
          )}
          placeholder={transl(
            "stakeholder.other.study-field.details.study-level"
          )}          options={
            studyLevels?.payload?.map((studyLevel) => ({
              value: studyLevel.id,
              label: studyLevel.title,
            })) || []
          }
        />
        <CustomSelect
                  sx={{mb:2}}
          size="small"
          name="study_program_id"
          label={transl(
            "stakeholder.other.study-field.details.study-program"
          )}
          placeholder={transl(
            "stakeholder.other.study-field.details.study-program"
          )}          options={
            studyPrograms?.payload?.map((studyProgram) => ({
              value: studyProgram.id,
              label: studyProgram.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.other.study-field.details.title")}
          placeholder={transl("stakeholder.other.study-field.details.title")}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.other.study-field.details.description")}
          placeholder={transl(
            "stakeholder.other.study-field.details.description"
          )}
          name="description"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
  
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.other.study-field.details.studylevel-id")}
          placeholder={transl(
            "stakeholder.other.study-field.details.studylevel-id"
          )}
          name="studylevel_id"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.other.study-field.details.revision-no")}
          placeholder={transl(
            "stakeholder.other.study-field.details.revision-no"
          )}
          name="revision_no"
          size="small"
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

export default StudyFieldForm;
