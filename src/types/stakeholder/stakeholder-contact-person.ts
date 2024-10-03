export interface StakeholderContactPerson {
  id: string;
  parent_id?: string;
  stakeholder_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone_number: string;
  full_name?: string; // Virtual field, computed from first and middle names
  created_at: Date;
  updated_at: Date;
}
