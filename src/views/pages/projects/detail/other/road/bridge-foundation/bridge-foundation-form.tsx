import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { BridgeFoundation } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import abutmentTypeMasterService from 'src/services/general/project/abutment-type-master-service';
import pierTypeMasterService from 'src/services/general/project/pier-type-master-service';
import soilTypeMasterService from 'src/services/general/project/soil-type-master-service';

import { useQuery } from '@tanstack/react-query';

interface BridgeFoundationFormProps {
  formik: FormikProps<BridgeFoundation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const BridgeFoundationForm: React.FC<BridgeFoundationFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: abutmentTypes } = useQuery({
    queryKey: ['masterCategory', 'abutmentType'],
    queryFn: () => abutmentTypeMasterService.getAll({})
  });

  const { data: pierTypes } = useQuery({
    queryKey: ['masterCategory', 'pierType'],
    queryFn: () => pierTypeMasterService.getAll({})
  });

  const { data: soilTypes } = useQuery({
    queryKey: ['masterCategory', 'soilType'],
    queryFn: () => soilTypeMasterService.getAll({})
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.name')}
          placeholder={transl('project.other.bridge-foundation.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.bridge-name')}
          placeholder={transl('project.other.bridge-foundation.details.bridge-name')}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="abutment_type_id"
          label={transl('project.other.bridge-foundation.details.abutment-type-id')}
          placeholder={transl('project.other.bridge-foundation.details.abutment-type-id')}
          options={
            abutmentTypes?.payload?.map((abutmentType) => ({
              value: abutmentType.id,
              label: abutmentType.title
            })) || []
          }
        />
        <CustomSelectBox
          size="small"
          name="pier_type_id"
          label={transl('project.other.bridge-foundation.details.pier-type-id')}
          placeholder={transl('project.other.bridge-foundation.details.pier-type-id')}
          options={
            pierTypes?.payload?.map((pierType) => ({
              value: pierType.id,
              label: pierType.title
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.abutment-foundation-size')}
          placeholder={transl('project.other.bridge-foundation.details.abutment-foundation-size')}
          name="abutment_foundation_size"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.pier-foundation-size')}
          placeholder={transl('project.other.bridge-foundation.details.pier-foundation-size')}
          name="pier_foundation_size"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.abutment-pile-number')}
          placeholder={transl('project.other.bridge-foundation.details.abutment-pile-number')}
          name="abutment_pile_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.pier-pile-number')}
          placeholder={transl('project.other.bridge-foundation.details.pier-pile-number')}
          name="pier_pile_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.abutment-pile-depth')}
          placeholder={transl('project.other.bridge-foundation.details.abutment-pile-depth')}
          name="abutment_pile_depth"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.pier-pile-depth')}
          placeholder={transl('project.other.bridge-foundation.details.pier-pile-depth')}
          name="pier_pile_depth"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="soil_type_id"
          label={transl('project.other.bridge-foundation.details.soil-type-id')}
          placeholder={transl('project.other.bridge-foundation.details.soil-type-id')}
          options={
            soilTypes?.payload?.map((soilType) => ({
              value: soilType.id,
              label: soilType.title
            })) || []
          }
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default BridgeFoundationForm;
