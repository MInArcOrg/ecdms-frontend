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
import type { BroadcastingInfrastructure, BroadcastingNetworkCapacity } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface BroadcastingNetworkCapacityFormProps {
  formik: FormikProps<BroadcastingNetworkCapacity>;
  projectId: string;
}

const BroadcastingNetworkCapacityForm: React.FC<BroadcastingNetworkCapacityFormProps> = ({ projectId }) => {
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

  const { data: networkTypes } = useQuery({
    queryKey: ['network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.networkType.model }
      })
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.broadcasting-network-capacity.details.broadcasting-infrastructure')}
          name="broadcasting_infrastructure_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            broadcastingInfrastructures?.payload.map((item) => ({
              value: item.id,
              label: `${
                broadcastingInfrastructureTypeMap.get(item.broadcasting_infrastructure_type_id) ||
                item.broadcasting_infrastructure_type_id ||
                'N/A'
              } (${item.id.slice(0, 5)}...)`
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.broadcasting-network-capacity.details.network-type')}
          name="network_type_id"
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
              label={transl('project.other.broadcasting-network-capacity.details.total-bandwidth')}
              name="total_bandwidth"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.broadcasting-network-capacity.details.users-number')}
              name="users_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.broadcasting-network-capacity.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default BroadcastingNetworkCapacityForm;
