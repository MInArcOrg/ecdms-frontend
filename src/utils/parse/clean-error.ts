import { IApiResponse } from 'src/types/requests';

// Enhanced type guard with nullish check and descriptive naming
function isErrorRecord(errors: unknown): errors is Record<string, string[]> {
  return typeof errors === 'object' && errors !== null && !Array.isArray(errors);
}

export const parseError = (response: IApiResponse): Record<string, string> => {
  const formikErrors: Record<string, string> = {};

  if (response._errors !== undefined) {
    // Early return for common case of non-error response
    if (typeof response._errors === 'undefined' || response._errors === null) {
      return formikErrors; // No errors to parse
    }

    if (Array.isArray(response._errors)) {
      // Handle the case where _errors is an array of strings
      formikErrors['_error'] = response._errors[0] || ''; // Set default if empty
    } else if (isErrorRecord(response._errors)) {
      // Handle the case where _errors is an object with string arrays as values
      for (const field in response._errors) {
        if (Array.isArray(response._errors[field])) {
          formikErrors[field] = response._errors[field][0] || ''; // Set default if empty
        }
      }
    } else if (typeof response._errors === 'string') {
      // Handle the case where _errors is a string
      formikErrors['_error'] = response._errors;
    } else {
      // Handle unexpected error type (optional: log or throw)
      console.warn('Unexpected error type in response._errors:', response._errors);
    }
  }

  return formikErrors;
};
