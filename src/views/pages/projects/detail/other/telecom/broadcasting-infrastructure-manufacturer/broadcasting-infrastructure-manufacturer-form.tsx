'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { BroadcastingInfrastructureManufacturer, BroadcastingInfrastructure } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelect from 'src/views/shared/form/custom-select';

interface BroadcastingInfrastructureManufacturerFormProps {
  formik: FormikProps<BroadcastingInfrastructureManufacturer>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  broadcastingInfrastructures: BroadcastingInfrastructure[];
}

const BroadcastingInfrastructureManufacturerForm: React.FC<BroadcastingInfrastructureManufacturerFormProps> = ({
  formik,
  file,
  onFileChange,
  broadcastingInfrastructures
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.broadcasting-infrastructure-manufacturer.general-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.broadcasting-infrastructure-manufacturer.details.broadcasting-infrastructure-id')}
              name="broadcasting_infrastructure_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                broadcastingInfrastructures?.map((infrastructure: any) => ({
                  label: infrastructure.id,
                  value: infrastructure.id
                })) || []
              }
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-infrastructure-age.details.name')}
              placeholder={transl('project.other.broadcasting-infrastructure-age.details.name')}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.broadcasting-infrastructure-manufacturer.manufacturer-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-infrastructure-manufacturer.details.antennas')}
              placeholder={transl('project.other.broadcasting-infrastructure-manufacturer.details.antennas')}
              name="antennas"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-infrastructure-manufacturer.details.transmitters')}
              placeholder={transl('project.other.broadcasting-infrastructure-manufacturer.details.transmitters')}
              name="transmitters"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-infrastructure-manufacturer.details.towers')}
              placeholder={transl('project.other.broadcasting-infrastructure-manufacturer.details.towers')}
              name="towers"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-infrastructure-manufacturer.details.cables')}
              placeholder={transl('project.other.broadcasting-infrastructure-manufacturer.details.cables')}
              name="cables"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.broadcasting-infrastructure-manufacturer.details.others')}
          placeholder={transl('project.other.broadcasting-infrastructure-manufacturer.details.others')}
          name="others"
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

export default BroadcastingInfrastructureManufacturerForm;
