import { generateYears } from 'src/utils/genertor/date';

export const planReportTypeConstant = {
  DAILY: {
    name: 'Daily',
    value: 'DAILY'
  },
  WEEKLY: {
    name: 'Weekly',
    value: 'WEEKLY'
  },
  MONTHLY: {
    name: 'Monthly',
    value: 'MONTHLY'
  },
  QUARTERLY: {
    name: 'Quarterly',
    value: 'QUARTERLY'
  },
  YEARLY: {
    name: 'Yearly',
    value: 'YEARLY'
  }
} as const;
export type PlanReportTypeConstants = (typeof planReportTypeConstant)[keyof typeof planReportTypeConstant];
export const yearQuarterConstant = {
  quarter1: {
    name: 'Quarter 1',
    value: '1'
  },
  quarter2: {
    name: 'Quarter 2',
    value: '2'
  },
  quarter3: {
    name: 'Quarter 3',
    value: '3'
  },
  quarter4: {
    name: 'Quarter 4',
    value: '4'
  }
} as const;
export type YearQuarterConstant = (typeof yearQuarterConstant)[keyof typeof yearQuarterConstant];
export const yearListOptions = generateYears(1980, 2050).map((year) => ({ label: year.toString(), value: year.toString() }));
