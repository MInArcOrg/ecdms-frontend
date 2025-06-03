import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwayBallastMaterialData } from 'src/types/project/other';
import { useQuery } from '@tanstack/react-query';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import { dropDownConfig } from 'src/configs/api-constants';

interface RailwayBallastFormProps {
  formik: FormikProps<RailwayBallastMaterialData>;
}

const RailwayBallastForm: React.FC<RailwayBallastFormProps> = ({ formik }) => {
  const { t } = useTranslation();
  const { data: ballasterMaterialType } = useQuery({
    queryKey: [projectMasterModels.ballastMaterialType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: {
          model: projectMasterModels.ballastMaterialType.model
        }
      }))
  });
  const { data: ballastSources } = useQuery({
    queryKey: [projectMasterModels.ballastSource.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: {
          model: projectMasterModels.ballastSource.model
        }
      }))
  });
  const { data: compactionMethods } = useQuery({
    queryKey: [projectMasterModels.compactionMethod.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: {
          model: projectMasterModels.compactionMethod.model
        }
      }))
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* railway_line_section_name */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.railway-line-section-name')}
          placeholder={t('project.other.railway-ballast-material-data.details.railway-line-section-name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* ballast_material_type_id */}
        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.ballast-material-type-id')}
          placeholder={t('project.other.railway-ballast-material-data.details.ballast-material-type')}
          name="ballast_material_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={ballasterMaterialType?.payload.map((type) => ({
            label: type.title,
            value: type.id
          })) || [] || []}
        />

        {/* particle_size_distribution_grading */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.particle-size-distribution-grading')}
          placeholder={t('project.other.railway-ballast-material-data.details.particle-size-distribution-grading')}
          name="particle_size_distribution_grading"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* ballast_used_quantity */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.ballast-used-quantity')}
          placeholder={t('project.other.railway-ballast-material-data.details.ballast-used-quantity')}
          name="ballast_used_quantity"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* ballast_source_id */}
        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.ballast-source-id')}
          placeholder={t('project.other.railway-ballast-material-data.details.ballast-source-id')}
          name="ballast_source_id"
          size="small"
          sx={{ mb: 2 }}
          options={ballastSources?.payload.map((type) => ({
            label: type.title,
            value: type.id
          })) || [] || []}
        />

        {/* ballast_material_size */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.ballast-material-size')}
          placeholder={t('project.other.railway-ballast-material-data.details.ballast-material-size')}
          name="ballast_material_size"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* ballast_layer_thickness */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.ballast-layer-thickness')}
          placeholder={t('project.other.railway-ballast-material-data.details.ballast-layer-thickness')}
          name="ballast_layer_thickness"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* compaction_method_id */}
        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.compaction-method-id')}
          placeholder={t('project.other.railway-ballast-material-data.details.compaction-method-id')}
          name="compaction_method_id"
          size="small"
          sx={{ mb: 2 }}
          options={compactionMethods?.payload.map((type) => ({
            label: type.title,
            value: type.id
          })) || [] || []}
        />

        {/* remark */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast-material-data.details.remark')}
          placeholder={t('project.other.railway-ballast-material-data.details.remark')}
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

export default RailwayBallastForm;
