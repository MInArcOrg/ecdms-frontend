export interface BranchAdditionalInformation {
  id?: string;
  stakeholder_id: string;
  stakeholder_branch_id: string;
  additional_information: string;
  reference?: string;
  created_at?: Date;
  updated_at?: Date;
}
