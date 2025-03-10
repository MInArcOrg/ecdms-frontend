import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { BridgeSubStructure } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import pierTypeMasterService from 'src/services/general/project/pier-type-master-service';

import { useQuery } from '@tanstack/react-query';

interface BridgeSubStructureFormProps {
  formik: FormikProps<BridgeSubStructure>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const BridgeSubStructureForm: React.FC<BridgeSubStructureFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: pierTypes } = useQuery({
    queryKey: ['masterCategory', 'pierType'],
    queryFn: () => pierTypeMasterService.getAll({})
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.name')}
          placeholder={transl('project.other.bridge-sub-structure.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.bridge-name')}
          placeholder={transl('project.other.bridge-sub-structure.details.bridge-name')}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.abutment-a1-height')}
          placeholder={transl('project.other.bridge-sub-structure.details.abutment-a1-height')}
          name="abutment_a1_height"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.abutment-a1-width')}
          placeholder={transl('project.other.bridge-sub-structure.details.abutment-a1-width')}
          name="abutment_a1_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.abutment-a2-height')}
          placeholder={transl('project.other.bridge-sub-structure.details.abutment-a2-height')}
          name="abutment_a2_height"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.abutment-a2-width')}
          placeholder={transl('project.other.bridge-sub-structure.details.abutment-a2-width')}
          name="abutment_a2_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.wing-wall-length')}
          placeholder={transl('project.other.bridge-sub-structure.details.wing-wall-length')}
          name="wing_wall_length"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="pier_type_id"
          label={transl('project.other.bridge-sub-structure.details.pier-type-id')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier-type-id')}
          options={
            pierTypes?.payload?.map((pierType) => ({
              value: pierType.id,
              label: pierType.title
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.piers-number')}
          placeholder={transl('project.other.bridge-sub-structure.details.piers-number')}
          name="piers_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.piers-dimension')}
          placeholder={transl('project.other.bridge-sub-structure.details.piers-dimension')}
          name="piers_dimension"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.pier1-height')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier1-height')}
          name="pier1_height"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.pier1-width')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier1-width')}
          name="pier1_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.pier2-height')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier2-height')}
          name="pier2_height"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.pier2-width')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier2-width')}
          name="pier2_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default BridgeSubStructureForm;
