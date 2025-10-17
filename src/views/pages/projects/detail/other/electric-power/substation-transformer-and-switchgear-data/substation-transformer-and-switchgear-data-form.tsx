'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { SubstationTransformerAndSwitchgearData, TransmissionLine } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelect from 'src/views/shared/form/custom-select';
import { useQuery } from '@tanstack/react-query';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface SubstationTransformerAndSwitchgearDataFormProps {
  formik: FormikProps<SubstationTransformerAndSwitchgearData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  transmissionLines: TransmissionLine[];
}

const SubstationTransformerAndSwitchgearDataForm: React.FC<SubstationTransformerAndSwitchgearDataFormProps> = ({
  formik,
  file,
  onFileChange,
  transmissionLines
}) => {
  const { t: transl } = useTranslation();

  // Fetch switchgear types for dropdown
  const { data: switchgearTypes } = useQuery({
    queryKey: ['switchgear-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.switchgearType.model }
      })
  });

  // Fetch circuit breaker types for dropdown
  const { data: circuitBreakerTypes } = useQuery({
    queryKey: ['circuit-breaker-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.circuitBreakerType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.substation-transformer-and-switchgear-data.general-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.substation-transformer-and-switchgear-data.details.transmission-line-id')}
              name="transmission_line_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                transmissionLines?.map((line: any) => ({
                  label: line.name,
                  value: line.id
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              required
              label={transl('project.other.substation-transformer-and-switchgear-data.details.name')}
              placeholder={transl('project.other.substation-transformer-and-switchgear-data.details.name')}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.substation-transformer-and-switchgear-data.transformer-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.substation-transformer-and-switchgear-data.details.transformer-type')}
              placeholder={transl('project.other.substation-transformer-and-switchgear-data.details.transformer-type')}
              name="transformer_type"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.substation-transformer-and-switchgear-data.details.transformers-number')}
              placeholder={transl('project.other.substation-transformer-and-switchgear-data.details.transformers-number')}
              name="transformers_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.substation-transformer-and-switchgear-data.details.transformer-capacity')}
              placeholder={transl('project.other.substation-transformer-and-switchgear-data.details.transformer-capacity')}
              name="transformer_capacity"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.mva')}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.substation-transformer-and-switchgear-data.details.input-voltage-level')}
              placeholder={transl('project.other.substation-transformer-and-switchgear-data.details.input-voltage-level')}
              name="input_voltage_level"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.kv')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.substation-transformer-and-switchgear-data.details.output-voltage-level')}
              placeholder={transl('project.other.substation-transformer-and-switchgear-data.details.output-voltage-level')}
              name="output_voltage_level"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.kv')}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.substation-transformer-and-switchgear-data.switchgear-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.substation-transformer-and-switchgear-data.details.switchgear-type-id')}
              name="switchgear_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                switchgearTypes?.payload.map((type: any) => ({
                  label: type.title,
                  value: type.id
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.substation-transformer-and-switchgear-data.details.circuit-breaker-type-id')}
              name="circuit_breaker_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                circuitBreakerTypes?.payload.map((type: any) => ({
                  label: type.title,
                  value: type.id
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.substation-transformer-and-switchgear-data.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.substation-transformer-and-switchgear-data.details.other-equipment')}
              placeholder={transl('project.other.substation-transformer-and-switchgear-data.details.other-equipment')}
              name="other_equipment"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.substation-transformer-and-switchgear-data.details.remark')}
          placeholder={transl('project.other.substation-transformer-and-switchgear-data.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default SubstationTransformerAndSwitchgearDataForm;
