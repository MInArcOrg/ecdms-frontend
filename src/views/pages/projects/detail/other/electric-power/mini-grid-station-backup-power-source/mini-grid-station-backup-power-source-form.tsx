'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { MiniGridStationBackupPowerSource, MiniGridStation } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';

interface MiniGridStationBackupPowerSourceFormProps {
  formik: FormikProps<MiniGridStationBackupPowerSource>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  miniGridStations: MiniGridStation[];
}

const MiniGridStationBackupPowerSourceForm: React.FC<MiniGridStationBackupPowerSourceFormProps> = ({
  formik,
  file,
  onFileChange,
  miniGridStations
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.mini-grid-station-backup-power-source.general-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.mini-grid-station-backup-power-source.details.mini-grid-station-id')}
              name="mini_grid_station_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                miniGridStations?.map((station: MiniGridStation) => ({
                  label: station.name,
                  value: station.id
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
              label={transl('project.other.mini-grid-station-backup-power-source.details.name')}
              placeholder={transl('project.other.mini-grid-station-backup-power-source.details.name')}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.mini-grid-station-backup-power-source.technical-specifications')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station-backup-power-source.details.capacity')}
              placeholder={transl('project.other.mini-grid-station-backup-power-source.details.capacity')}
              name="capacity"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.kw')}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station-backup-power-source.details.distribution-lines-total-length')}
              placeholder={transl('project.other.mini-grid-station-backup-power-source.details.distribution-lines-total-length')}
              name="distribution_lines_total_length"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.km')}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.mini-grid-station-backup-power-source.timeline-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station-backup-power-source.details.installation-year')}
              placeholder={transl('project.other.mini-grid-station-backup-power-source.details.installation-year')}
              name="installation_year"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station-backup-power-source.details.lifetime')}
              placeholder={transl('project.other.mini-grid-station-backup-power-source.details.lifetime')}
              name="lifetime"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.years')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomDatePicker
              fullWidth
              label={transl('project.other.mini-grid-station-backup-power-source.details.commissioning-date')}
              name="commissioning_date"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.mini-grid-station-backup-power-source.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.mini-grid-station-backup-power-source.details.other')}
              placeholder={transl('project.other.mini-grid-station-backup-power-source.details.other')}
              name="other"
              size="small"
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.mini-grid-station-backup-power-source.details.remark')}
          placeholder={transl('project.other.mini-grid-station-backup-power-source.details.remark')}
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

export default MiniGridStationBackupPowerSourceForm;
