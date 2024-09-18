export interface StudyField {
    id: string;
    parent_id?: string;
    title: string;
    description?: string;
    study_program_id: string;
    studylevel_id: string;
    revision_no?: number;
    created_at?: Date;
    updated_at?: Date;
  }