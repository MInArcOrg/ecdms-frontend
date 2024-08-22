// Define the constants with labels and values
export const projectFileConstant = {
  INITIATION: {
    label: 'Initiation',
    value: 'INITIATION'
  },
  PLANNING: {
    label: 'Planning',
    value: 'PLANNING'
  },
  EXECUTION: {
    label: 'Execution',
    value: 'EXECUTION'
  },
  MONITORING: {
    label: 'Monitoring',
    value: 'MONITORING'
  },
  CLOSING: {
    label: 'Closing',
    value: 'CLOSING'
  }
} as const;
export type ProjectFileConstants = (typeof projectFileConstant)[keyof typeof projectFileConstant];
