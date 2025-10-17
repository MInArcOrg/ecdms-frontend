import { StudyField } from '../general/general-master';

export interface StakeholderStudyField {
  id: string;
  parent_id?: string;
  description?: string;
  studyfield_id: string;
  studyfield: StudyField;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface StudyPeriodCost {
  id: string; // UUID
  parent_id?: string; // UUID (optional)
  stakeholder_id: string; // UUID
  title?: string; // Optional string
  description?: string; // Optional text
  stakeholderstudyfield_id: string; // UUID
  total_month: number; // Integer
  study_cost: number; // Double
  revision_no?: number; // Optional integer
  stakeholderstudyfield: StakeholderStudyField;
  created_at: Date; // Timestamp
  updated_at: Date; // Timestamp
}

export interface StakeholderService {
  id: string;
  parent_id?: string;
  stakeholder_id: string;
  construction_related_service_id: string;
  constructionrelatedservice: ConstructionRelatedService;
  unit_price: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface ConstructionRelatedService {
  id: string;
  parent_id?: string;
  service_type: string;
  specification_detail: string;
  measurement_unit: string;
  created_at?: Date;
  updated_at?: Date;
}
