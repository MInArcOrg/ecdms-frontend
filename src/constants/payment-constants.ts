// Define the constants with labels and values
export const paymentConstants = {
  INTERIM_PAYMENT: {
    label: 'Interim Payment',
    value: 'INTERIM_PAYMENT'
  },
  ADVANCE_PAYMENT: {
    label: 'Interim Payment',
    value: 'ADVANCE_PAYMENT'
  }
} as const;

// Type for the variation constants
export type VariationConstants = (typeof paymentConstants)[keyof typeof paymentConstants];
