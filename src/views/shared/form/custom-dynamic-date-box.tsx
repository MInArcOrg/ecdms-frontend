import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormHelperText, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import Icon from 'src/@core/components/icon';
import 'react-datepicker/dist/react-datepicker.css';
import CustomTextField from 'src/@core/components/mui/text-field';
import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';
import EthioCalendar from 'src/views/components/custom/ethio-calendar/ethio-calendar';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

interface CustomDynamicDatePickerProps {
  name: string;
  label: string;
  onChange?: (date: Date | EthiopianDate) => void; // Optional onChange prop
  [key: string]: any; // To allow any additional props
}

const CustomDynamicDatePicker: React.FC<CustomDynamicDatePickerProps> = ({ name, label, onChange, ...rest }) => {
  const { i18n } = useTranslation();
  const [field, meta, helpers] = useField(name);
  const { isSubmitting } = useFormikContext();

  const handleChange = (date: Date | EthiopianDate) => {
    helpers.setValue(date);

    // Trigger the optional onChange prop if provided
    if (onChange) {
      onChange(date);
    }
  };

  const renderPicker = () => {
    if (i18n.language === 'am') {
      return (
        <EthioCalendar
          value={field.value as EthiopianDate}
          onChange={handleChange}
          label={label}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon fontSize="1.25rem" icon={'tabler:calendar'} />
              </InputAdornment>
            )
          }}
          {...rest}
        />
      );
    }

    return (
      <DatePickerWrapper>
        <DatePicker
          selected={field.value as Date}
          onChange={handleChange as (date: Date) => void}
          dateFormat="dd/MM/yyyy"
          customInput={
            <CustomTextField
              {...field}
              {...rest}
              label={label}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon fontSize="1.25rem" icon={'tabler:calendar'} />
                  </InputAdornment>
                )
              }}
              disabled={rest?.disabled || isSubmitting}
            />
          }
        />
      </DatePickerWrapper>
    );
  };

  return (
    <>
      {renderPicker()}
      {meta.touched && meta.error && (
        <FormHelperText error id="standard-weight-helper-text-user-title">
          {meta.error}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomDynamicDatePicker;
