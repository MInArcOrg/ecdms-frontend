import User from '../admin/user';

export interface ModelAction {
  id?: string;
  model_id: string;
  model: string;
  action: string;
  user_id: string;
  position_id: string;
  time?: Date;
  user?: User;
}

interface AuthorizationData {
  registered_data: ModelAction;
  checked_data: ModelAction;
  approved_data: ModelAction;
  authorized_data: ModelAction;
  rejected_data: ModelAction;
}

export interface AuthorizationResponse {
  authorization_data: AuthorizationData;
  id: string;
  status: string;
}

export interface ActionReply {
  id: string;
  actionstate_id: string;
  creator_id?: string;
  user: User;
  content: string;
  type?: string;
  status?: string;
  is_authorized: boolean;
  created_at: string;
}
