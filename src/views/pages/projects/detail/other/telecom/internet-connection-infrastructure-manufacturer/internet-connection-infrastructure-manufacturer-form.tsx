import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { InternetConnection, InternetConnectionInfrastructureManufacturer } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface InternetConnectionInfrastructureManufacturerFormProps {
  formik: FormikProps<InternetConnectionInfrastructureManufacturer>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const InternetConnectionInfrastructureManufacturerForm: React.FC<InternetConnectionInfrastructureManufacturerFormProps> = ({ projectId, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  const { data: internetConnections } = useQuery({
    queryKey: ['internet-connections'],
    queryFn: () =>
      projectOtherApiSecondService<InternetConnection>().getAll(
        'internet-connections',
        dropDownConfig({
          filter: {
            project_id: projectId
          }
        })
      )
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl('project.other.internet-connection-infrastructure-manufacturer.details.internet-connection-id')}
          placeholder={transl('project.other.internet-connection-infrastructure-manufacturer.details.internet-connection-id')}
          name="internet_connection_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            internetConnections?.payload.map((connection) => ({
              label: connection.internetConnectionType?.title,
              value: connection.id
            })) || []
          }
        />

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} >
            <CustomTextBox
              fullWidth
              label={transl('project.other.internet-connection-infrastructure-manufacturer.details.routers')}
              placeholder={transl('project.other.internet-connection-infrastructure-manufacturer.details.routers')}
              name="routers"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} >
            <CustomTextBox
              fullWidth
              label={transl('project.other.internet-connection-infrastructure-manufacturer.details.switches')}
              placeholder={transl('project.other.internet-connection-infrastructure-manufacturer.details.switches')}
              name="switches"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} >
            <CustomTextBox
              fullWidth
              label={transl('project.other.internet-connection-infrastructure-manufacturer.details.modems')}
              placeholder={transl('project.other.internet-connection-infrastructure-manufacturer.details.modems')}
              name="modems"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} >
            <CustomTextBox
              fullWidth
              label={transl('project.other.internet-connection-infrastructure-manufacturer.details.cables')}
              placeholder={transl('project.other.internet-connection-infrastructure-manufacturer.details.cables')}
              name="cables"
              type="text"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.internet-connection-infrastructure-manufacturer.details.others')}
          placeholder={transl('project.other.internet-connection-infrastructure-manufacturer.details.others')}
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

export default InternetConnectionInfrastructureManufacturerForm;
