export interface StakeholderManager {
    id?: string;
    stakeholder_id: string;
    type?: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    department: string;
    position?: string;
    nationality?: string;
    national_id_no?: string;
    birth_date: string;
    gender: string;
    phone_no: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
  }