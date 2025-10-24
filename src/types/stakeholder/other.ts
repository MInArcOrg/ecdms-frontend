import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';
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

export interface StakeholderDocument {
  id?: string;
  stakeholder_id: string; // From route props
  document_type: string; // STRING field
  title: string; // STRING field
  description: string | null; // TEXT field
  author: string; // STRING field
  edition: string; // STRING field
  publication_date?: string | Date | EthiopianDate; // DATE field (stored as string/ISO)
  isbn: string; // STRING field
  copy_right_notice: string; // STRING field
  created_at?: string;
  updated_at?: string;
}