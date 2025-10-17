// Define the constants with labels and values
export const bondConstants = {
  PERFORMANCE_BOND: {
    label: 'Performance Bond',
    value: 'PERFORMANCE_BOND'
  },
  BID_BOND: {
    label: 'Interim Payment',
    value: 'BID_BOND'
  },
  ADVANCE_BOND: {
    label: 'Advance Bond',
    value: 'ADVANCE_BOND'
  }
} as const;
export const institutionType = {
  bank: { name: 'Bank', value: 'bank', percent: 30 },
  insurance: { name: 'Insurance', value: 'insurance', percent: 10 }
};
// Type for the variation constants
export type BondConstants = (typeof bondConstants)[keyof typeof bondConstants];
