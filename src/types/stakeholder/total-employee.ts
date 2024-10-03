export interface TotalEmployee {
  id: string; // UUID
  parent_id?: string; // UUID (optional)
  stakeholder_id: string; // UUID
  year: Date; // Date
  domain: string; // String
  department_name?: string; // UUID (optional)
  nationality?: string | { label: string; value: string }; // String
  male: number; // Integer
  female: number; // Integer
  quantity: number; // Integer
  total_employees: number;
  file_id?: string; // UUID (optional)
  revision_no?: number; // Integer (optional)
  created_at: Date; // Timestamp for creation
  updated_at: Date; // Timestamp for updates
}
