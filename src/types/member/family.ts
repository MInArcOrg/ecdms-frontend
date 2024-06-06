export type FamilyMember = {
  member_id: string;
  family_id: string;
  family_role: string;
};
type Family = {
  member_id: string;
  id: string;
  members: FamilyMember[];
};

export default Family;
