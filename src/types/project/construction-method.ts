export interface ConstructionMethod {
  id: string;
  project_id: string;
  project_method_id: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  project_method?: {
    id: string;
    title: string;
  };
}
