export const ACTION_APPROVED = 'APPROVED';
export const ACTION_CHECKED = 'CHECKED';
export const ACTION_REGISTERED = 'REGISTERED';
export const ACTION_REJECTED = 'REJECTED';
export const ACTION_AUTHORIZED = 'AUTHORIZED';

export const TITLE_APPROVER = 'APPROVER';
export const TITLE_CHECKER = 'CHECKER';
export const TITLE_REGISTER = 'REGISTER';
export const TITLE_AUTHORIZER = 'AUTHORIZER';
export const TITLE_REJECT = 'REJECT';

export const REQUEST_APPROVE = 'approve';
export const REQUEST_CHECK = 'check';
export const REQUEST_REGISTER = 'register';
export const REQUEST_AUTHORIZE = 'authorize';
export const REQUEST_REJECT = 'reject';

export const statusColors: Record<string, string> = {
  [ACTION_AUTHORIZED]: 'success',
  [ACTION_APPROVED]: 'primary',
  [ACTION_CHECKED]: 'warning',
  [ACTION_REGISTERED]: 'secondary',
  [ACTION_REJECTED]: 'error'
};

export const notificationStatusColors: Record<string, string> = {
  [TITLE_AUTHORIZER]: 'success',
  [TITLE_APPROVER]: 'primary',
  [TITLE_CHECKER]: 'warning',
  [TITLE_REGISTER]: 'secondary',
  [TITLE_REJECT]: 'error'
};

export const isAllowedToCheck = (status: string, registerId: string): boolean => {
  return status === ACTION_REGISTERED;
  // && getLoggedInUser().id !== registerId
};

export const isAllowedToApprove = (status: string, registerId: string, checkerId: string): boolean => {
  return status === ACTION_CHECKED;
  // && getLoggedInUser().id !== registerId && getLoggedInUser().id !== checkerId
};

export const isAllowedToReject = (status: string): boolean => {
  return status !== ACTION_APPROVED;
};

export const isAllowedToAuthorize = (status: string, registerId: string, checkerId: string, approverId: string): boolean => {
  return (
    status === ACTION_APPROVED
    // &&
    // getLoggedInUser().id !== registerId &&
    // getLoggedInUser().id !== checkerId &&
    // getLoggedInUser().id !== approverId
  );
};

export const MODEL_ACTIONS: string[] = [REQUEST_REGISTER, REQUEST_CHECK, REQUEST_APPROVE, REQUEST_AUTHORIZE, 'view'];
