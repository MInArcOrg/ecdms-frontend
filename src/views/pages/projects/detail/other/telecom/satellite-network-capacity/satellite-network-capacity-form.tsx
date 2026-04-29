import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { SatelliteNetwork, SatelliteNetworkCapacity } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface SatelliteNetworkCapacityFormProps {
  formik: FormikProps<SatelliteNetworkCapacity>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  satelliteNetworks: SatelliteNetwork[];
}

const SatelliteNetworkCapacityForm: React.FC<SatelliteNetworkCapacityFormProps> = ({ file, onFileChange, satelliteNetworks }) => {
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
          label={transl('project.other.satellite-network-capacity.details.network-type-id')}
          placeholder={transl('project.other.satellite-network-capacity.details.network-type-id')}
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

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-capacity.details.total-bandwidth')}
          placeholder={transl('project.other.satellite-network-capacity.details.total-bandwidth')}
          name="total_bandwidth"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-capacity.details.users-number')}
          placeholder={transl('project.other.satellite-network-capacity.details.users-number')}
          name="users_number"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.satellite-network-capacity.details.remark')}
          placeholder={transl('project.other.satellite-network-capacity.details.remark')}
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

export default SatelliteNetworkCapacityForm;

