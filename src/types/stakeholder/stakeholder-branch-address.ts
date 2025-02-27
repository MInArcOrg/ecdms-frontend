export interface StakeholderBranchAddress {
  id?: string;
  stakeholder_id: string;
  stakeholder_branch_id: string;
  country: string;
  region: string;
  city: string;
  subcity: string;
  woreda: string;
  street?: string;
  block_no?: string;
  website?: string;
  northing: string;
  easting: string;
  created_at?: Date;
  updated_at?: Date;
}
