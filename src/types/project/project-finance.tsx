import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';

export interface ProjectVariation {
  id: string;
  parent_id?: string;
  project_id: string;
  type?: string;
  approval_date?: string | Date | EthiopianDate;
  justification?: string;
  amount: number;
  percentage: number;
  extension_time?: number;
  extension_time_id?: string;
  remark?: string;
  revision_no?: number;
  updated_at: string;
  created_at: string;
}
export interface ProjectGeneralFinance {
  main_contract_price_amount: number;
  rebate: number;
  price_after_rebate: number;
  variation_total: number;
  supplement_total: number;
  special_total: number;
  omission_total: number;
}
export interface ProjectPayment {
  id: string;
  parent_id?: string;
  project_id: string;
  type?: string;
  title: string;
  description?: string;
  amount: number;
  retention?: number;
  reference_number?: string;
}

export interface ProjectBond {
  id: string;
  parent_id?: string;
  project_id: string;
  type?: string;
  issue_date?: string | Date | EthiopianDate;
  expiration_date?: string | Date | EthiopianDate;
  issuing_institute?: string;
  institute_branch?: string;
  branch_address?: string;
  percent?: number;
  institution_type?: string;
  phone?: string;
  amount?: number;
  remark?: string;
  revision_no?: number;
}
