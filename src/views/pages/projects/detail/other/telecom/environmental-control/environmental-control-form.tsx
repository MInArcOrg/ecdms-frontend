import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { DataCenter, EnvironmentalControl } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface EnvironmentalControlFormProps {
  formik: FormikProps<EnvironmentalControl>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: String;
}

const EnvironmentalControlForm: React.FC<EnvironmentalControlFormProps> = ({ formik, projectId, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  const { data: dataCenters } = useQuery({
    queryKey: ['data-centers'],
    queryFn: () =>
      projectOtherApiSecondService<DataCenter>().getAll('data-centers', {
        filter: { project_id: projectId }
      })
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={transl('project.other.data-center.details.data-center-type-id')}
          placeholder={transl('project.other.data-center.details.data-center-type-id')}
          name="data_center_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            dataCenters?.payload.map((type) => ({
              label: type?.dataCenterType?.title,
              value: type.id
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.environmental-control.details.temperature')}
              placeholder={transl('project.other.environmental-control.details.temperature')}
              name="temperature"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.environmental-control.details.humidity')}
              placeholder={transl('project.other.environmental-control.details.humidity')}
              name="humidity"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.environmental-control.details.air-quality')}
              placeholder={transl('project.other.environmental-control.details.air-quality')}
              name="air_quality"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.environmental-control.details.others')}
          placeholder={transl('project.other.environmental-control.details.others')}
          name="others"
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default EnvironmentalControlForm;
