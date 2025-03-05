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

export interface BusinessFields {
  id: string;
  parent_id?: string; // Optional field
  title: string;
  description?: string; // Optional field
  created_at?: Date; // Optional field
  updated_at?: Date; // Optional field
}
export interface PedestrianFacility {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface RoadLengthType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface EndwallTypeInlet {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface AreaTopography {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SoilType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface GuardRailType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface BridgeStructureType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface SpanSupportType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface DamageCondition {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface HydrologyDefect {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CountType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface RoadSafetyFeature {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CurrentCondition {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface GroundWaterImpact {
  id: string;

  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface MaintenanceType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface SlopeStability {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface DrainageType {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MaintenanceFrequency {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface DrainageCondition {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface AssessmentCondition {
  id: string;
  title?: string;
  description?: string;
  project_type_id: string;
  created_at?: Date;
  updated_at?: Date;
}