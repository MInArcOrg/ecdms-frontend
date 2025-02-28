export interface StakeholderBranchManager {
  id?: string;
  stakeholder_id: string;
  stakeholder_branch_id: string;
  department: string;
  position: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  phone: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}
