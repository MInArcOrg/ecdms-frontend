type Department = {
  id: string;
  name: string;
  description: string;
  parent_department_id: string;
  established_date: Date | string;
  created_at: Date | string;
};
export default Department;
