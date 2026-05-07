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
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { CulvertBasicData, CulvertConditionAssessment } from 'src/types/project/other';
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
    if(!formik.values.culvert_id) return;
       if(!formik.values.culvert_id) return;
    formik.setFieldValue('road_segment_id', culverts?.payload?.find((item) => item.id === formik.values.culvert_id)?.road_segment_id || '');
  }, [formik.values.culvert_id]);
  console.log('formik errors', formik.errors)
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.culvert-basic-data-id')}
          placeholder={t('project.other.culvert-condition-assessment.details.culvert-basic-data-id')}
          name="culvert_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            culverts?.payload?.map((item) => ({
              label: item?.name || `${item.id.slice(0, 5)}...`,
              value: item.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.culvert-condition-assessment.details.name')}
          placeholder={t('project.other.culvert-condition-assessment.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
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

