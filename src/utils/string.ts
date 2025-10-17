export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const capitalizeEveryLetterWithDash = (str: string) => str.toLocaleUpperCase().replace(/-/g, '_');
export const changeToPascalCase = (str: string) => {
  return str
    .toLowerCase()
    .split(/[-_]/) // Split the string by '-' or '_'
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};
