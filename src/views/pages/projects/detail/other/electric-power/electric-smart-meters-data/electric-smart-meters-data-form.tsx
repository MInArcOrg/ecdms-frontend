'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { ElectricSmartMetersData, MiniGridStation } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelect from 'src/views/shared/form/custom-select';
import { generateYears } from 'src/utils/genertor/date';
import moment from 'moment';

interface ElectricSmartMetersDataFormProps {
  formik: FormikProps<ElectricSmartMetersData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  miniGridStations: MiniGridStation[];
  smartMeterModels: any[];
  smartMeterTypes: any[];
}

const ElectricSmartMetersDataForm: React.FC<ElectricSmartMetersDataFormProps> = ({
  formik,
  file,
  onFileChange,
  miniGridStations,
  smartMeterModels,
  smartMeterTypes
}) => {
  const { t: transl } = useTranslation();
  const years = generateYears(1990, moment().year()).map((year) => ({ label: year.toString(), value: year.toString() }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.electric-smart-meters-data.general-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.electric-smart-meters-data.details.mini-grid-station-id')}
              name="mini_grid_station_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                miniGridStations?.map((station: MiniGridStation) => ({
                  label: station.name,
                  value: station.id
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
              label={transl('project.other.electric-smart-meters-data.details.name')}
              placeholder={transl('project.other.electric-smart-meters-data.details.name')}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.electric-smart-meters-data.details.owner-operator')}
              placeholder={transl('project.other.electric-smart-meters-data.details.owner-operator')}
              name="owner_operator"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.electric-smart-meters-data.technical-specifications')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.electric-smart-meters-data.details.facility-type')}
              name="facility_type"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: 'Oil Immersed', value: 'Oil Immersed' },
                { label: 'Dry Type', value: 'Dry Type' }
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.electric-smart-meters-data.details.service-area')}
              placeholder={transl('project.other.electric-smart-meters-data.details.service-area')}
              name="service_area"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.km2')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.electric-smart-meters-data.details.manufacturer')}
              placeholder={transl('project.other.electric-smart-meters-data.details.manufacturer')}
              name="manufacturer"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.electric-smart-meters-data.details.model-id')}
              name="model_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                smartMeterModels?.map((model: any) => ({
                  label: model.title,
                  value: model.id
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl('project.other.electric-smart-meters-data.details.smart-meter-type-id')}
              name="smart_meter_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                smartMeterTypes?.map((type: any) => ({
                  label: type.title,
                  value: type.id
                })) || []
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect options={years} fullWidth label={transl('stakeholder.safety-equipment.year')} name="installation_year" size="small" sx={{ mb: 2 }} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.electric-smart-meters-data.details.smart-meters-installed-number')}
              placeholder={transl('project.other.electric-smart-meters-data.details.smart-meters-installed-number')}
              name="smart_meters_installed_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.electric-smart-meters-data.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.electric-smart-meters-data.details.remark')}
          placeholder={transl('project.other.electric-smart-meters-data.details.remark')}
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

export default ElectricSmartMetersDataForm;
