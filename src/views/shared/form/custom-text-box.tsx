import { FormHelperText } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import CustomTextField from 'src/@core/components/mui/text-field';

const CustomTextBox: React.FC<any> = (props) => {
  const [field, meta] = useField(props);
  const { isSubmitting } = useFormikContext();

  return (
    <>
      <CustomTextField fullWidth {...field} {...props} disabled={props?.disabled || isSubmitting} />
      {meta.touched && meta.error && (
        <FormHelperText error id="standard-weight-helper-text-user-title">
          {meta.error}
        </FormHelperText>
      )}
    </>
  );
};

export default CustomTextBox;
