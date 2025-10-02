import { FormHelperText } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";
import CustomTextField from "src/@core/components/mui/text-field";
import { useRequiredFields } from "src/context/required-fields-context";

interface CustomTextBoxProps {
  name: string;
  onValueChange?: (value: string | number) => void;
  type?: string;
  allowSpecialChars?: boolean; // restrict special chars (except for email)
  maxLength?: number; // single-line max length
  multilineMaxLength?: number; // multiline max length
  multiline?: boolean;
  [key: string]: any;
}

const CustomTextBox: React.FC<CustomTextBoxProps> = ({
  name,
  onValueChange,
  type = "text",
  allowSpecialChars = false,
  maxLength = 36,
  multilineMaxLength = 150,
  multiline = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { isSubmitting } = useFormikContext();

  // pick the right length limit
  const effectiveMaxLength = multiline ? multilineMaxLength : maxLength;
   const requiredFields = useRequiredFields();

  const isRequired = requiredFields.includes(name);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value;

    if (typeof value === "string") {
      // Restrict characters if not allowed
      if (!allowSpecialChars) {
        if (type === "email") {
          // Allow email-specific characters
          value = value.replace(/[^a-zA-Z0-9@._\-+]/g, "");
        } else {
          // Default alphanumeric + space only
          value = value.replace(/[^a-zA-Z0-9\s./]/g, "");
        }
      }

      // Enforce max length
      if (effectiveMaxLength && value.length > effectiveMaxLength) {
        value = value.substring(0, effectiveMaxLength);
      }
    }

    // Convert to number if type is number
    if (type === "number") {
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
        value={field.value || ""}
        required={isRequired}
        inputProps={{
          maxLength: effectiveMaxLength,
          ...props.inputProps,
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
