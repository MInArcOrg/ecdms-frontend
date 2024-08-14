export interface FileModel {
  created_at: string;
  updated_at: string;
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
  title: string;
  model_id: string;
  type: string;
  updated_at: string;
  url: string;
}

export interface FileWithId {
  id: string;
  file: File;
  isFetched?: boolean; // Flag to indicate if it's a fetched image
}
