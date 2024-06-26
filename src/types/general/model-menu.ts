export interface ModelMenu {
  id: string;
  parent_id: string | null;
  module_type_id: string;
  module: string;
  model: string;
  created_at: string;
  updated_at: string;
}
