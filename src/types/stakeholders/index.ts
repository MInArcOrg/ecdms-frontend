export interface Stakeholder {
  id: string;
  parent_id: string | null;
  department_id: string | null;
  stakeholdertype_id: string;
  stakeholdercategory_id: string;
  stakeholdersubcategory_id: string;
  trade_name: string;
  description: string;
  image_id: string | null;
  revision_no: number | null;
  created_at: string;
  updated_at: string;
  status: string;
}
