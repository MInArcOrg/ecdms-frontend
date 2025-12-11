export interface ProjectContactPerson {
  id?: string;
  project_id: string;
  stakeholder_id: string;
  department?: string;
  position: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  national_id_no?: string;
  nationality?: string;
  gender: string;
  phone: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}
