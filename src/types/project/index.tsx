import { GeneralMaster } from "../general/general-master";

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
    status_id?:string;
    budget_code?: string;
    procurement_no?: string;
    revision_no?: number;
    elapsed_time?:number;
    cpi?:number;
    spi:number;
    created_at:string;
    updated_at:string;
  }
 
  export interface ProjectStatus {
    created_at: string; // ISO 8601 date-time string
    description: string | null;
    id: string;
    parent_id: string | null;
    project_id: string;
    revision_no: string | null;
    status: GeneralMaster;
    status_id: string;
    updated_at: string; // ISO 8601 date-time string
  }