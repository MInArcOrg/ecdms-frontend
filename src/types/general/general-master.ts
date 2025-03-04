export interface GeneralMaster {
  service_type: any;
  created_at: string;
  title: string;
  description: string;
  id: string;
}

export type GeneralMasterResource = {
  id: string;
  parent_id: string | null; // Allow null for parent_id
  service_type: string;
  specification_detail: string;
  measurement_unit: string;
  created_at: string;
  updated_at: string;
};

export interface StudyField {
  id: string;
  parent_id?: string; // Optional field
  title: string;
  description?: string; // Optional field
  study_program_id: string;
  studylevel_id: string;
  revision_no?: number; // Optional field
  created_at?: Date; // Optional field
  updated_at?: Date; // Optional field
}

export interface FunctionalClassification {
  id: string
  title?: string
  description?: string
  project_type_id: string
  created_at?: Date
  updated_at?: Date
}

export interface DesignClassification {
  id: string
  title?: string
  description?: string
  project_type_id: string
  created_at?: Date
  updated_at?: Date
}

export interface DesignStandard {
  id: string
  title?: string
  description?: string
  project_type_id: string
  created_at?: Date
  updated_at?: Date
}

export interface DesignTrafficFlow {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SurfaceType {
  id: string
  title?: string
  description?: string
  project_type_id: string
  created_at?: Date
  updated_at?: Date
}

export interface CrossSectionType {
  id: string
  title?: string
  description?: string
  project_type_id: string
  created_at?: Date
  updated_at?: Date
}

export interface IntersectionType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface DrivewayAccessPoint {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}



