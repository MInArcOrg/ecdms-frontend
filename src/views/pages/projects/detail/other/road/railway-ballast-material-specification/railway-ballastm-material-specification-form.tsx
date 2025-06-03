import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwayBallastMaterialSpecification } from 'src/types/project/other';
import { useQuery } from '@tanstack/react-query';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import { dropDownConfig } from 'src/configs/api-constants';

interface RailwayBallestMaterialSpecificationProps {
  formik: FormikProps<RailwayBallastMaterialSpecification>;
}

const RailwayBallestMaterialSpecification: React.FC<RailwayBallestMaterialSpecificationProps> = ({ formik }) => {
  const { t } = useTranslation();

  const { data: ballastMaterialTypes } = useQuery({
    queryKey: [projectMasterModels.ballastMaterialType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.ballastMaterialType.model }
        })
      )
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* railway_line_section_name */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-specification.details.railway-line-section-name')}
          placeholder={t('project.other.railway-ballast-material-specification.details.railway-line-section-name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* ballast_material_type_id */}
        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-ballast-material-specification.details.ballast-material-type-id')}
          placeholder={t('project.other.railway-ballast-material-specification.details.ballast-material-type-id')}
          name="ballast_material_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            ballastMaterialTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        {/* specific_gravity */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-specification.details.specific-gravity')}
          placeholder={t('project.other.railway-ballast-material-specification.details.specific-gravity')}
          name="specific_gravity"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* porosity */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-specification.details.porosity')}
          placeholder={t('project.other.railway-ballast-material-specification.details.porosity')}
          name="porosity"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* water_absorption */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-specification.details.water-absorption')}
          placeholder={t('project.other.railway-ballast-material-specification.details.water-absorption')}
          name="water_absorption"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* shape */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-specification.details.shape')}
          placeholder={t('project.other.railway-ballast-material-specification.details.shape')}
          name="shape"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* average_particle_length */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-specification.details.average-particle-length')}
          placeholder={t('project.other.railway-ballast-material-specification.details.average-particle-length')}
          name="average_particle_length"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* remark */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-specification.details.remark')}
          placeholder={t('project.other.railway-ballast-material-specification.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayBallestMaterialSpecification;
