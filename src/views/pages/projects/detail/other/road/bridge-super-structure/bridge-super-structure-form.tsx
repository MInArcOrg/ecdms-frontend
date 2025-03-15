"use client"

import { Grid } from '@mui/material';
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import { BridgeSuperStructure } from 'src/types/project/other';
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface BridgeSuperStructureFormProps {
  formik: FormikProps<BridgeSuperStructure>;
}

const BridgeSuperStructureForm: React.FC<BridgeSuperStructureFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: bridgeStructureTypes } = useQuery({
    queryKey: ["bridge-structure-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.bridgeStructureType.model },
      }),
  });

  const { data: spanSupportTypes } = useQuery({
    queryKey: ["span-support-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.spanSupportType.model },
      }),
  });

  const { data: deckSlabTypes } = useQuery({
    queryKey: ["deck-slab-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.deckSlabType.model },
      }),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.name')}
          placeholder={transl('project.other.bridge-super-structure.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.bridge-name')}
          placeholder={transl('project.other.bridge-super-structure.details.bridge-name')}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-super-structure.details.bridge-structure-type-id')}
          placeholder={transl('project.other.bridge-super-structure.details.bridge-structure-type-id')}
          name="bridge_structure_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            bridgeStructureTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.span-number')}
          placeholder={transl('project.other.bridge-super-structure.details.span-number')}
          name="span_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.span-composition')}
          placeholder={transl('project.other.bridge-super-structure.details.span-composition')}
          name="span_composition"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.total-span-length')}
          placeholder={transl('project.other.bridge-super-structure.details.total-span-length')}
          name="total_span_length"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.carriage-width')}
          placeholder={transl('project.other.bridge-super-structure.details.carriage-width')}
          name="carriage_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.side-walk-width')}
          placeholder={transl('project.other.bridge-super-structure.details.side-walk-width')}
          name="side_walk_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.lane-number')}
          placeholder={transl('project.other.bridge-super-structure.details.lane-number')}
          name="lane_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-super-structure.details.span-support-type-id')}
          placeholder={transl('project.other.bridge-super-structure.details.span-support-type-id')}
          name="span_support_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            spanSupportTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.bridge-super-structure.details.deck-slab-type-id')}
          placeholder={transl('project.other.bridge-super-structure.details.deck-slab-type-id')}
          name="deck_slab_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            deckSlabTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.girder-number')}
          placeholder={transl('project.other.bridge-super-structure.details.girder-number')}
          name="girder_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.girder-depth')}
          placeholder={transl('project.other.bridge-super-structure.details.girder-depth')}
          name="girder_depth"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.girder-spacing')}
          placeholder={transl('project.other.bridge-super-structure.details.girder-spacing')}
          name="girder_spacing"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.bridge-super-structure.details.girder-width')}
          placeholder={transl('project.other.bridge-super-structure.details.girder-width')}
          name="girder_width"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default BridgeSuperStructureForm;
