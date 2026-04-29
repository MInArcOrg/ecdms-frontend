type CenterDocument = {
  id: string;
  department_id: string;
  title: string;
  description?: string | null;
  file_type?: string | null;
  created_at?: Date | string;
};

export default CenterDocument;
