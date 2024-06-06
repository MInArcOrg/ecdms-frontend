// Import necessary modules and components
import { useRouter } from 'next/router';
import useDepartment from 'src/hooks/team/department-hook';
import DepartmentViewPage from 'src/views/team/departments/view/DepartmentViewPage';

// Define the functional component
const DepartmentView = () => {
  const router = useRouter();
  const departmentId = router.query.id;
  const tab = router.query.tab || 'sub-departments';
  const { useGetOneDepartment } = useDepartment() as ReturnType<typeof useDepartment>;
  const { data: department, isLoading } = useGetOneDepartment(String(departmentId));

  return <DepartmentViewPage isLoading={isLoading} tab={String(tab)} department={department} />;
};

export default DepartmentView;
