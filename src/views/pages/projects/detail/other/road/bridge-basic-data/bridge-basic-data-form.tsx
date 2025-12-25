'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import moment from 'moment';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiService from 'src/services/project/project-other-service';
import type { BridgeBasicData, RoadSegment } from 'src/types/project/other';
import { generateYears } from 'src/utils/genertor/date';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface BridgeBasicDataFormProps {
  formik: FormikProps<BridgeBasicData>;
}

const BridgeBasicDataForm: React.FC<BridgeBasicDataFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();
  const years = generateYears(1900, moment().year()).map((year) => ({ label: year.toString(), value: year.toString() }));
  const { data: roadSegments } = useQuery(
    {
      queryKey: ['roadSegments', formik.values.project_id],
      queryFn: () => projectOtherApiService<RoadSegment>().getAll('roadsegment', dropDownConfig({
        filter: {
          project_id: formik.values.project_id
        }
      }))
    }
  )
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.road_segment_id')}
          placeholder={transl('project.other.bridge-basic-data.details.road_segment_id')}
          name="road_segment_id"
          size="small"
          sx={{ mb: 2 }}
          options={roadSegments?.payload.map((item) => ({ label: item.name, value: item.id })) || []}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.name')}
          placeholder={transl('project.other.bridge-basic-data.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.bridge-number')}
          placeholder={transl('project.other.bridge-basic-data.details.bridge-number')}
          name="bridge_number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.bridge-length')}
          placeholder={transl('project.other.bridge-basic-data.details.bridge-length')}
          name="bridge_length"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.bridge-width')}
          placeholder={transl('project.other.bridge-basic-data.details.bridge-width')}
          name="bridge_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />


        <CustomSelectBox options={years} fullWidth
          label={transl('project.other.bridge-basic-data.details.construction-year')}
          placeholder={transl('project.other.bridge-basic-data.details.construction-year')}
          name="construction_year" size="small" sx={{ mb: 2 }} />


        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.contractor')}
          placeholder={transl('project.other.bridge-basic-data.details.contractor')}
          name="contractor"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.designer')}
          placeholder={transl('project.other.bridge-basic-data.details.designer')}
          name="designer"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.bridge-cost')}
          placeholder={transl('project.other.bridge-basic-data.details.bridge-cost')}
          name="bridge_cost"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.land-capacity')}
          placeholder={transl('project.other.bridge-basic-data.details.land-capacity')}
          name="land_capacity"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-basic-data.details.average-daily-traffic')}
          placeholder={transl('project.other.bridge-basic-data.details.average-daily-traffic')}
          name="average_daily_traffic"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default BridgeBasicDataForm;
