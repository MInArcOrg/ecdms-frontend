'use client';

import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { CulvertBasicData, CulvertConditionAssessment, RoadSegment } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface CulvertConditionAssessmentFormProps {
  formik: FormikProps<CulvertConditionAssessment>;
  projectId: string;
}

const CulvertConditionAssessmentForm: React.FC<CulvertConditionAssessmentFormProps> = ({ formik, projectId }) => {
  const { t } = useTranslation();
  const { data: culverts } = useQuery({
    queryKey: ['culvert-basic-datas', projectId],
    queryFn: () =>
      projectOtherApiSecondService<CulvertBasicData>().getAll(
        'culvert-basic-datas',
        dropDownConfig({
          filter: { project_id: projectId }
        })
      )
  });

  const { data: roadSegments } = useQuery({
    queryKey: ['road-segments', projectId],
    queryFn: () =>
      projectOtherApiService<RoadSegment>().getAll('roadsegment', {
        filter: { project_id: projectId }
      })
  });

  const { data: structureTypes } = useQuery({
    queryKey: [projectMasterModels.structureType.title],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.structureType.model }
        })
      )
  });

  const { data: conditionRatings } = useQuery({
    queryKey: [projectMasterModels.damageCondition.title],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.damageCondition.model }
        })
      )
  });

  const conditionOptions =
    conditionRatings?.payload?.map((item) => ({
      label: item.title,
      value: item.id
    })) || [];

  useEffect(() => {
    const selectedCulvertBasicDataId = formik.values.culvert_basic_data_id;

    if (!selectedCulvertBasicDataId) {
      formik.setFieldValue('culvert_id', '');
      formik.setFieldValue('road_segment_id', '');
      return;
    }

    const selectedCulvert = culverts?.payload?.find((item) => item.id === selectedCulvertBasicDataId);

    formik.setFieldValue('culvert_id', selectedCulvertBasicDataId);
    formik.setFieldValue('road_segment_id', selectedCulvert?.road_segment_id || '');
  }, [formik.values.culvert_basic_data_id, culverts?.payload]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.culvert-basic-data-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.culvert-basic-data-id')}
          name="culvert_basic_data_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            culverts?.payload?.map((item) => ({
              label: item?.name || `${item.id.slice(0, 5)}...`,
              value: item.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.road-segment-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.road-segment-id')}
          name="road_segment_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            roadSegments?.payload?.map((segment) => ({
              label: segment.name,
              value: segment.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.structure-type-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.structure-type-id')}
          name="structure_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            structureTypes?.payload?.map((item) => ({
              label: item.title,
              value: item.id
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.north-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.north-id')}
          name="north_id"
          size="small"
          sx={{ mb: 2 }}
          options={conditionOptions}
        />

        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.east-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.east-id')}
          name="east_id"
          size="small"
          sx={{ mb: 2 }}
          options={conditionOptions}
        />

        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.west-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.west-id')}
          name="west_id"
          size="small"
          sx={{ mb: 2 }}
          options={conditionOptions}
        />

        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.south-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.south-id')}
          name="south_id"
          size="small"
          sx={{ mb: 2 }}
          options={conditionOptions}
        />

        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.central-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.central-id')}
          name="central_id"
          size="small"
          sx={{ mb: 2 }}
          options={conditionOptions}
        />

        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.assessment-date')}
          name="assessment_date"
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="assessment_date" />}
        />
      </Grid>
    </Grid>
  );
};

export default CulvertConditionAssessmentForm;
