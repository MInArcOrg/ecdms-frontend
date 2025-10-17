import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiService from 'src/services/project/project-other-service';
import { RoadLayer, RoadSegment } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RoadLayerFormProps {
  formik: FormikProps<RoadLayer>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const RoadLayerForm: React.FC<RoadLayerFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();
  const { data: roadLayers } = useQuery({
    queryKey: ['road-segments'],
    queryFn: () =>
      projectOtherApiService<RoadSegment>().getAll('roadsegment', {
        pagination: { pageSize: 100, page: 1 },
        filter: { project_id: projectId }
      })
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          size="small"
          name="segment_id"
          label={t('project.other.road-layer.details.segment')}
          options={
            roadLayers?.payload?.map((roadLayer) => ({
              value: roadLayer.id,
              label: roadLayer.name
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.road-layer.details.name')}
          placeholder={t('project.other.road-layer.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.road-layer.details.specifications')}
          placeholder={t('project.other.road-layer.details.specifications')}
          name="specifications"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.road-layer.details.number')}
          placeholder={t('project.other.road-layer.details.number')}
          name="number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.road-layer.details.thickness')}
          placeholder={t('project.other.road-layer.details.thickness')}
          name="thickness"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.road-layer.details.material')}
          placeholder={t('project.other.road-layer.details.material')}
          name="material"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.road-layer.details.description')}
          placeholder={t('project.other.road-layer.details.description')}
          name="description"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RoadLayerForm;
