import EthiopianDate from "src/views/components/custom/ethio-calendar/ethiopian-date";

export interface ProjectVariation {
    id: string;
    parent_id?: string;
    project_id: string;
    type?: string;
    approval_date?: string|Date|EthiopianDate;
    justification?: string;
    amount: number;
    extension_time?: number;
    extension_time_id?: string;
    remark?: string;
    revision_no?: number;
    updated_at: string;
    created_at: string;
  }