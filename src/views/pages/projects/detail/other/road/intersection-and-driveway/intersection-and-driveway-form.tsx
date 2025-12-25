'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import { dropDownConfig } from 'src/configs/api-constants';
import type { IntersectionAndDriveway, RoadSegment } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSwitch from 'src/views/shared/form/custom-switch';

interface IntersectionDrivewayFormProps {
  formik: FormikProps<IntersectionAndDriveway>;
}

const IntersectionDrivewayForm: React.FC<IntersectionDrivewayFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: intersectionTypes } = useQuery({
    queryKey: ['intersection-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.intersectionType.model }
      })
  });

  const { data: drivewayAccessPoints } = useQuery({
    queryKey: ['driveway-access-points'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.drivewayAccessPoint.model }
      })
  });

  const { data: roadSegments } = useQuery({
    queryKey: ['roadSegments', formik.values.project_id],
    queryFn: () =>
      projectOtherApiService<RoadSegment>().getAll('roadsegment', dropDownConfig({
        filter: {
          project_id: formik.values.project_id
        }
      }))
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>

        <CustomSelect
          fullWidth
          label={transl('project.other.intersection-driveway.details.road-segment')}
          placeholder={transl('project.other.intersection-driveway.details.road-segment')}
          name="road_segment_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            roadSegments?.payload.map((segment) => ({
              label: segment.name,
              value: segment.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.intersection-driveway.details.number-of-intersections')}
          placeholder={transl('project.other.intersection-driveway.details.number-of-intersections')}
          name="number_of_intersections"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.intersection-driveway.details.intersection-type')}
          placeholder={transl('project.other.intersection-driveway.details.intersection-type')}
          name="intersection_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            intersectionTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.intersection-driveway.details.driveway-access-point')}
          placeholder={transl('project.other.intersection-driveway.details.driveway-access-point')}
          name="driveway_access_point_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            drivewayAccessPoints?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomSwitch label={transl('project.other.intersection-driveway.details.similar-for-all')} name="similar_for_all" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default IntersectionDrivewayForm;
