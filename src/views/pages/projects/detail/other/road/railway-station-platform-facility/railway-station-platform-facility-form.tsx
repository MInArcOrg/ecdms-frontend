import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayStationPlatformFacility, RailwayStationPlatformLayout } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayStationPlatformFacilityFormProps {
  formik: FormikProps<RailwayStationPlatformFacility>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayStationPlatformFacilityForm: React.FC<RailwayStationPlatformFacilityFormProps> = ({
  formik,
  defaultFile,
  onDefaultFileChange
}) => {
  const { t } = useTranslation();

  const { data: platformIdentifications } = useQuery({
    queryKey: ['platform-identifications'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-station-platform-facility.details.railway_station_platform_layout_id')}
          name="railway_station_platform_layout_id"
          options={
            platformIdentifications?.payload.map((item) => ({
              label: item.name,
              value: item.id
            })) || []
          }
          value={formik.values.railway_station_platform_layout_id}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          label={t('project.other.railway-station-platform-facility.details.waiting_areas_seating_capacity')}
          name="waiting_areas_seating_capacity"
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          label={t('project.other.railway-station-platform-facility.details.ticketing_facilities_availability')}
          name="ticketing_facilities_availability"
        />

        <CustomSwitch
          label={t('project.other.railway-station-platform-facility.details.restrooms_and_amenities_availability')}
          name="restrooms_and_amenities_availability"
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station-platform-facility.details.passenger_information_system')}
          placeholder="e.g. Digital displays, PA system, App notifications"
          name="passenger_information_system"
          value={formik.values.passenger_information_system}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station-platform-facility.details.accessibility_features')}
          placeholder="e.g. Ramps, Elevators, Braille Signage, Accessible Restrooms"
          name="accessibility_features"
          value={formik.values.accessibility_features}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station-platform-facility.details.remark')}
          placeholder={t('common.form.remark-placeholder')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={defaultFile} onFileChange={onDefaultFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayStationPlatformFacilityForm;
