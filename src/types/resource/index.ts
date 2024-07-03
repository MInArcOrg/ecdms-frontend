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
