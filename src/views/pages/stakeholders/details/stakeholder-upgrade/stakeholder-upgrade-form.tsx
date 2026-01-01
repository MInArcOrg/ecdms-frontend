import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { stakeholderMasterModels } from 'src/constants/master-data/stakeholder-general-master-constants';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import stakeholderGeneralMasterDataApiService from 'src/services/general/stakeholder-general-master-data-service';
import type { StakeholderUpgrade } from 'src/types/stakeholder/stakeholder-upgrade';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface UpgradeFormProps {
  formik: FormikProps<StakeholderUpgrade>;
}

const UpgradeForm: React.FC<UpgradeFormProps> = ({ formik }) => {
  const { t } = useTranslation();
  const { data: upgradeTypes, isLoading: typesLoading } = useQuery({
    queryKey: ['upgrade-types'],
    queryFn: () => stakeholderGeneralMasterDataApiService.getAll(dropDownConfig(
      {
        filter: {
          model: stakeholderMasterModels.upgradeType.dbModel
        }
      }
    ))
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={t('stakeholder.stakeholder-upgrade.form.upgrade-type')}
          name="upgrade_type_id"
          size="small"
          options={upgradeTypes?.payload?.map((upgradeType) => ({
            label: upgradeType.title,
            value: upgradeType.id
          })) || []}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-upgrade.form.previous-level')}
          name="previous_level"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-upgrade.form.upgraded-level')}
          name="upgraded_level"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-upgrade.form.ownership-percentage')}
          name="ownership_percentage"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={4}
          label={t('stakeholder.stakeholder-upgrade.form.description')}
          name="description"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default UpgradeForm;
