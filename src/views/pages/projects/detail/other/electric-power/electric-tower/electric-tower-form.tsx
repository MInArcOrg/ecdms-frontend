import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiService from 'src/services/project/project-other-service';
import { ElectricTower, TransmissionLine } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ElectricTowerFormProps {
  formik: FormikProps<ElectricTower>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const ElectricTowerForm: React.FC<ElectricTowerFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();
  const { data: transmissionLines } = useQuery({
    queryKey: ['transmissionline', projectId],
    queryFn: () =>
      projectOtherApiService<TransmissionLine>().getAll('transmissionline', {
        filter: { project_id: projectId }
      })
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          size="small"
          name="transmissionline_id"
          label={t('project.other.transformer.details.transmissionline')}
          options={
            transmissionLines?.payload?.map((tranmissionLine) => ({
              value: tranmissionLine.id,
              label: tranmissionLine.name
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.electric-tower.details.overall-length')}
          placeholder={t('project.other.electric-tower.details.overall-length')}
          name="overall_length"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.electric-tower.details.embedded-length')}
          placeholder={t('project.other.electric-tower.details.embedded-length')}
          name="embedded_length"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.electric-tower.details.columns')}
          placeholder={t('project.other.electric-tower.details.columns')}
          name="columns"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.electric-tower.details.braces')}
          placeholder={t('project.other.electric-tower.details.braces')}
          name="braces"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.electric-tower.details.beam-cross-arms')}
          placeholder={t('project.other.electric-tower.details.beam-cross-arms')}
          name="beam_cross_arms"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.electric-tower.details.brace-cross-arm')}
          placeholder={t('project.other.electric-tower.details.brace-cross-arm')}
          name="brace_cross_arm"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.electric-tower.details.elasticity-modulus')}
          placeholder={t('project.other.electric-tower.details.elasticity-modulus')}
          name="elasticity_modulus"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.electric-tower.details.poission-ratio')}
          placeholder={t('project.other.electric-tower.details.poission-ratio')}
          name="poission_ratio"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ElectricTowerForm;
