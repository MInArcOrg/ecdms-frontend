import * as yup from "yup";

export const nameRule = yup
    .string()
    .max(50, "Name must be 50 characters or less.")
    .trim() // Removes spaces at start and end
    .matches(/^[A-Za-z]+$/, "Only letters allowed, no spaces or special characters.")
    .transform((value) => {
        if (!value) return value;
        // Apply Title Case formatting
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    });
