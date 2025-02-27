export interface StakeholderDepartment {
  id?: string;
  stakeholder_id: string;
  parent_department_id?: string;
  name: string;
  description: string;
  reference?: string;
  created_at?: Date;
  updated_at?: Date;
}
