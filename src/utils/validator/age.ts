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
      `User must be at least ${minAge} years old`,
      isAtLeastAge(minAge)
    );
export const pastDateRule = () => yup.string().nullable().test("past-date", "Date must be in the past", (value) => {
  if (!value) return true;
  const date = new Date(value);
  const today = new Date();
  return date.getTime() < today.getTime();
});
export const futureDateRule = () => yup.string().nullable().test("feature-date", "Date must be in the future", (value) => {
  if (!value) return true;
  const date = new Date(value);
  const today = new Date();
  return date.getTime() > today.getTime();
});