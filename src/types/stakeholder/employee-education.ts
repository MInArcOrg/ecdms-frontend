export interface EmployeeEducation {
  id: string; // UUID
  parent_id?: string; // UUID (optional)
  stakeholder_id: string; // UUID (required)
  year: Date; // Date (required)
  domain: string; // String (required)
  department_name?: string; // String (optional)
  nationality?: string | { label: string; value: string }; // String (required)
  male: number; // Integer (required)
  female: number; // Integer (required)
  studylevel_id: string; // UUID (required)
  file_id?: string; // UUID (optional)
  revision_no?: number; // Integer (optional)
  total_employees?: number;
  created_at: Date; // Timestamp for creation
  updated_at: Date; // Timestamp for updates
}
