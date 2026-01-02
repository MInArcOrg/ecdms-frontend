'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { ManufacturerOfMobileNetworkComponent, TelecomInfrastructureComponent } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';

interface ManufacturerOfMobileNetworkComponentFormProps {
  formik: FormikProps<ManufacturerOfMobileNetworkComponent>;
  telecomInfrastructureComponents: TelecomInfrastructureComponent[];
  mobileNetworkTypeMap: Map<string, string>;
}

const ManufacturerOfMobileNetworkComponentForm: React.FC<ManufacturerOfMobileNetworkComponentFormProps> = ({
  formik,
  telecomInfrastructureComponents,
  mobileNetworkTypeMap
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={transl('project.other.mobile-network-component-manufacturer.details.mobile_network_id')}
          name="mobile_network_id"
          options={telecomInfrastructureComponents.map((item) => ({
            value: item.id,
            label: mobileNetworkTypeMap.get(item.mobile_network_type_id) || 'N/A'
          }))}
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.mobile-network-component-manufacturer.details.title')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.mobile-network-component-manufacturer.details.cell')}
          placeholder={transl('project.other.mobile-network-component-manufacturer.details.cell')}
          name="cell"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.mobile-network-component-manufacturer.details.towers')}
          placeholder={transl('project.other.mobile-network-component-manufacturer.details.towers')}
          name="towers"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.mobile-network-component-manufacturer.details.antennas')}
          placeholder={transl('project.other.mobile-network-component-manufacturer.details.antennas')}
          name="antennas"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.mobile-network-component-manufacturer.details.base-stations')}
          placeholder={transl('project.other.mobile-network-component-manufacturer.details.base-stations')}
          name="base_stations"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.mobile-network-component-manufacturer.details.repeaters')}
          placeholder={transl('project.other.mobile-network-component-manufacturer.details.repeaters')}
          name="repeaters"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.mobile-network-component-manufacturer.details.switches')}
          placeholder={transl('project.other.mobile-network-component-manufacturer.details.switches')}
          name="switches"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.mobile-network-component-manufacturer.details.others')}
          placeholder={transl('project.other.mobile-network-component-manufacturer.details.others')}
          name="others"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />
      </Grid>
    </Grid>
  );
};

export default ManufacturerOfMobileNetworkComponentForm;
