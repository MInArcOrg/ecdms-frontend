import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { DataCenter, DataCenterComponentManufacturer } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface DataCenterComponentManufacturerFormProps {
  formik: FormikProps<DataCenterComponentManufacturer>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: String;
}

const DataCenterComponentManufacturerForm: React.FC<DataCenterComponentManufacturerFormProps> = ({
  formik,
  projectId,
  file,
  onFileChange
}) => {
  const { t: transl } = useTranslation();
  const { data: dataCenters } = useQuery({
    queryKey: ['data-centers'],
    queryFn: () =>
      projectOtherApiSecondService<DataCenter>().getAll('data-centers', {
        filter: { project_id: projectId }
      })
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={transl('project.other.data-center-component-manufacturer.details.data-center-id')}
          placeholder={transl('project.other.data-center-component-manufacturer.details.data-center-id')}
          name="data_center_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            dataCenters?.payload.map((type) => ({
              label: type?.dataCenterType?.title,
              value: type.id
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.data-center-component-manufacturer.details.servers')}
              placeholder={transl('project.other.data-center-component-manufacturer.details.servers')}
              name="servers"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.data-center-component-manufacturer.details.storage-devices')}
              placeholder={transl('project.other.data-center-component-manufacturer.details.storage-devices')}
              name="storage_devices"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.data-center-component-manufacturer.details.networking-equipment')}
              placeholder={transl('project.other.data-center-component-manufacturer.details.networking-equipment')}
              name="networking_equipment"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.data-center-component-manufacturer.details.cooling-systems')}
              placeholder={transl('project.other.data-center-component-manufacturer.details.cooling-systems')}
              name="cooling_systems"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.data-center-component-manufacturer.details.backup-generators')}
              placeholder={transl('project.other.data-center-component-manufacturer.details.backup-generators')}
              name="backup_generators"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.data-center-component-manufacturer.details.others')}
          placeholder={transl('project.other.data-center-component-manufacturer.details.others')}
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

export default DataCenterComponentManufacturerForm;
