import Department from 'src/types/department/department';
import Position from 'src/types/department/position';
import { GeneralMaster } from 'src/types/general/general-master';
import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';

// src/types/users.ts
type User = {
  id: string;
  department_id?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  full_name: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  marital_status: string | null;
  partner_name: string | null;
  birth_date: string | Date | EthiopianDate | undefined;
  position_name?: string;
  department: Department;
  position: Position;
  lang: string;
  is_activated: boolean;
  created_at: string;
  updatedAt: string;
  access_token?: string; // Include access_token for JWT
};
export interface UserEducation {
  id?: string;
  user_id: string;
  study_field_id: string;
  studyField: GeneralMaster;
  school_name?: string;
  education_level?: string;
  program_type: string;
  start_date: string | Date | EthiopianDate | undefined;
  end_date: string | Date | EthiopianDate | undefined;
  gpa: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface UserWorkExperience {
  id?: string;
  user_id: string;
  company_name: string;
  department?: string;
  position?: string;
  task_description: string;
  start_date: string | Date | EthiopianDate | undefined;
  end_date?: string | Date | EthiopianDate | undefined;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserContactPerson {
  id?: string;
  user_id: string;
  national_id_no?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  phone_no: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}
export default User;
