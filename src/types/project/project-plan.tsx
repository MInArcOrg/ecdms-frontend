export interface ProjectPlan {
    id: string;
    parent_id?: string | null;
    project_id: string;
    type?: string | null;
    project_expense?: number | null;
    manpower?: number | null;
    direct_labour?: number | null;
    indirect_labour?: number | null;
    material?: number | null;
    machinery?: number | null;
    other_expense?: number | null;
    sub_contractor_cost?: number | null;
    financial_performance?: number | null;
    physical_performance?: number | null;
    cost_due_to_rework?: number | null;
    over_head_cost?: number | null;
    year?: string | null;
    quarter?: string | null;
    start: Date;
    end?: Date | null;
    profit?: number | null;
    file_id?: string | null;
    remark?: string | null;
  }