export interface ProjectQuality {
    id?: string;
    project_id: string;
    major_quality_problem_encountered: string;
    description?: string;
    measures_taken: string;
    lesson_learned: string;
    created_at?: Date;
    updated_at?: Date;
  }