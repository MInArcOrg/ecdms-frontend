export const generateYears = (startYear: number, endYear: number = new Date().getFullYear()): number[] => {
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};
export function getQuarterStartDate(year: number, quarter: number): Date {
  // Map quarters to their respective start months
  const quarterStartMonth: { [key: number]: number } = {
    1: 0, // January
    2: 3, // April
    3: 6, // July
    4: 9 // October
  };

  if (quarter < 1 || quarter > 4) {
    throw new Error('Quarter must be between 1 and 4.');
  }

  const startMonth = quarterStartMonth[quarter];

  // Create the start date using the year and the start month
  const startDate = new Date(year, startMonth, 1);

  return startDate;
}
