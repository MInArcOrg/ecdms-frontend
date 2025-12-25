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
import type { BridgeBasicData, BridgeFoundation } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface BridgeFoundationFormProps {
  formik: FormikProps<BridgeFoundation>;
}

const BridgeFoundationForm: React.FC<BridgeFoundationFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: abutmentTypes } = useQuery({
    queryKey: ['abutment-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.abutmentType.model }
      })
  });

  const { data: pierTypes } = useQuery({
    queryKey: ['pier-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.pierType.model }
      })
  });

  const { data: soilTypes } = useQuery({
    queryKey: ['soil-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.soilType.model }
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
          label={transl('project.other.bridge-foundation.details.name')}
          placeholder={transl('project.other.bridge-foundation.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-foundation.details.bridge-name')}
          placeholder={transl('project.other.bridge-foundation.details.bridge-name')}
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

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-foundation.details.abutment-type-id')}
          placeholder={transl('project.other.bridge-foundation.details.abutment-type-id')}
          name="abutment_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            abutmentTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-foundation.details.pier-type-id')}
          placeholder={transl('project.other.bridge-foundation.details.pier-type-id')}
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
          label={transl('project.other.bridge-foundation.details.abutment-foundation-size')}
          placeholder={transl('project.other.bridge-foundation.details.abutment-foundation-size')}
          name="abutment_foundation_size"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.pier-foundation-size')}
          placeholder={transl('project.other.bridge-foundation.details.pier-foundation-size')}
          name="pier_foundation_size"
          size="small"
          type="number"
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
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-foundation.details.pier-pile-depth')}
          placeholder={transl('project.other.bridge-foundation.details.pier-pile-depth')}
          name="pier_pile_depth"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-foundation.details.soil-type-id')}
          placeholder={transl('project.other.bridge-foundation.details.soil-type-id')}
          name="soil_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            soilTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />
      </Grid>
    </Grid>
  );
};

export default BridgeFoundationForm;
