'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiService from 'src/services/project/project-other-service';
import type { RoadMaintenanceData, RoadSegment } from 'src/types/project/other';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomTextArea from 'src/views/shared/form/custom-text-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';

interface RoadMaintenanceDataFormProps {
  formik: FormikProps<RoadMaintenanceData>;
}

const RoadMaintenanceDataForm: React.FC<RoadMaintenanceDataFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: roadSegments } = useQuery({
    queryKey: ['roadSegments', formik.values.project_id],
    queryFn: () =>
      projectOtherApiService<RoadSegment>().getAll(
        'roadsegment',
        dropDownConfig({
          filter: { project_id: formik.values.project_id }
        })
      )
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.road-maintenance-data.details.road-segment')}
          placeholder={transl('project.other.road-maintenance-data.details.road-segment')}
          name="road_segment_id"
          size="small"
          sx={{ mb: 2 }}
          options={roadSegments?.payload.map((item) => ({ label: item.name, value: item.id })) || []}
        />

        <CustomDatePicker
          fullWidth
          label={transl('project.other.road-maintenance-data.details.maintenance-start-date')}
          placeholder={transl('project.other.road-maintenance-data.details.maintenance-start-date')}
          name="maintenance_start_date"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomDatePicker
          fullWidth
          label={transl('project.other.road-maintenance-data.details.maintenance-end-date')}
          placeholder={transl('project.other.road-maintenance-data.details.maintenance-end-date')}
          name="maintenance_end_date"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-maintenance-data.details.weather-condition')}
          placeholder={transl('project.other.road-maintenance-data.details.weather-condition')}
          name="weather_condition"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.road-maintenance-data.details.pavement-condition')}
          placeholder={transl('project.other.road-maintenance-data.details.pavement-condition')}
          name="pavement_condition"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextArea
          fullWidth
          label={transl('project.other.road-maintenance-data.details.remark')}
          placeholder={transl('project.other.road-maintenance-data.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          rows={3}
        />
      </Grid>
    </Grid>
  );
};

export default RoadMaintenanceDataForm;
