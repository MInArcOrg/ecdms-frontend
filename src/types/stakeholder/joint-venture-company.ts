export interface JointVentureCompany {
  id?: string;
  stakeholder_id: string;
  joint_venture_id: string;
  company_name: string;
  specialization?: string;
  roles_and_responsibilities?: string;
  ownership_percentage?: number;
  description: string;
  reference: string;
  created_at?: Date;
  updated_at?: Date;
}
