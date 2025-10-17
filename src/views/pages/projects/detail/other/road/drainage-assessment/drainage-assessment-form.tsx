import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { DrainageAssessment } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface DrainageAssessmentFormProps {
  formik: FormikProps<DrainageAssessment>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const DrainageAssessmentForm: React.FC<DrainageAssessmentFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: drainageConditions } = useQuery({
    queryKey: ['drainage-conditions'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.drainageCondition.model }
      })
  });

  const { data: drainageTypes } = useQuery({
    queryKey: ['drainage-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.drainageType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.drainage-assessment.details.road-segment')}
          placeholder={transl('project.other.drainage-assessment.details.road-segment')}
          name="road_segment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.drainage-assessment.details.drainage-type')}
          placeholder={transl('project.other.drainage-assessment.details.drainage-type')}
          name="drainage_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            drainageTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.drainage-assessment.details.drainage-condition')}
          placeholder={transl('project.other.drainage-assessment.details.drainage-condition')}
          name="drainage_condition_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            drainageConditions?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.drainage-assessment.details.remark')}
          placeholder={transl('project.other.drainage-assessment.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default DrainageAssessmentForm;
