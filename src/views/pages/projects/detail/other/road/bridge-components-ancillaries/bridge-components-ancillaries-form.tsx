'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import type { BridgeBasicData, BridgeComponentAndAncillaries } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface BridgeComponentsAncillariesFormProps {
  formik: FormikProps<BridgeComponentAndAncillaries>;
}

const BridgeComponentsAncillariesForm: React.FC<BridgeComponentsAncillariesFormProps> = ({ formik }) => {
  const { data: bridges } = useQuery({
    queryKey: ['bridges', formik.values.project_id],
    queryFn: () =>
      projectOtherApiService<BridgeBasicData>().getAll(
        'bridge-basic-data',
        dropDownConfig({
          filter: {
            project_id: formik.values.project_id
          }
        })
      )
  });

  const { data: expansionJointTypes } = useQuery({
    queryKey: ['expansion-joint-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.expansionJointType.model }
      })
  });

  const { data: guardRailTypes } = useQuery({
    queryKey: ['guard-rail-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.guardRailType.model }
      })
  });

  const { data: surfaceTypes } = useQuery({
    queryKey: ['surface-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.surfaceType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label="Bridge Name"
          placeholder="Bridge Name"
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
          label="Expansion Joint Type"
          placeholder="Expansion Joint Type"
          name="expansion_joint_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            expansionJointTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label="Guard Railing Type"
          placeholder="Guard Railing Type"
          name="guard_railing_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            guardRailTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label="Abutment Bearing Type"
          placeholder="Abutment Bearing Type"
          name="abutment_bearing_type_id"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label="Piers Bearing Type"
          placeholder="Piers Bearing Type"
          name="piers_bearing_type_id"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label="Surface Type"
          placeholder="Surface Type"
          name="surface_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            surfaceTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label="Remark"
          placeholder="Remark"
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default BridgeComponentsAncillariesForm;

