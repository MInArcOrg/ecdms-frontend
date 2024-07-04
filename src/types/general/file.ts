export interface FileModel {
  created_at: string;
  id: string;
  parentId?: string;
  title: string;
  url?: string;
  type: string;
  description?: string;
  extension?: string;
  reference_id?: string;
  size: number;
  revisionNo: number;
}
export interface ImageModel {
  created_at: string;
  id: string;
  model_id: string;
  type: string;
  updated_at: string;
  url: string;
}
