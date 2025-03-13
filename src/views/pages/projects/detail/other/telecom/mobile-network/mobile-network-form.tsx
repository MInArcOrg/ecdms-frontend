import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { MobileNetwork } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface MobileNetworkFormProps {
  formik: FormikProps<MobileNetwork>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const MobileNetworkForm: React.FC<MobileNetworkFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: mobileNetworkTypes } = useQuery({
    queryKey: ['mobile-network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.mobile-network.details.mobile-network-type')}
          placeholder={transl('project.other.mobile-network.details.mobile-network-type')}
          name="mobile_network_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            mobileNetworkTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSwitch
              name="call_towers"
              label={transl('project.other.mobile-network.details.call-towers')}
              checked={formik.values.call_towers || false}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSwitch
              name="antennas"
              label={transl('project.other.mobile-network.details.antennas')}
              checked={formik.values.antennas || false}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSwitch
              name="base_stations"
              label={transl('project.other.mobile-network.details.base_stations')}
              checked={formik.values.base_stations || false}
              onChange={formik.handleChange}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSwitch
              name="repeaters"
              label={transl('project.other.mobile-network.details.repeaters')}
              checked={formik.values.repeaters || false}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSwitch
              name="switches"
              label={transl('project.other.mobile-network.details.switches')}
              checked={formik.values.switches || false}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.mobile-network.details.others')}
          placeholder={transl('project.other.mobile-network.details.others')}
          name="others"
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default MobileNetworkForm;
