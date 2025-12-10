import { FormHelperText } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import CustomTextField from 'src/@core/components/mui/text-field';
import { useRequiredFields } from 'src/context/required-fields-context';

interface CustomTextBoxProps {
  name: string;
  onValueChange?: (value: string | number) => void;
  type?: string;
  allowSpecialChars?: boolean;
  maxLength?: number;
  multilineMaxLength?: number;
  multiline?: boolean;
  [key: string]: any;
}

const CustomTextBox: React.FC<CustomTextBoxProps> = ({
  name,
  onValueChange,
  type = 'text',
  allowSpecialChars = false,
  maxLength = 36,
  multilineMaxLength = 150,
  multiline = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { isSubmitting } = useFormikContext();

  const effectiveMaxLength = multiline ? multilineMaxLength : maxLength;
  const requiredFields = useRequiredFields();

  const isRequired = requiredFields.includes(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value;

    if (typeof value === 'string') {

      // prevent starting with space
      if (value.length === 1 && value.startsWith(' ')) {
        value = '';
      }

      // block special chars if not allowed
      if (!allowSpecialChars) {
        if (type === 'email') {
          // allowed chars for email only
          value = value.replace(/[^a-zA-Z0-9@._\-+]/g, '');
        } else {
          // allow only alphanumeric + space
          value = value.replace(/[^A-Za-z0-9 ]/g, '');
        }
      }

      // enforce max length
      if (value.length > effectiveMaxLength) {
        value = value.substring(0, effectiveMaxLength);
      }
    }

    // convert to number
    if (type === 'number') {
      value = event.target.value ? Number(value) : 0;
    }

    if (onValueChange) onValueChange(value);
    helpers.setValue(value);
  };

  return (
    <>
      <CustomTextField
        fullWidth
        {...field}
        {...props}
        type={type}
        disabled={props?.disabled || isSubmitting}
        onChange={handleChange}
        value={field.value || ''}
        required={isRequired}
        inputProps={{
          maxLength: effectiveMaxLength,
          ...props.inputProps
        }}
        multiline={multiline}
      />

      {(meta.touched || !isSubmitting) && meta.error && (
        <FormHelperText error id={`helper-text-${name}`}>
          {meta.error}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomTextBox;
