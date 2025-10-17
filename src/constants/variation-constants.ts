// Define the constants with labels and values
export const variationConstants = {
  AMENDMENT: {
    label: 'Amendment',
    value: 'AMENDMENT',
    percent: 30
  },
  VARIATION: {
    label: 'Variation',
    value: 'VARIATION',
    percent: 25
  },
  SUPPLEMENT: {
    label: 'Supplement',
    value: 'SUPPLEMENT',
    percent: 30
  },
  OMISSION: {
    label: 'Omission',
    value: 'OMISSION',
    percent: 30
  }
} as const;

// Type for the variation constants
export type VariationConstants = (typeof variationConstants)[keyof typeof variationConstants];
