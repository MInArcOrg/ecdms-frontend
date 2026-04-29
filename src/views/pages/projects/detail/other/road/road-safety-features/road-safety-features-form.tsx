import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import roadSafetyFeatureMasterService from 'src/services/general/project/road-safety-feature-master-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import type { RoadSafetyFeature } from 'src/types/general/general-master';
import type { ProjectRoadSafetyFeature, RoadSegment } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface RoadSafetyFeaturesFormProps {
  formik: FormikProps<ProjectRoadSafetyFeature>;
  typeId: string;
}

const RoadSafetyFeaturesForm: React.FC<RoadSafetyFeaturesFormProps> = ({ formik, typeId }) => {
  const { t: transl } = useTranslation();

const { data: roadSegments } = useQuery({
    queryKey: ['roadSegments', formik.values.project_id],
    queryFn: () =>
      projectOtherApiService<RoadSegment>().getAll('roadsegment', dropDownConfig({
        filter: {
          project_id: formik.values.project_id
        }
      }))
  });

   const { data: roadSafetyFeatures } = useQuery({
    queryKey: ['road-safety-feature'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: { model: projectMasterModels.roadSafetyFeature.model }
      }))
  });

  console.log('road segment',roadSegments,roadSafetyFeatures)
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.road-safety-features.details.road-segment')}
          placeholder={transl('project.other.road-safety-features.details.road-segment')}
          name="road_segment_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            roadSegments?.payload?.map((segment) => ({
              label: segment.name,
              value: segment.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.road-safety-features.details.road-safety-feature')}
          placeholder={transl('project.other.road-safety-features.details.road-safety-feature')}
          name="road_safety_feature_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            roadSafetyFeatures?.payload?.map((feature: RoadSafetyFeature) => ({
              label: feature.title || '',
              value: feature.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-safety-features.details.safety-feature-condition')}
          placeholder={transl('project.other.road-safety-features.details.safety-feature-condition')}
          name="safety_feature_condition"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-safety-features.details.description')}
          placeholder={transl('project.other.road-safety-features.details.description')}
          name="description"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default RoadSafetyFeaturesForm;
