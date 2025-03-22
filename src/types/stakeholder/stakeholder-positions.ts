export interface StakeholderPosition {
  id?: string;
  stakeholder_id: string;
  stakeholder_department_id: string;
  name: string;
  required_education?: string;
  required_work_experience?: string;
  salary?: number;
  no_of_professionals?: number;
  description: string;
  reference?: string;
  created_at?: Date;
  updated_at?: Date;
}
