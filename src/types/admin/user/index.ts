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
  lang: string;
  is_activated: boolean;
  created_at: string;
  updatedAt: string;
  access_token?: string; // Include access_token for JWT
};
export default User;
