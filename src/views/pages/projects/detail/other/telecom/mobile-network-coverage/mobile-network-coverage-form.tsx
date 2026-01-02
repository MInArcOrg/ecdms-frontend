import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { MobileNetwork, MobileNetworkCoverage } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface MobileNetworkCoverageFormProps {
  formik: FormikProps<MobileNetworkCoverage>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  mobileNetworks: MobileNetwork[];
}

const MobileNetworkCoverageForm: React.FC<MobileNetworkCoverageFormProps> = ({ formik, file, onFileChange, mobileNetworks }) => {
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
          label={transl('project.other.mobile-network.title')}
          name="mobile_network_id"
          options={mobileNetworks.map((item) => ({
            value: item.id,
            label: item.mobilenetworktype.title || 'N/A'
          }))}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomSelect
          fullWidth
          label={transl('project.other.network-coverage.details.network-infrastructure-type')}
          placeholder={transl('project.other.network-coverage.details.network-infrastructure-type')}
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
          label={transl('project.other.network-coverage.details.total-coverage-area')}
          placeholder={transl('project.other.network-coverage.details.total-coverage-area')}
          name="total_coverage_area"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.network-coverage.details.coverage-population-number')}
          placeholder={transl('project.other.network-coverage.details.coverage-population-number')}
          name="coverage_population_number"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.network-coverage.details.active-users-number')}
          placeholder={transl('project.other.network-coverage.details.active-users-number')}
          name="active_users_number"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.network-coverage.details.average-download-speed')}
          placeholder={transl('project.other.network-coverage.details.average-download-speed')}
          name="average_download_speed"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.network-coverage.details.average-upload-speed')}
          placeholder={transl('project.other.network-coverage.details.average-upload-speed')}
          name="average_upload_speed"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.network-coverage.details.signal-strength')}
          placeholder={transl('project.other.network-coverage.details.signal-strength')}
          name="signal_strength"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.network-coverage.details.others')}
          placeholder={transl('project.other.network-coverage.details.others')}
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

export default MobileNetworkCoverageForm;
