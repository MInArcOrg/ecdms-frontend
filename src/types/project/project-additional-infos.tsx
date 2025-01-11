export interface ProjectAdditionalInfo {
    id: string;
    parent_id: string | null;
    project_id: string;
    project_status: string;
    reason: string;
    work_accident_number: number;
    created_at: string; 
    updated_at: string;
  }

  export interface ProjectAdditionalInfoPayload {
    project_id: string;
    project_status: string;
    reason: string;
    work_accident_number: number;
  }