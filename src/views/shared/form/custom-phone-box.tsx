import { FormHelperText } from '@mui/material';
import { useField } from 'formik';
import React from 'react';
import 'react-international-phone/style.css';
import { useRequiredFields } from 'src/context/required-fields-context';
import { MuiPhone } from 'src/views/components/phone/custome-phone';

const CustomPhoneInput: React.FC<any> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (phone: string) => {
    helpers.setValue(phone);
  };
  const requiredFields = useRequiredFields();

  const isRequired = requiredFields.includes(props.name);
  return (
    <>
      <MuiPhone required={isRequired} {...props} label={label} value={field.value} onChange={handleChange} />
      {meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </>
  );
};

export default CustomPhoneInput;
