import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwayCommunicationSystem } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

import { useQuery } from '@tanstack/react-query';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import { dropDownConfig } from 'src/configs/api-constants';

interface RailwayCommunicationSystemFormProps {
  formik: FormikProps<RailwayCommunicationSystem>;

  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayCommunicationSystemForm: React.FC<RailwayCommunicationSystemFormProps> = ({
  formik,

  defaultFile,
  onDefaultFileChange
}) => {
  const { t } = useTranslation();

  const { data: communicationSystemTypes } = useQuery({
    queryKey: [projectMasterModels.communicationSystemType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.communicationSystemType.model
          }
        })
      )
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.railway_line_section_name')}
          placeholder={t('project.other.railway-communication-system.details.railway_line_section_name')}
          name="railway_line_section_name"
          value={formik.values.railway_line_section_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-communication-system.details.communication_system_type')}
          name="communication_system_type_id"
          value={formik.values.communication_system_type_id}
          size="small"
          sx={{ mb: 2 }}
          options={
            communicationSystemTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.communication_system_protocols_or_standards')}
          placeholder={t('project.other.railway-communication-system.details.communication_system_protocols_or_standards')}
          name="communication_system_protocols_or_standards"
          value={formik.values.communication_system_protocols_or_standards}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.communication_system_components')}
          placeholder={t('project.other.railway-communication-system.details.communication_system_components')}
          name="communication_system_components"
          value={formik.values.communication_system_components}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.signaling_system_components')}
          placeholder={t('project.other.railway-communication-system.details.signaling_system_components')}
          name="signaling_system_components"
          value={formik.values.signaling_system_components}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.remark')}
          placeholder={t('project.other.railway-communication-system.details.remark')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={defaultFile} onFileChange={onDefaultFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayCommunicationSystemForm;
