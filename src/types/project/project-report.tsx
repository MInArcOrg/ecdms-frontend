export interface ProjectReport {
  id: string; // UUID
  parent_id?: string; // UUID
  project_id: string; // UUID
  projectplan_id: string; // UUID
  monthlyreport_id: string; // UUID
  type?: string;
  project_expense?: number;
  manpower?: number;
  direct_labour?: number;
  indirect_labour?: number;
  material?: number;
  machinery?: number;
  other_expense?: number;
  sub_contractor_cost?: number;
  financial_performance?: number;
  physical_performance?: number;
  cost_due_to_rework?: number;
  over_head_cost?: number;
  year?: string | null | { label: string; value: string };
  quarter?: string;
  start: Date;
  end?: Date;
  profit?: number;
  file_id?: string; // UUID
  created_at?: Date;
  updated_at?: Date;

  // Virtual fields
  profit_or_loss?: number;
  projectexpense?: number;
  sub_total_expense?: number;
  subtotal?: number;
}
export interface MonthlyReport {
  id: string;
  parent_id?: string;
  project_id: string;
  year: string;
  quarter: string;
  is_submitted?: boolean;
  revised?: number;
  created_at?: Date;
  updated_at?: Date;
}
