export interface GeneralMaster {
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
