import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { SatelliteNetwork, SatelliteNetworkCoverage } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface SatelliteNetworkCoverageFormProps {
  formik: FormikProps<SatelliteNetworkCoverage>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  satelliteNetworks: SatelliteNetwork[];
}

const SatelliteNetworkCoverageForm: React.FC<SatelliteNetworkCoverageFormProps> = ({ file, onFileChange, satelliteNetworks }) => {
  const { t: transl } = useTranslation();

  const { data: networkTypes } = useQuery({
    queryKey: ['network-types'],
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
          label={transl('project.other.satellite-network.title')}
          name="satellite_network_id"
          options={satelliteNetworks.map((item) => ({
            value: item.id,
            label: item.name || 'N/A'
          }))}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomSelect
          fullWidth
          label={transl('project.other.satellite-network-coverage.details.network-infrastructure-type-id')}
          placeholder={transl('project.other.satellite-network-coverage.details.network-infrastructure-type-id')}
          name="network_infrastructure_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            networkTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-coverage.details.total-coverage-area')}
          placeholder={transl('project.other.satellite-network-coverage.details.total-coverage-area')}
          name="total_coverage_area"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-coverage.details.coverage-population-no')}
          placeholder={transl('project.other.satellite-network-coverage.details.coverage-population-no')}
          name="coverage_population_no"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-coverage.details.active-users-no')}
          placeholder={transl('project.other.satellite-network-coverage.details.active-users-no')}
          name="active_users_no"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-coverage.details.average-download-speed')}
          placeholder={transl('project.other.satellite-network-coverage.details.average-download-speed')}
          name="average_download_speed"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-coverage.details.average-upload-speed')}
          placeholder={transl('project.other.satellite-network-coverage.details.average-upload-speed')}
          name="average_upload_speed"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-coverage.details.signal-strength')}
          placeholder={transl('project.other.satellite-network-coverage.details.signal-strength')}
          name="signal_strength"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-coverage.details.others')}
          placeholder={transl('project.other.satellite-network-coverage.details.others')}
          name="others"
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

export default SatelliteNetworkCoverageForm;
