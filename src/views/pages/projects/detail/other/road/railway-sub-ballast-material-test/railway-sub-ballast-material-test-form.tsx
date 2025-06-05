import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import {
  RailwaySubBallastMaterialTest
} from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { useQuery } from '@tanstack/react-query';
import { dropDownConfig } from 'src/configs/api-constants';

interface RailwaySubBallastMaterialTestFormProps {
  formik: FormikProps<RailwaySubBallastMaterialTest>;
}

const RailwaySubBallastMaterialTestForm: React.FC<RailwaySubBallastMaterialTestFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  const { data: subBallastMaterialTypeOptions } = useQuery({
    queryKey: [projectMasterModels.subBallastMaterialType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.subBallastMaterialType.model
          }
        })
      )
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.railway-line-section-name')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.railway-line-section-name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.sub-ballast-material-type-id')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.sub-ballast-material-type-id')}
          name="sub_ballast_material_type_id"
          size="small"
          options={subBallastMaterialTypeOptions?.payload.map(item => ({ value: item.id, label: item.title })) || []}
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.testing-method-used')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.testing-method-used')}
          name="testing_method_used"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.sampling-method')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.sampling-method')}
          name="sampling_method"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          type="number"
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.sample-size')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.sample-size')}
          name="sample_size"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.material-source')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.material-source')}
          name="material_source"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.sieve-analysis-results')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.sieve-analysis-results')}
          name="sieve_analysis_results"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.supplier')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.supplier')}
          name="supplier"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-material-test.details.remark')}
          placeholder={t('project.other.railway-sub-ballast-material-test.details.remark')}
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

export default RailwaySubBallastMaterialTestForm;