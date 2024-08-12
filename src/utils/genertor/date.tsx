export const generateYears = (startYear: number, endYear: number = new Date().getFullYear()): number[] => {
    const years: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };
  