import { Stakeholder } from '../stakeholder';

export interface ProjectStakeholder {
  id: string;
  parent_id?: string;
  project_id: string;
  stakeholder_id: string;
  stakeholder?: Stakeholder;
  title: string;
  description?: string;
  remark?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
