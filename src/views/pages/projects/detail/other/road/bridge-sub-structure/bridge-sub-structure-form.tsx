'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import { dropDownConfig } from 'src/configs/api-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import type { BridgeBasicData, BridgeSubStructure } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface BridgeSubStructureFormProps {
  formik: FormikProps<BridgeSubStructure>;
}

const BridgeSubStructureForm: React.FC<BridgeSubStructureFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: pierTypes } = useQuery({
    queryKey: ['pier-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.pierType.model }
      })
  });

  const { data: bridges } = useQuery({
    queryKey: ['bridges', formik.values.project_id],
    queryFn: () =>
      projectOtherApiService<BridgeBasicData>().getAll('bridge-basic-data', dropDownConfig({
        filter: {
          project_id: formik.values.project_id
        }
      }))
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

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.bridge-name')}
          placeholder={transl('project.other.bridge-sub-structure.details.bridge-name')}
          name="bridge_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            bridges?.payload.map((bridge) => ({
              label: bridge.name,
              value: bridge.id
            })) || []
          }

        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.abutment-a1-height')}
          placeholder={transl('project.other.bridge-sub-structure.details.abutment-a1-height')}
          name="abutment_a1_height"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.abutment-a1-width')}
          placeholder={transl('project.other.bridge-sub-structure.details.abutment-a1-width')}
          name="abutment_a1_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.abutment-a2-height')}
          placeholder={transl('project.other.bridge-sub-structure.details.abutment-a2-height')}
          name="abutment_a2_height"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.abutment-a2-width')}
          placeholder={transl('project.other.bridge-sub-structure.details.abutment-a2-width')}
          name="abutment_a2_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.wing-wall-length')}
          placeholder={transl('project.other.bridge-sub-structure.details.wing-wall-length')}
          name="wing_wall_length"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.pier-type-id')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier-type-id')}
          name="pier_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            pierTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
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
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.pier1-width')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier1-width')}
          name="pier1_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.pier2-height')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier2-height')}
          name="pier2_height"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-sub-structure.details.pier2-width')}
          placeholder={transl('project.other.bridge-sub-structure.details.pier2-width')}
          name="pier2_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default BridgeSubStructureForm;
