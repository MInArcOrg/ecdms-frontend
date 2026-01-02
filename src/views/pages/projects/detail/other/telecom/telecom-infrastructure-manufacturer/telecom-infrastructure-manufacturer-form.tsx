'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { TelecomInfrastructureManufacturer, TelecomInfrastructureComponent } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';

interface TelecomInfrastructureManufacturerFormProps {
  formik: FormikProps<TelecomInfrastructureManufacturer>;
  telecomInfrastructureComponents: TelecomInfrastructureComponent[];
  mobileNetworkTypeMap: Map<string, string>;
}

const TelecomInfrastructureManufacturerForm: React.FC<TelecomInfrastructureManufacturerFormProps> = ({
  formik,
  telecomInfrastructureComponents,
  mobileNetworkTypeMap
}) => {
  const { t: transl } = useTranslation();
  console.log('formik values', formik.values)
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={transl('project.other.telecom-infrastructure.title')}
          name="telecom_infrastructure_id"
          options={telecomInfrastructureComponents.map((item) => ({
            value: item.id,
            label: mobileNetworkTypeMap.get(item.mobile_network_type_id) || 'N/A'
          }))}
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.telecom-infrastructure-manufacturer.details.title')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.cables')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.cables')}
          name="cables"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.wires')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.wires')}
          name="wires"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.routers')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.routers')}
          name="routers"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.switches')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.switches')}
          name="switches"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.hubs')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.hubs')}
          name="hubs"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.repeaters')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.repeaters')}
          name="repeaters"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.antennas')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.antennas')}
          name="antennas"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.towers')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.towers')}
          name="towers"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure-manufacturer.details.remark')}
          placeholder={transl('project.other.telecom-infrastructure-manufacturer.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mt: 2, mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default TelecomInfrastructureManufacturerForm;
