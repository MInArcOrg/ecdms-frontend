import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderMaterial } from 'src/types/stakeholder/stackholder-material';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';

interface MaterialFormProps {
  formik: FormikProps<StakeholderMaterial>;
  materialCategories: StakeholderMaterial[];
}

const MaterialForm: React.FC<MaterialFormProps> = ({ formik, materialCategories }) => {
  const { t } = useTranslation();

  const categoryOptions = materialCategories.map((category) => ({
    value: category.id,
    label: category.name
  }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.material.name')} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('stakeholder.material.category')}
          name="material_category"
          options={categoryOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.material.subcategory')} name="material_subcategory" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.material.description')}
          name="description"
          multiline
          rows={4}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.material.purpose')} name="purpose" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.material.quantity')} name="quantity" size="small" sx={{ mb: 2 }} type="number" />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.material.unit-price')} name="unit_price" size="small" sx={{ mb: 2 }} type="number" />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.material.current-situation')} name="current_situation" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.material.location')} name="location" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default MaterialForm;
