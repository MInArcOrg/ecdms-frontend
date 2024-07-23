import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import Position from 'src/types/department/position';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface PositionFormProps {
  formik: FormikProps<Position>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Position;
}

const PositionForm: React.FC<PositionFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('department.position.form.name')}
        placeholder={transl('department.position.form.name')}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('department.position.form.description')}
        placeholder={transl('department.position.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default PositionForm;
