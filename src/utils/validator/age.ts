// utils/validators.ts
import * as yup from "yup";

// Reusable age check helper
export const isAtLeastAge = (minAge: number) => {
  return (value: string | null | undefined): boolean => {
    if (!value) return true; // allow null or undefined

    const birthDate = new Date(value);
    if (isNaN(birthDate.getTime())) return false; // invalid date string

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= minAge;
  };
};

// -----------------------------
// Yup rule using the helper
export const birthDateRule = (minAge: number) =>
  yup
    .string()
    .nullable()
    .test(
      "age-check",
      `You must be at least ${minAge} years old`,
      isAtLeastAge(minAge)
    );
