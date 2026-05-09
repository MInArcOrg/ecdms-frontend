export interface ProjectFile {
  id: string;
  project_id: string;
  title: string;
  type: string;
  description?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

