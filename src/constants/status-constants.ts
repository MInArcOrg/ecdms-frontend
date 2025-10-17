// src/constants/statusConstants.ts
export const STATUS_COLORS = {
  Active: 'info',
  Terminated: 'error',
  Pending: 'warning',
  Completed: 'success',
  NoStatus: 'primary'
} as const;

export const STATUS_LABELS = {
  Active: 'Active',
  Terminated: 'Terminated',
  Pending: 'Pending',
  Completed: 'Completed',
  NoStatus: 'No Status'
} as const;

export type StatusKey = keyof typeof STATUS_COLORS;
