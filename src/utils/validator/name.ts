import * as yup from "yup";

export const nameRule = yup
    .string()
    .trim() // 1. Remove outer spaces (e.g., "  john doe  " -> "john doe")
    .max(50, "Name must be 50 characters or less.")
    // 2. APPLY TRANSFORMATION FIRST (This is what you want to ensure happens)
    .transform((value) => {
        // value here is the trimmed string
        if (!value) return value;
        // This Title Case logic only works well for single-word names
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    })
    // 3. RUN VALIDATION ON THE TRANSFORMED VALUE
    // NOTE: If the original input was "JOHN", it becomes "John" here. 
    // If the original input was "John Doe", it fails the .matches() here (if you are only expecting single names).
    .matches(/^[A-Za-z]+$/, "Only letters allowed, no spaces or special characters.");

// Example of what would happen:
// Input: "  aLlEn  "
// 1. .trim() -> "aLlEn"
// 2. .max(50) -> Passes
// 3. .transform() -> "Allen"
// 4. .matches() -> Passes
// Output: "Allen"

// Input: "  John Doe  "
// 1. .trim() -> "John Doe"
// 2. .max(50) -> Passes
// 3. .transform() -> "John doe"
// 4. .matches() -> Fails (because of the space)
// Output: Validation Error: "Only letters allowed, no spaces or special characters."