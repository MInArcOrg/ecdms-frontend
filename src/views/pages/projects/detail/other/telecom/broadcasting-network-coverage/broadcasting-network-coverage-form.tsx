import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BroadcastingInfrastructure, BroadcastingNetworkCoverage } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface BroadcastingNetworkCoverageFormProps {
  formik: FormikProps<BroadcastingNetworkCoverage>;
  projectId: string;
}

const BroadcastingNetworkCoverageForm: React.FC<BroadcastingNetworkCoverageFormProps> = ({ projectId }) => {
  const { t: transl } = useTranslation();

  const { data: broadcastingInfrastructures } = useQuery({
    queryKey: ['broadcasting-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiSecondService<BroadcastingInfrastructure>().getAll(
        'broadcasting-infrastructures',
        dropDownConfig({
          filter: { project_id: projectId }
        })
      )
  });

  const { data: broadcastingInfrastructureTypes } = useQuery({
    queryKey: ['broadcasting-infrastructure-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.broadcastingInfrastructureType.model }
      })
  });

  const broadcastingInfrastructureTypeMap = new Map(
    broadcastingInfrastructureTypes?.payload.map((item) => [item.id, item.title || '']) || []
  );

  const { data: networkInfrastructureTypes } = useQuery({
    queryKey: ['network-infrastructure-types'],
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
          label={transl('project.other.broadcasting-network-coverage.details.broadcasting-infrastructure')}
          name="broadcasting_infrastructure_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            broadcastingInfrastructures?.payload.map((item) => ({
              value: item.id,
              label:
                item.name ||
                `${
                  broadcastingInfrastructureTypeMap.get(item.broadcasting_infrastructure_type_id) ||
                  item.broadcasting_infrastructure_type_id ||
                  'N/A'
                } (${item.id.slice(0, 5)}...)`
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.broadcasting-network-coverage.details.network-infrastructure-type')}
          name="network_infrastructure_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            networkInfrastructureTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-network-coverage.details.total-coverage-area')}
              name="total_coverage_area"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-network-coverage.details.coverage-population-no')}
              name="coverage_population_no"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-network-coverage.details.active-users-no')}
              name="active_users_no"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-network-coverage.details.average-download-speed')}
              name="average_download_speed"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-network-coverage.details.average-upload-speed')}
              name="average_upload_speed"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-network-coverage.details.signal-strength')}
              name="signal_strength"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.broadcasting-network-coverage.details.others')}
          name="others"
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default BroadcastingNetworkCoverageForm;
