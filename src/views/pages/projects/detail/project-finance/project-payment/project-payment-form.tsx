import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectPayment } from 'src/types/project/project-finance';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectPaymentFormProps {
  formik: FormikProps<ProjectPayment>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectPaymentForm: React.FC<ProjectPaymentFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  // Handle value change and update the corresponding field

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('project.project-interim_payment.form.amount')}
        placeholder={transl('project.project-interim_payment.form.amount')}
        name="amount"
        size="small"
        type="number"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('project.project-interim_payment.form.title')}
        placeholder={transl('project.project-interim_payment.form.title')}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('project.project-interim_payment.form.retention')}
        placeholder={transl('project.project-interim_payment.form.retention')}
        name="retention"
        size="small"
        type="number"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('project.project-interim_payment.form.description')}
        placeholder={transl('project.project-interim_payment.form.description')}
        name="description"
        multiline
        rows="4"
        sx={{ mb: 2 }}
      />
      <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
    </>
  );
};

export default ProjectPaymentForm;
