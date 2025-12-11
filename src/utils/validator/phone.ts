import * as yup from "yup";

export const phoneRule = yup
  .string()
  .transform((value) => {
    // Remove ALL non-digits
    const digits = value.replace(/\D/g, "");

    // Must start with 251 + 9 digits (Ethiopia)
    if (!digits.startsWith("251") || digits.length !== 12) {
      return value; // let match() fail
    }

    // Format as +251 932 588 260
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`;
  })
  .matches(/^\+251\s\d{3}\s\d{3}\s\d{3}$/, "Phone must be in the format: +251 *** *** ***")
