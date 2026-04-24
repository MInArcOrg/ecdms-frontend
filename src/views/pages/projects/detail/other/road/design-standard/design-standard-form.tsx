'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import type { DesignStandard, RoadSegment } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface DesignStandardFormProps {
  formik: FormikProps<DesignStandard>;
}

const DesignStandardForm: React.FC<DesignStandardFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: roadSegments } = useQuery({
    queryKey: ['roadSegments', formik.values.project_id],
    queryFn: () =>
      projectOtherApiService<RoadSegment>().getAll('roadsegment', dropDownConfig({
        filter: {
          project_id: formik.values.project_id
        }
      }))
  });

  const { data: functionalClassifications } = useQuery({
    queryKey: ['functional-classifications'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: { model: projectMasterModels.functionalClassification.model }
      }))
  });

  const { data: designClassifications } = useQuery({
    queryKey: ['design-classifications'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: { model: projectMasterModels.designClassification.model }
      }))
  });

  const { data: designStandards } = useQuery({
    queryKey: ['design-standards'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: { model: projectMasterModels.designStandard.model }
      }))
  });

  const { data: designTrafficFlows } = useQuery({
    queryKey: ['design-traffic-flows'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(dropDownConfig({
        filter: { model: projectMasterModels.designTrafficFlow.model }
      }))
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.design-standard.details.road-segment')}
          placeholder={transl('project.other.design-standard.details.road-segment')}
          name="road_segment_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            roadSegments?.payload.map((segment) => ({
              label: segment.name,
              value: segment.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.design-standard.details.functional-classification')}
          placeholder={transl('project.other.design-standard.details.functional-classification')}
          name="functional_classification_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            functionalClassifications?.payload.map((item) => ({
              label: item.title,
              value: item.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.design-standard.details.design-classification')}
          placeholder={transl('project.other.design-standard.details.design-classification')}
          name="design_classification_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            designClassifications?.payload.map((item) => ({
              label: item.title,
              value: item.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.design-standard.details.design-standard-id')}
          placeholder={transl('project.other.design-standard.details.design-standard-id')}
          name="design_standard_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            designStandards?.payload.map((item) => ({
              label: item.title,
              value: item.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.design-standard.details.design-traffic-flow')}
          placeholder={transl('project.other.design-standard.details.design-traffic-flow')}
          name="design_traffic_flow_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            designTrafficFlows?.payload.map((item) => ({
              label: item.title,
              value: item.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.design-standard.details.design-life-time-years')}
          placeholder={transl('project.other.design-standard.details.design-life-time-years')}
          name="design_life_time_years"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.design-standard.details.segment-number')}
          placeholder={transl('project.other.design-standard.details.segment-number')}
          name="segment_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.design-standard.details.remark')}
          placeholder={transl('project.other.design-standard.details.remark')}
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

export default DesignStandardForm;

