import { GeneralMaster } from '../general/general-master';

export interface Resource {
  id: string;
  parent_id: string | null;
  department_id: string | null;
  resourcetype_id: string;
  resourcecategory_id: string;
  resourcesubcategory_id: string;
  measurement_unit: string;
  title: string;
  description: string;
  image_id: string | null;
  revision_no: number | null;
  created_at: string;
  updated_at: string;
  status: string;
}
export interface ResourceSpecification {
  id: string;
  parent_id: string | null;
  resource_id: string;
  title: string;
  description: string;
  image: string;
  datasource: string;
  revision_no: number | null;
  created_at: string;
  updated_at: string;
}
export interface ResourceBrand {
  id: string;
  parent_id: string | null;
  resource_id: string;
  title: string;
  description: string;
  image: string;
  datasource: string;
  revision_no: number | null;
  created_at: string;
  updated_at: string;
}
export interface DetailResourceType {
  id: string;
  parent_id: string | null;
  resource_id: string;
  title: string;
  description: string;
  image: string;
  datasource: string;
  revision_no: number | null;
  created_at: string;
  updated_at: string;
}
export interface ResourceStudyField {
  id: string;
  parent_id: string | null;
  studyfield_id: string;
  resource_id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  studyfield?: GeneralMaster;
}
export interface ResourceStudyLevel {
  id: string;
  parent_id: string | null;
  studylevel_id: string;
  resource_id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  studylevel?: GeneralMaster;
}
export interface ResourceSalary {
  id: string;
  max_pay: number;
  min_pay: number;
  resource_id: string;
  salary_type: string;
  year: string;
}
export interface ResourceWorkExperience {
  id: string;
  workexperience_id: string;
  resource_id: string;
  description: string;
  workexperience?: GeneralMaster;
}
export interface ResourceQuantityPrice {
  id: string;
  parent_id: string | null;
  resource_id: string;
  detailresourcetype_id: string;
  resourcebrand_id: string;
  project_id: string | null;
  quantity: number;
  unit_price: number;
  store_address: string;
  date: string;
  datasource: string;
  revision_no: number | null;
  created_at: string;
  updated_at: string;
  resourcebrand: ResourceBrand;
  detailresourcetype: DetailResourceType;
}

export interface ProfessionalAddress {
  id?: string;
  professional_id: string;
  country: string;
  region: string;
  city: string;
  sub_city: string;
  woreda: string;
  street: string;
  block_no: string;
  website: string;
  northing: number;
  easting: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProfessionalContact {
  id?: string;
  professional_id: string;
  phone_no: string;
  email: string;
  website?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProfessionalAdditionalInfo {
  id?: string;
  professional_id: string;
  additional_information: string;
  reference?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProfessionalEducation {
  id?: string;
  professional_id: string;
  study_field: string;
  school_name?: string;
  education_level?: string;
  program_type: string;
  start_date: string;
  end_date: string;
  gpa: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProfessionalWorkExperience {
  id?: string;
  professional_id: string;
  company_name: string;
  department?: string;
  position: string;
  task_description: string;
  start_date: string;
  end_date: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface ProfessionalMembership {
  id?: string;
  professional_id: string;
  association_name: string;
  membership_type: string;
  position?: string;
  description: string;
  registration_date: string;
  end_date: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProfessionalCertification {
  id?: string;
  professional_id: string;
  certification_type: string;
  certificate_title: string;
  certification_scope?: string;
  certifying_body: string;
  certification_number?: string;
  issue_date: string;
  expire_date?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProfessionalContactPerson {
  id?: string;
  professional_id: string;
  national_id_no: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  gender: string;
  phone_no: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Professional {
  id?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  national_id_no: string;
  date_of_birth: string;
  gender: string;
  phone_no: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}
