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
