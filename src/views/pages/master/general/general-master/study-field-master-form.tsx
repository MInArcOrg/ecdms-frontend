import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import CustomSelect from 'src/views/shared/form/custom-select';

const StudyFieldMasterForm = () => {
  const { t: transl } = useTranslation();
  const { data: studyFields } = useQuery({
    queryKey: ['study-field'],
    queryFn: () => generalMasterDataApiService.getAll('study-programs', {})
  });
  const { data: studyLevels } = useQuery({
    queryKey: ['study-level'],
    queryFn: () => generalMasterDataApiService.getAll('study-levels', {})
  });
  return (
    <Fragment>
      <Box sx={{ mt: 4 }}>
        <CustomSelect
          size="small"
          name="study_program_id"
          label={transl('master-data.form.study-program')}
          options={
            studyFields?.payload?.map((studyField) => ({
              value: studyField.id,
              label: studyField.title
            })) || []
          }
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <CustomSelect
          size="small"
          name="studylevel_id"
          label={transl('master-data.form.study-level')}
          options={
            studyLevels?.payload?.map((studyField) => ({
              value: studyField.id,
              label: studyField.title
            })) || []
          }
        />
      </Box>
    </Fragment>
  );
};

export default StudyFieldMasterForm;
