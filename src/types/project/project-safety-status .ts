export interface ProjectSafetyStatus {
  id?: string;
  stakeholder_id: string;
  no_of_fatal_injuries: number;
  no_of_major_injuries: number;
  no_of_minor_injuries: number;
  measures_taken: string;
  lesson_learned: string;
  created_at?: Date;
  updated_at?: Date;
}
