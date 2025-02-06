export interface JointVenture {
  id?: string;
  stakeholder_id: string;
  name: string;
  member_companies_no: number;
  description: string;
  reference?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
