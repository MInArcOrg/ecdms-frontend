import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { acadamicLevels } from 'src/configs/app-constants';
import AcademicInformation from 'src/types/member/academic-information';
import CustomDateSelector from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
interface AcademicInformationFormProps {
  formik: FormikProps<AcademicInformation>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: AcademicInformation;
}

const AcademicInformationForm: React.FC<AcademicInformationFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomSelect
        name="level"
        label={transl('level')}
        options={acadamicLevels.map((level) => ({
          value: level,
          label: level
        }))}
        sx={{ mb: 2 }}
      />

      <CustomTextBox fullWidth label={transl('type')} placeholder={transl('type')} name="type" size="sm" sx={{ mb: 2 }} />
      <CustomTextBox
        fullWidth
        label={transl('institution')}
        placeholder={transl('institution')}
        name="institution"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomDateSelector
        fullWidth
        label={transl('started-year')}
        placeholder={transl('started-year')}
        name="started_year"
        type="date"
        size="sm"
        sx={{ mb: 2 }}
      />
      <CustomDateSelector
        fullWidth
        label={transl('completed-year')}
        placeholder={transl('completed-year')}
        name="completed_year"
        type="date"
        size="sm"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default AcademicInformationForm;
