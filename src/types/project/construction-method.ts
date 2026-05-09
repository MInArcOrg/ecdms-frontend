import type { ProjectGeneralMaster } from 'src/types/general/general-master';

export interface ConstructionMethod {
  id: string;
  project_id: string;
  project_method_id: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  projectMethod?: ProjectGeneralMaster;
  project_method?: { id: string; title: string };
}
