interface Position {
  id: string;
  is_head: boolean;
  name: string;
  description: string;
  department_id: string;
  created_at: Date | string;
  quantity_needed: number;
}
export default Position;
