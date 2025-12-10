import * as yup from "yup";

export const nameRule = yup
    .string()
    // 1. Check the max length on the original input.
    .max(36, "Name must be 36 characters or less.")

    // 2. USE .TEST() FOR PRE-CLEANUP VALIDATION
    // This custom test runs on the raw string before .transform() modifies it for the final output.
    .test(
        'no-spaces-or-special-chars',
        "Only letters allowed, no spaces or special characters.",
        (value) => {
            if (!value) return true; // Allows required() to handle empty
            // Check if the original value contains anything NOT a letter
            return /^[A-Za-z]+$/.test(value);
        }
    )

    // 3. Keep .transform() ONLY for the final output formatting.
    .transform((value) => {
        if (!value) return value;
        // The value is already validated to contain only letters at this point.
        const cleaned = value.replace(/\s+/g, ""); // Safely remove spaces

        // Apply Title Case formatting
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    });