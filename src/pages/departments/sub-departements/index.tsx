// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabsRoute from '../tab-routes';
import UserLayout from 'src/layouts/UserLayout';
import Department from 'src/types/department/department';
import CentersLayout from 'src/views/pages/centers/centers-layout';
import { ReactElement, ReactNode } from 'react';
import SubDepartmentList from 'src/views/pages/centers/sub-department/sub-department-list';

const Index = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel value="1">
      <SubDepartmentList parentDepartment={parentDepartment} />
    </TabPanel>
  );
};
Index.getLayout = (page: { page: ReactElement }) => (
  <UserLayout>
    <CentersLayout value="1" routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
);
Index.acl = {
  action: 'view_department',
  subject: 'department'
};

export default Index;
