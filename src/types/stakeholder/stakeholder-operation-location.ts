export interface StakeholderOperationLocation {
  id: string; // UUID
  parent_id?: string; // UUID (optional)
  stakeholder_id: string; // UUID
  country?: string | { value: string; label: string }; // Text (optional)
  status?: boolean; // Boolean (optional)
  revision_no?: number; // Integer (optional)
  created_at: Date;
}
