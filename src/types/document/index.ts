export interface Document {
  author: string;
  copy_right_notice: string;
  created_at: string;
  department_id: string;
  description: string;
  documentcategory_id: string;
  documentsubcategory_id: string;
  documenttype_id: string;
  edition: string;
  id: string;
  isbn: number;
  parent_id: string | null;
  publication_date: string | Date;
  revision_no: string | null;
  title: string;
  updated_at: string;
}
