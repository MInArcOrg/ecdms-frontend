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
