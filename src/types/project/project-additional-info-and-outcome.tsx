export interface ProjectAdditionalInfo {
    id: string;
    parent_id?: string;
    project_id: string;
    project_status: string;
    reason: string;
    work_accident_number: number;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface ProjectOutcome {
    id: string;
    parent_id?: string;
    project_id: string;
    construction_type: string;
    function: string;
    lesson_learned: string;
    created_at?: Date;
    updated_at?: Date;
  } 