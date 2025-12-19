import * as yup from "yup";
export const nationalIdRule = yup.string().length(16).matches(/^[0-9]+$/, 'Invalid national ID number');