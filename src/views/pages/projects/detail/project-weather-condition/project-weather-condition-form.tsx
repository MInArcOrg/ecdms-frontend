import { Box } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { WeatherCondition } from 'src/types/project/weather-condition';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface WeatherConditionFormProps {
  formik: FormikProps<WeatherCondition>;
  defaultLocaleData?: WeatherCondition;
  projectId: string;
}

const WeatherConditionForm: React.FC<WeatherConditionFormProps> = ({ formik, projectId }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <CustomTextBox fullWidth label={t('project.other.weather-condition.weather-type')} name="weather_type" size="small" sx={{ mb: 2 }} />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.other.weather-condition.description')}
          name="description"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Box>
    </>
  );
};

export default WeatherConditionForm;
