import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { RoadDrainage } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RoadDrainageFormProps {
  formik: FormikProps<RoadDrainage>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RoadDrainageForm: React.FC<RoadDrainageFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: conditionTypes } = useQuery({
    queryKey: ['condition-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.currentCondition.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-drainage.details.name')}
          placeholder={transl('project.other.road-drainage.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.road-drainage.details.length')}
              placeholder={transl('project.other.road-drainage.details.length')}
              name="length"
              size="small"
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.road-drainage.details.width')}
              placeholder={transl('project.other.road-drainage.details.width')}
              name="width"
              size="small"
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.road-drainage.details.height')}
              placeholder={transl('project.other.road-drainage.details.height')}
              name="height"
              size="small"
              type="number"
            />
          </Grid>
        </Grid>

        <CustomSelect
          fullWidth
          label={transl('project.other.road-drainage.details.current-condition-id')}
          placeholder={transl('project.other.road-drainage.details.current-condition-id')}
          name="current_condition_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            conditionTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-drainage.details.weight-limit')}
          placeholder={transl('project.other.road-drainage.details.weight-limit')}
          name="weight_limit"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-drainage.details.design-life-span')}
          placeholder={transl('project.other.road-drainage.details.design-life-span')}
          name="design_life_span"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-drainage.details.inspection-frequency')}
          placeholder={transl('project.other.road-drainage.details.inspection-frequency')}
          name="inspection_frequency"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-drainage.details.construction-completion-year')}
          placeholder={transl('project.other.road-drainage.details.construction-completion-year')}
          name="construction_completion_year"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-drainage.details.remark')}
          placeholder={transl('project.other.road-drainage.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RoadDrainageForm;
