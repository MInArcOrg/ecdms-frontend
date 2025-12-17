import { ChipProps } from '@mui/material';

/* =======================
   ACTION STATUS
======================= */

export const ACTION_STATUS = {
  AUTHORIZED: 'AUTHORIZED',
  APPROVED: 'APPROVED',
  CHECKED: 'CHECKED',
  REGISTERED: 'REGISTERED',
  REJECTED: 'REJECTED',
  DEFAULT: 'DEFAULT',
} as const;

export type ActionStatus =
  typeof ACTION_STATUS[keyof typeof ACTION_STATUS];

/* =======================
   TITLES
======================= */

export const TITLES = {
  AUTHORIZER: 'AUTHORIZER',
  APPROVER: 'APPROVER',
  CHECKER: 'CHECKER',
  REGISTER: 'REGISTER',
  REJECT: 'REJECT',
  DEFAULT: 'DEFAULT',
} as const;

export type ActionTitle =
  typeof TITLES[keyof typeof TITLES];

/* =======================
   REQUESTS
======================= */

export const REQUESTS = {
  REGISTER: 'register',
  CHECK: 'check',
  APPROVE: 'approve',
  AUTHORIZE: 'authorize',
  REJECT: 'reject',
} as const;

export type ActionRequest =
  typeof REQUESTS[keyof typeof REQUESTS];

/* =======================
   COLOR MAPS
======================= */

export const statusColors: Record<ActionStatus, ChipProps['color']> = {
  AUTHORIZED: 'success',
  APPROVED: 'primary',
  CHECKED: 'warning',
  REGISTERED: 'secondary',
  REJECTED: 'error',
  DEFAULT: 'default',
};

export const notificationStatusColors: Record<ActionTitle, ChipProps['color']> = {
  AUTHORIZER: 'success',
  APPROVER: 'primary',
  CHECKER: 'warning',
  REGISTER: 'secondary',
  REJECT: 'error',
  DEFAULT: 'default',
};

/* =======================
   SAFE RESOLVERS
======================= */

export const resolveStatus = (status?: string) =>
  Object.values(ACTION_STATUS).includes(status as ActionStatus)
    ? (status as ActionStatus)
    : '';

/* =======================
   PERMISSION HELPERS
======================= */

export const isAllowedToCheck = (
  status: ActionStatus,
  _registerId: string
): boolean => status === ACTION_STATUS.REGISTERED;

export const isAllowedToApprove = (
  status: ActionStatus,
  _registerId: string,
  _checkerId: string
): boolean => status === ACTION_STATUS.CHECKED;

export const isAllowedToReject = (status: ActionStatus): boolean =>
  status !== ACTION_STATUS.APPROVED;

export const isAllowedToAuthorize = (
  status: ActionStatus,
  _registerId: string,
  _checkerId: string,
  _approverId: string
): boolean => status === ACTION_STATUS.APPROVED;

/* =======================
   MODEL ACTIONS
======================= */

export const MODEL_ACTIONS: ActionRequest[] = [
  REQUESTS.REGISTER,
  REQUESTS.CHECK,
  REQUESTS.APPROVE,
  REQUESTS.AUTHORIZE,
];
