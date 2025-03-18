import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { DataCenter, DataCenterFacility } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface DataCenterFacilityFormProps {
  formik: FormikProps<DataCenterFacility>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: String;
}

const DataCenterFacilityForm: React.FC<DataCenterFacilityFormProps> = ({ formik, projectId, file, onFileChange }) => {
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
          label={transl('project.other.data-center-facility.details.data-center-id')}
          placeholder={transl('project.other.data-center-facility.details.data-center-id')}
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
              label={transl('project.other.data-center-facility.details.total-floor-area')}
              placeholder={transl('project.other.data-center-facility.details.total-floor-area')}
              name="total_floor_area"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.data-center-facility.details.power-capacity')}
              placeholder={transl('project.other.data-center-facility.details.power-capacity')}
              name="power_capacity"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.data-center-facility.details.rack-space-capacity')}
              placeholder={transl('project.other.data-center-facility.details.rack-space-capacity')}
              name="rack_space_capacity"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.data-center-facility.details.cooling-capacity')}
              placeholder={transl('project.other.data-center-facility.details.cooling-capacity')}
              name="cooling_capacity"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectBox
              fullWidth
              label={transl('project.other.data-center-facility.details.access-control')}
              name="access_control"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: transl('common.yes'), value: true },
                { label: transl('common.no'), value: false }
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectBox
              fullWidth
              label={transl('project.other.data-center-facility.details.surveillance-cameras')}
              name="surveillance_cameras"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: transl('common.yes'), value: true },
                { label: transl('common.no'), value: false }
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectBox
              fullWidth
              label={transl('project.other.data-center-facility.details.fire-suppression-systems')}
              name="fire_suppression_systems"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: transl('common.yes'), value: true },
                { label: transl('common.no'), value: false }
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectBox
              fullWidth
              label={transl('project.other.data-center-facility.details.intrusion-detection-systems')}
              name="intrusion_detection_systems"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: transl('common.yes'), value: true },
                { label: transl('common.no'), value: false }
              ]}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.data-center-facility.details.others')}
          placeholder={transl('project.other.data-center-facility.details.others')}
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

export default DataCenterFacilityForm;
