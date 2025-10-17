'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { MiniGridStation } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelect from 'src/views/shared/form/custom-select';
import { useQuery } from '@tanstack/react-query';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface MiniGridStationFormProps {
  formik: FormikProps<MiniGridStation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  substations: any[];
}

const MiniGridStationForm: React.FC<MiniGridStationFormProps> = ({ formik, file, onFileChange, substations }) => {
  const { t: transl } = useTranslation();

  // Fetch battery types for dropdown
  const { data: batteryTypes } = useQuery({
    queryKey: ['battery-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.batteryType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.mini-grid-station.general-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.mini-grid-station.details.substation-id')}
              name="substation_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                substations?.map((substation: any) => ({
                  label: substation.name,
                  value: substation.id
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              required
              label={transl('project.other.mini-grid-station.details.name')}
              placeholder={transl('project.other.mini-grid-station.details.name')}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.mini-grid-station.technical-specifications')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station.details.minigrid-size')}
              placeholder={transl('project.other.mini-grid-station.details.minigrid-size')}
              name="minigrid_size"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.kw')}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              label={transl('project.other.mini-grid-station.details.battery-type-id')}
              name="battery_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                batteryTypes?.payload.map((type: any) => ({
                  label: type.title,
                  value: type.id
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station.details.battery-size')}
              placeholder={transl('project.other.mini-grid-station.details.battery-size')}
              name="battery_size"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.kwh')}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station.details.inverter')}
              placeholder={transl('project.other.mini-grid-station.details.inverter')}
              name="inverter"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.kw')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station.details.system-voltage')}
              placeholder={transl('project.other.mini-grid-station.details.system-voltage')}
              name="system_voltage"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.v')}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.mini-grid-station.power-generation')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station.details.expected-annual-generation')}
              placeholder={transl('project.other.mini-grid-station.details.expected-annual-generation')}
              name="expected_annual_generation"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.kwh')}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.mini-grid-station.details.diesel-generator')}
              name="diesel_generator"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: 'Equipped', value: 'Equipped' },
                { label: 'Not Equipped', value: 'Not Equipped' }
              ]}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station.details.owner-operator')}
              placeholder={transl('project.other.mini-grid-station.details.owner-operator')}
              name="owner_operator"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.mini-grid-station.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.mini-grid-station.details.remark')}
          placeholder={transl('project.other.mini-grid-station.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default MiniGridStationForm;
