import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { ProjectStatus } from 'src/types/project';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ProjectStatusFormProps {
  formik: FormikProps<ProjectStatus>;
}

const ProjectStatusForm: React.FC<ProjectStatusFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();
  const { data: statuses } = useQuery({
    queryKey: ['general-master', 'project-progress-statuses'],
    queryFn: () => generalMasterDataApiService.getAll('project-progress-statuses', {})
  });
  return (
    <>
      <CustomSelect
        size="small"
        name="status_id"
        label={transl('project.project-status.form.status')}
        options={
          statuses?.payload?.map((status) => ({
            value: status.id,
            label: status.title
          })) || []
        }
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('project.project-status.form.description')}
        placeholder={transl('project.project-status.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default ProjectStatusForm;
