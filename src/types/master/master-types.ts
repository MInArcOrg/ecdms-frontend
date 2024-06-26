export interface MasterCategory {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  [key: string]: string | undefined;
}
export interface MasterSubCategory {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface MasterType {
  created_at: string;
  description: string;
  file_id: string | null;
  id: string;
  title: string;
  parent_id: string | null;
  revision_no: string | null;
  updated_at: string;
}
