'use client';

import { Grid, Typography, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { ThermalBiomassIncinerationData } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ThermalBiomassIncinerationFormProps {
  formik: FormikProps<ThermalBiomassIncinerationData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ThermalBiomassIncinerationForm: React.FC<ThermalBiomassIncinerationFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: thermalTypes } = useQuery({
    queryKey: ['thermal-biomass-incineration-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.thermalBiomassIncinerationType.model }
      })
  });

  const { data: fuelSources } = useQuery({
    queryKey: ['fuel-sources'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.fuelSource.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.thermal-biomass-incineration.details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomSelect
          fullWidth
          label={transl('project.other.thermal-biomass-incineration.form.type')}
          placeholder={transl('project.other.thermal-biomass-incineration.form.type')}
          name="type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            thermalTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.thermal-biomass-incineration.form.fuel-source')}
          placeholder={transl('project.other.thermal-biomass-incineration.form.fuel-source')}
          name="fuel_source_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            fuelSources?.payload.map((source) => ({
              label: source.title,
              value: source.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.thermal-biomass-incineration.form.heat-rate-at-max-capacity')}
          placeholder={transl('project.other.thermal-biomass-incineration.form.heat-rate-at-max-capacity')}
          name="heat_rate_at_max_capacity"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.thermal-biomass-incineration.form.remark')}
          placeholder={transl('project.other.thermal-biomass-incineration.form.remark')}
          name="remark"
          multiline
          rows={3}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomFileUpload
          file={file}
          onFileChange={onFileChange}
          label={transl('project.other.thermal-biomass-incineration.form.upload-file')}
        />
      </Grid>
    </Grid>
  );
};

export default ThermalBiomassIncinerationForm;
