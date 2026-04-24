'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { RoadSegment, TrafficParameter } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import projectOtherApiService from 'src/services/project/project-other-service';
import { dropDownConfig } from 'src/configs/api-constants';

interface TrafficParameterFormProps {
  formik: FormikProps<TrafficParameter>;
}

const TrafficParameterForm: React.FC<TrafficParameterFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: pedestrianFacilities } = useQuery({
    queryKey: ['pedestrian-facilities'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: { model: projectMasterModels.pedestrianFacility.model }
      }))
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

  useEffect(() => {
    const segmentName = roadSegments?.payload?.find((segment) => segment.id === formik.values.road_segment_id)?.name;

    if (segmentName && formik.values.name !== segmentName) {
      formik.setFieldValue('name', segmentName, false);
    }
  }, [formik.values.road_segment_id, formik.values.name, roadSegments?.payload]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.segment-geometry.details.road-segment')}
          placeholder={transl('project.other.segment-geometry.details.road-segment')}
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

        <CustomSelect
          fullWidth
          label={transl('project.other.traffic-parameter.details.pedestrian-facility-id')}
          placeholder={transl('project.other.traffic-parameter.details.pedestrian-facility-id')}
          name="pedestrian_facility_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            pedestrianFacilities?.payload.map((facility) => ({
              label: facility.title,
              value: facility.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-parameter.details.parking')}
          placeholder={transl('project.other.traffic-parameter.details.parking')}
          name="parking"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-parameter.details.design-traffic-flow')}
          placeholder={transl('project.other.traffic-parameter.details.design-traffic-flow')}
          name="design_traffic_flow"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-parameter.details.design-speed')}
          placeholder={transl('project.other.traffic-parameter.details.design-speed')}
          name="design_speed"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSwitch label={transl('project.other.traffic-parameter.details.similar-for-all')} name="similar_for_all" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default TrafficParameterForm;
