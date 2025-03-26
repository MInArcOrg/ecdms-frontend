'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { TrafficVolume } from 'src/types/project/other';
import CustomDateTimePicker from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface TrafficVolumeFormProps {
  formik: FormikProps<TrafficVolume>;
}

const TrafficVolumeForm: React.FC<TrafficVolumeFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: countTypes } = useQuery({
    queryKey: ['count-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.countType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-volume.details.name')}
          placeholder={transl('project.other.traffic-volume.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.traffic-volume.details.count-type-id')}
          placeholder={transl('project.other.traffic-volume.details.count-type-id')}
          name="count_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            countTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-volume.details.count-location-coordinate-x')}
          placeholder={transl('project.other.traffic-volume.details.count-location-coordinate-x')}
          name="count_location_coordinate_x"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-volume.details.count-location-coordinate-y')}
          placeholder={transl('project.other.traffic-volume.details.count-location-coordinate-y')}
          name="count_location_coordinate_y"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomDateTimePicker
          fullWidth
          label={transl('project.other.traffic-volume.details.count-time')}
          placeholder={transl('project.other.traffic-volume.details.count-time')}
          name="count_time"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-volume.details.lane-number')}
          placeholder={transl('project.other.traffic-volume.details.lane-number')}
          name="lane_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-volume.details.vehicle-number-per-hour')}
          placeholder={transl('project.other.traffic-volume.details.vehicle-number-per-hour')}
          name="vehicle_number_per_hour"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-volume.details.average-daily-traffic-volume')}
          placeholder={transl('project.other.traffic-volume.details.average-daily-traffic-volume')}
          name="average_daily_traffic_volume"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.traffic-volume.details.corridor-importance-level')}
          placeholder={transl('project.other.traffic-volume.details.corridor-importance-level')}
          name="corridor_importance_level"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default TrafficVolumeForm;
