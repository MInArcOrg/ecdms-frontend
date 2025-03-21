'use client';

import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { PowerGenerationCapacity } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

import { useQuery } from '@tanstack/react-query';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface PowerGenerationCapacityFormProps {
  formik: FormikProps<PowerGenerationCapacity>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const PowerGenerationCapacityForm: React.FC<PowerGenerationCapacityFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: owners } = useQuery({
    queryKey: ['owners'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: 'Owner' }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
    

        <CustomSelect
          fullWidth
          label={transl('project.other.power-generation-capacity.details.owner')}
          placeholder={transl('project.other.power-generation-capacity.details.owner')}
          name="owner_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            owners?.payload.map((owner) => ({
              label: owner.title,
              value: owner.id
            })) || []
          }
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.power-generation-capacity.details.capacity')}
              placeholder={transl('project.other.power-generation-capacity.details.capacity')}
              name="capacity"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.power-generation-capacity.details.annual-generation')}
              placeholder={transl('project.other.power-generation-capacity.details.annual-generation')}
              name="annual_generation"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.power-generation-capacity.details.units-number')}
              placeholder={transl('project.other.power-generation-capacity.details.units-number')}
              name="units_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomDynamicDatePicker
              fullWidth
              label={transl('project.other.power-generation-capacity.details.commissioning-date')}
              placeholder={transl('project.other.power-generation-capacity.details.commissioning-date')}
              name="commissioning_date"
              required
              showYearDropdown
              showMonthDropdown
              customInput={<CustomTextBox name="commissioning_date" />}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.power-generation-capacity.details.plant-life')}
              placeholder={transl('project.other.power-generation-capacity.details.plant-life')}
              name="plant_life"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

    
        <CustomTextBox
          fullWidth
          label={transl('project.other.power-generation-capacity.details.others')}
          placeholder={transl('project.other.power-generation-capacity.details.others')}
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

export default PowerGenerationCapacityForm;
