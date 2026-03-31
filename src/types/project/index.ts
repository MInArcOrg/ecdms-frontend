import { GeneralMaster } from '../general/general-master';
import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';

export interface Project {
  id: string;
  department_id?: string;
  parent_id?: string;
  projectcategory_id: string;
  projecttype_id: string;
  projectsubcategory_id?: string;
  name: string;
  remark?: string;
  contract_no?: string;
  status_id?: string;
  budget_code?: string;
  procurement_no?: string;
  revision_no?: number;
  elapsed_time?: number;
  cpi?: number;
  spi: number;
  created_at: string;
  updated_at: string;
  grade?: string;
  end_user?: string;
  function?: string;
  main_contract_price_amount?: number;
  source_of_finance?: string;
  commencement_date?: string | Date | EthiopianDate;
  completion_date?: string | Date | EthiopianDate;
  original_contract_duration?: number;
}

export interface ProjectStatus {
  description: string | null;
  id: string;
  parent_id: string | null;
  project_id: string;
  revision_no: string | null;
  status: GeneralMaster;
  status_id: string;
  updated_at: string;
  created_at: string;
}
export interface ProjectFinance {
  id: string;
  parent_id?: string;
  project_id: string;
  main_contract_price_amount?: number;
  rebate?: number;
  remark?: string;
  revision_no?: number;
  price_after_rebate: number;
  source_of_finance?: string;
}
