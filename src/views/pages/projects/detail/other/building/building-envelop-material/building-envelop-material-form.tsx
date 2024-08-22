import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BuildingEnvelopMaterial } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface BuildingEnvelopMaterialFormProps {
  formik: FormikProps<BuildingEnvelopMaterial>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const BuildingEnvelopMaterialForm: React.FC<BuildingEnvelopMaterialFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-envelop-material.form.exterior-walls')}
          placeholder={transl('project.other.building-envelop-material.form.exterior-walls')}
          name="exterior_walls"
          value={formik.values.exterior_walls}
          onChange={formik.handleChange}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-envelop-material.form.roof-assembly')}
          placeholder={transl('project.other.building-envelop-material.form.roof-assembly')}
          name="roof_assembly"
          value={formik.values.roof_assembly}
          onChange={formik.handleChange}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-envelop-material.form.exterior-windows')}
          placeholder={transl('project.other.building-envelop-material.form.exterior-windows')}
          name="exterior_windows"
          value={formik.values.exterior_windows}
          onChange={formik.handleChange}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-envelop-material.form.exterior-doors')}
          placeholder={transl('project.other.building-envelop-material.form.exterior-doors')}
          name="exterior_doors"
          value={formik.values.exterior_doors}
          onChange={formik.handleChange}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-envelop-material.form.shading-components')}
          placeholder={transl('project.other.building-envelop-material.form.shading-components')}
          name="shading_components"
          value={formik.values.shading_components}
          onChange={formik.handleChange}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-envelop-material.form.remark')}
          placeholder={transl('project.other.building-envelop-material.form.remark')}
          multiline
          rows={3}
          name="remark"
          value={formik.values.remark}
          onChange={formik.handleChange}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default BuildingEnvelopMaterialForm;
