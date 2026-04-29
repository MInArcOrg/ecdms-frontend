'use client';

import { Grid, FormControlLabel, Switch } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { GeotechnicalInformation } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelect from 'src/views/shared/form/custom-select';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { GEOTECHNICAL_INFORMATION_FILE_TYPES, GeotechnicalInformationFileKey } from './filet-type-config';

interface GeotechnicalInformationFormProps {
  formik: FormikProps<GeotechnicalInformation>;
  files: Record<GeotechnicalInformationFileKey, File | null>;
  onFileChange: (fileType: GeotechnicalInformationFileKey, file: File | null) => void;
}

const GeotechnicalInformationForm: React.FC<GeotechnicalInformationFormProps> = ({ formik, files, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: soilTypes } = useQuery({
    queryKey: ['soil-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.soilType.model }
      })
  });

  const { data: groundWaterImpacts } = useQuery({
    queryKey: ['ground-water-impacts'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.groundWaterImpact.model }
      })
  });

  const { data: slopeStabilities } = useQuery({
    queryKey: ['slope-stabilities'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.slopeStability.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.geotechnical-information.details.name')}
          placeholder={transl('project.other.geotechnical-information.details.name')}
          name="name"
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomSelect
          fullWidth
          label={transl('project.other.geotechnical-information.details.soil-type')}
          name="soil_type_id"
          options={
            soilTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomSelect
          fullWidth
          label={transl('project.other.geotechnical-information.details.ground-water-impact')}
          name="ground_water_impact_id"
          options={
            groundWaterImpacts?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.geotechnical-information.details.soil-bearing-capacity')}
          placeholder={transl('project.other.geotechnical-information.details.soil-bearing-capacity')}
          name="soil_bearing_capacity"
          type="number"
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomSelect
          fullWidth
          label={transl('project.other.geotechnical-information.details.slope-stability')}
          name="slope_stability_id"
          options={
            slopeStabilities?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.retaining_walls || false}
              onChange={(e) => formik.setFieldValue('retaining_walls', e.target.checked)}
              name="retaining_walls"
            />
          }
          label={transl('project.other.geotechnical-information.details.retaining-walls')}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.geotechnical-information.details.geological-hazard')}
          placeholder={transl('project.other.geotechnical-information.details.geological-hazard')}
          name="geological_hazard"
          size="small"
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.geotechnical-information.details.remark')}
          placeholder={transl('project.other.geotechnical-information.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={12}>
        {GEOTECHNICAL_INFORMATION_FILE_TYPES.map((fileType) => (
          <CustomFileUpload
            key={fileType.key}
            label={transl(fileType.titleTKey)}
            file={files[fileType.key]}
            onFileChange={(file) => onFileChange(fileType.key, file)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default GeotechnicalInformationForm;
