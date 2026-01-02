import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { NetworkCoverage, TelecomInfrastructureComponent } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface NetworkCoverageFormProps {
  formik: FormikProps<NetworkCoverage>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: String;
  telecomInfrastructureComponents: TelecomInfrastructureComponent[];
  mobileNetworkTypeMap: Map<string, string>;
}

const NetworkCoverageForm: React.FC<NetworkCoverageFormProps> = ({ projectId, file, onFileChange, telecomInfrastructureComponents, mobileNetworkTypeMap }) => {
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
          label={transl('project.other.telecom-infrastructure.title')}
          name="telecom_infrastructure_id"
          options={telecomInfrastructureComponents.map((item) => ({
            value: item.id,
            label: mobileNetworkTypeMap.get(item.mobile_network_type_id) || 'N/A'
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

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.network-coverage.details.total-coverage-area')}
              placeholder={transl('project.other.network-coverage.details.total-coverage-area')}
              name="total_coverage_area"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.network-coverage.details.coverage-population-number')}
              placeholder={transl('project.other.network-coverage.details.coverage-population-number')}
              name="coverage_population_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.network-coverage.details.active-users-number')}
              placeholder={transl('project.other.network-coverage.details.active-users-number')}
              name="active_users_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.network-coverage.details.average-download-speed')}
              placeholder={transl('project.other.network-coverage.details.average-download-speed')}
              name="average_download_speed"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.network-coverage.details.average-upload-speed')}
              placeholder={transl('project.other.network-coverage.details.average-upload-speed')}
              name="average_upload_speed"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.network-coverage.details.signal-strength')}
              placeholder={transl('project.other.network-coverage.details.signal-strength')}
              name="signal_strength"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.network-coverage.details.others')}
          placeholder={transl('project.other.network-coverage.details.others')}
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

export default NetworkCoverageForm;
