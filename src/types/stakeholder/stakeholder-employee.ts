export interface StakeholderEmployee {
  id?: string;
  stakeholder_id: string;
  stakeholder_department_id: string;
  stakeholder_position_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  national_id_no: string;
  gender: string;
  phone: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}
