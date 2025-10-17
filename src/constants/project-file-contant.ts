// Define the constants with labels and values
export const projectFileConstant = {
  PLANNING: {
    label: 'Planning',
    value: 'PLANNING'
  },
  DESIGN: {
    label: 'Design',
    value: 'DESIGN'
  },
  CONSTRUCTION: {
    label: 'Construction',
    value: 'CONSTRUCTION'
  },
  OTHER: {
    label: 'Other',
    value: 'OTHER'
  }
} as const;
export type ProjectFileConstants = (typeof projectFileConstant)[keyof typeof projectFileConstant];
