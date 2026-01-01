'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { TelecomInfrastructureManufacturer, TelecomInfrastructure } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';

interface TelecomInfrastructureManufacturerFormProps {
  formik: FormikProps<TelecomInfrastructureManufacturer>;
  telecomInfrastructures: TelecomInfrastructure[];
}

const TelecomInfrastructureManufacturerForm: React.FC<TelecomInfrastructureManufacturerFormProps> = ({
  formik,
  telecomInfrastructures
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={transl('project.other.telecom-infrastructure.title')}
          name="telecom_infrastructure_id"
          options={telecomInfrastructures.map((item) => ({ value: item.id, label: item.name }))}
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.telecom-infrastructure-manufacturer.details.title')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.name')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.country')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.country')}
          name="country"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.website')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.website')}
          name="website"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.remark')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mt: 2, mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default TelecomInfrastructureManufacturerForm;
