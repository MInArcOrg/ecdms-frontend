import Member from '../member/member';

type SmallTeam = {
  id: string;
  name: string;
  leader_id: string;
  sub_leader_id: string;
  host_member_id: string;
  established_date: string;
  createdAt: Date | string;
  hostmember: Member;
  leader: Member;
  subleader: Member;
};
export default SmallTeam;
