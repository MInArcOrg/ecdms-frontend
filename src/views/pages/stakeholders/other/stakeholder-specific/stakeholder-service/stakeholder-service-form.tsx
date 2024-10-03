import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { StakeholderService } from 'src/types/stakeholder/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderServiceFormProps {
  formik: FormikProps<StakeholderService>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderServiceForm: React.FC<StakeholderServiceFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  const { data: constructionRelatedServices } = useQuery({
    queryKey: ['general-master', 'construction-related-services'],
    queryFn: () => generalMasterDataApiService.getAll('construction-related-services', {})
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomSelect
          size="small"
          sx={{ mb: 2 }}
          name="construction_related_service_id"
          label={transl('stakeholder.other.stakeholder-service.details.stakeholder-service')}
          placeholder={transl('stakeholder.other.stakeholder-service.details.stakeholder-service')}
          options={
            constructionRelatedServices?.payload?.map((service) => ({
              value: service.id,
              label: service.service_type // Assuming you want to display the service_type
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('stakeholder.other.stakeholder-service.details.unit-price')}
          placeholder={transl('stakeholder.other.stakeholder-service.details.unit-price')}
          type="number"
          name="unit_price"
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

export default StakeholderServiceForm;
