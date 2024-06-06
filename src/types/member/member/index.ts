import MemberContact from '../contact';

type Member = {
  [x: string]: any;
  avatar: string;
  id: string;
  small_team_id?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  nationality?: string;
  birth_date?: string | Date;
  gender?: string;
  registration_date?: string;
  full_name?: string;
  name?: string;
  church_service_history?: string[];
  church_service_wish?: string[];
  createdAt: string;
  updatedAt: string;
  primaryContact?: MemberContact;
  status: MemberStatusType;
};
export enum MemberStatusType {
  active = 'active',
  inactive = 'inactive',
  suspended = 'suspended'
}
export default Member;
