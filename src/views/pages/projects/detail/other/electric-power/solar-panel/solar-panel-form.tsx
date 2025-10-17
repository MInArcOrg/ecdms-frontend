'use client';

import { Grid, Typography, Divider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { SolarPanel } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface SolarPanelFormProps {
  formik: FormikProps<SolarPanel>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const SolarPanelForm: React.FC<SolarPanelFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: solarPanelTypes } = useQuery({
    queryKey: ['solar-panel-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.solarPanelType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.solar-panel.panel-details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-panel.details.manufacturer')}
              placeholder={transl('project.other.solar-panel.details.manufacturer')}
              name="manufacturer"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-panel.details.model')}
              placeholder={transl('project.other.solar-panel.details.model')}
              name="model"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomSelect
          fullWidth
          label={transl('project.other.solar-panel.details.solar-panel-type')}
          placeholder={transl('project.other.solar-panel.details.solar-panel-type')}
          name="solar_panel_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            solarPanelTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-panel.details.solar-panels-number')}
              placeholder={transl('project.other.solar-panel.details.solar-panels-number')}
              name="solar_panels_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-panel.details.each-solar-panel-capacity')}
              placeholder={transl('project.other.solar-panel.details.each-solar-panel-capacity')}
              name="each_solar_panel_capacity"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.solar-panel.inverter-details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-panel.details.inverter-manufacturer')}
              placeholder={transl('project.other.solar-panel.details.inverter-manufacturer')}
              name="inverter_manufacturer"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-panel.details.inverter-model')}
              placeholder={transl('project.other.solar-panel.details.inverter-model')}
              name="inverter_model"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.solar-panel.details.inverters-number')}
          placeholder={transl('project.other.solar-panel.details.inverters-number')}
          name="inverters_number"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.solar-panel.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.solar-panel.details.other-equipment')}
          placeholder={transl('project.other.solar-panel.details.other-equipment')}
          name="other_equipment"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.solar-panel.details.remark')}
          placeholder={transl('project.other.solar-panel.details.remark')}
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

export default SolarPanelForm;
