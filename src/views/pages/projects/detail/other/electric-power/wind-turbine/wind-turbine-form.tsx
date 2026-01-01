'use client';

import { Grid, Typography, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { WindTurbine } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface WindTurbineFormProps {
  formik: FormikProps<WindTurbine>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const WindTurbineForm: React.FC<WindTurbineFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  console.log('formik values', formik.values.tower_type_id)
  const { data: towerTypes } = useQuery({
    queryKey: ['tower-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.towerType.model }
      })
  });

  const { data: generatorTypes } = useQuery({
    queryKey: ['generator-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.generatorType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.wind-turbine.turbine-details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-turbine.details.turbine-manufacturer')}
              placeholder={transl('project.other.wind-turbine.details.turbine-manufacturer')}
              name="turbine_manufacturer"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-turbine.details.turbine-model')}
              placeholder={transl('project.other.wind-turbine.details.turbine-model')}
              name="turbine_model"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.wind-turbine.physical-specifications')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-turbine.details.rotor-diameter')}
              placeholder={transl('project.other.wind-turbine.details.rotor-diameter')}
              name="rotor_diameter"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.meters')}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-turbine.details.hub-height')}
              placeholder={transl('project.other.wind-turbine.details.hub-height')}
              name="hub_height"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.meters')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              label={transl('project.other.wind-turbine.details.tower-type')}
              placeholder={transl('project.other.wind-turbine.details.tower-type')}
              name="tower_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                towerTypes?.payload.map((type) => ({
                  label: type.title,
                  value: type.id
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-turbine.details.blade-length')}
              placeholder={transl('project.other.wind-turbine.details.blade-length')}
              name="blade_length"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.meters')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-turbine.details.blades-number')}
              placeholder={transl('project.other.wind-turbine.details.blades-number')}
              name="blades_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-turbine.details.gearbox-type')}
              placeholder={transl('project.other.wind-turbine.details.gearbox-type')}
              name="gearbox_type"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.wind-turbine.generator-details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              label={transl('project.other.wind-turbine.details.generator-type')}
              placeholder={transl('project.other.wind-turbine.details.generator-type')}
              name="generator_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                generatorTypes?.payload.map((type) => ({
                  label: type.title,
                  value: type.id
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-turbine.details.generators-number')}
              placeholder={transl('project.other.wind-turbine.details.generators-number')}
              name="generators_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.wind-turbine.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.wind-turbine.details.remark')}
          placeholder={transl('project.other.wind-turbine.details.remark')}
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

export default WindTurbineForm;
