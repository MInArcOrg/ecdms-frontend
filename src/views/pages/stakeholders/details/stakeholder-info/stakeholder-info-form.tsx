import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

// StakeholderInfo interface
export interface StakeholderInfo {
  id: string; // UUID as string
  parent_id?: string; // Optional UUID
  stakeholder_id: string; // UUID, cannot be null
  capital?: string; // Optional string
  general_manager?: string; // Optional string
  description?: string; // Optional text
  file_id?: string; // Optional UUID
  revision_no?: number; // Optional integer
  created_at?: Date; // Optional date for the created_at field
  updated_at?: Date; // Optional date for the updated_at field
}

interface StakeholderInfoFormProps {
  formik: FormikProps<StakeholderInfo>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderInfoForm: React.FC<StakeholderInfoFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <>
      {/* Capital */}
      <CustomTextBox
        fullWidth
        label={transl('stakeholder.stakeholder-info.form.capital')}
        placeholder={transl('stakeholder.stakeholder-info.form.capital')}
        name="capital"
        size="small"
        sx={{ mb: 2 }}
      />

      {/* General Manager */}
      <CustomTextBox
        fullWidth
        label={transl('stakeholder.stakeholder-info.form.general-manager')}
        placeholder={transl('stakeholder.stakeholder-info.form.general-manager')}
        name="general_manager"
        size="small"
        sx={{ mb: 2 }}
      />

      {/* Description */}
      <CustomTextBox
        fullWidth
        label={transl('stakeholder.stakeholder-info.form.description')}
        placeholder={transl('stakeholder.stakeholder-info.form.description')}
        name="description"
        size="small"
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      {/* File Upload */}
      <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
    </>
  );
};

export default StakeholderInfoForm;
