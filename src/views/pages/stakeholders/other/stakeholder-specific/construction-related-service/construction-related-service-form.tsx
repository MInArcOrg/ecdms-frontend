import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { constructionRelatedServices } from 'src/constants/stakeholder-constants';
import { ConstructionRelatedService } from 'src/types/stakeholder/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ConstructionRelatedServiceFormProps {
  formik: FormikProps<ConstructionRelatedService>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ConstructionRelatedServiceForm: React.FC<ConstructionRelatedServiceFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* Service Type */}
        <CustomSelect
          size="small"
          sx={{ mb: 2 }}
          name="service_type"
          label={transl('stakeholder.other.construction-related-service.details.service-type')}
          placeholder={transl('stakeholder.other.construction-related-service.details.service-type')}
          options={
            constructionRelatedServices?.map((service) => ({
              value: service.value,
              label: service.label
            })) || []
          }
        />

        {/* Specification Detail */}
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.other.construction-related-service.details.specification-detail')}
          placeholder={transl('stakeholder.other.construction-related-service.details.specification-detail')}
          name="specification_detail"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        {/* Measurement Unit */}
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.other.construction-related-service.details.measurement-unit')}
          placeholder={transl('stakeholder.other.construction-related-service.details.measurement-unit')}
          name="measurement_unit"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* File Upload */}
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ConstructionRelatedServiceForm;
