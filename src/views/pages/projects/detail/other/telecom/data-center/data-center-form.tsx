import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { DataCenter } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface DataCenterFormProps {
  formik: FormikProps<DataCenter>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: String;
}

const DataCenterForm: React.FC<DataCenterFormProps> = ({ formik, projectId, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: dataCenterTypes } = useQuery({
    queryKey: ['data-center-types', projectMasterModels.dataCenterType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.dataCenterType.model
          }
        })
      )
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.data-center.details.name')}
          placeholder={transl('project.other.data-center.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl('project.other.data-center.details.data-center-type-id')}
          placeholder={transl('project.other.data-center.details.data-center-type-id')}
          name="data_center_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            dataCenterTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <CustomSwitch
              label={transl('project.other.data-center.details.servers')}
              name="servers"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSwitch
              label={transl('project.other.data-center.details.storage-devices')}
              name="storage_devices"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSwitch
              label={transl('project.other.data-center.details.networking-equipment')}
              name="networking_equipment"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSwitch
              label={transl('project.other.data-center.details.cooling-systems')}
              name="cooling_systems"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSwitch
              label={transl('project.other.data-center.details.backup-generators')}
              name="backup_generators"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.data-center.details.others')}
          placeholder={transl('project.other.data-center.details.others')}
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

export default DataCenterForm;
