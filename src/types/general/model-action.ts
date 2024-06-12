import User from '../admin/user';

export interface ModelAction {
  id?: string;
  model_id: string;
  model: string;
  action: string;
  user_id: string;
  position_id: string;
  time?: Date;
}

interface Data {
  by: string;
  user: User;
  time: string;
}

interface AuthorizationData {
  registered_data: Data;
  checked_data: Data;
  approved_data: Data;
  authorized_data: Data;
  rejected_data: Data;
}

export interface AuthorizationResponse {
  authorization_data: AuthorizationData;
  id: string;
  status: string;
}
