// ** MUI Imports
import { TabPanel } from '@mui/lab';
import UserLayout from 'src/layouts/UserLayout';
import Department from 'src/types/department/department';
import CentersLayout from 'src/views/pages/centers/centers-layout';
import { ReactElement } from 'react';
import SubDepartmentList from 'src/views/pages/centers/sub-department/sub-department-list';
import TabsRoute from '../tab-routes';

const Departments = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel value="1" sx={{ margin: 0, padding: 0 }}>
      <SubDepartmentList parentDepartment={parentDepartment} />
    </TabPanel>
  );
};

Departments.getLayout = (page: ReactElement) => (
  <UserLayout>
    <CentersLayout value="1" routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
);
Departments.acl = {
  action: 'view_department',
  subject: 'department'
};

export default Departments;
