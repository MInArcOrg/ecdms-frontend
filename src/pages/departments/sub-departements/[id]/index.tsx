// ** MUI Imports
import { TabPanel } from '@mui/lab';
import TabRoutesWithId from '../../tab-routes-with-id';
import UserLayout from 'src/layouts/UserLayout';
import CentersLayout from 'src/views/pages/centers/centers-layout';
import SubDepartmentList from 'src/views/pages/centers/sub-department/sub-department-list';
import Department from 'src/types/department/department';
import { ReactElement } from 'react';

const Index = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel value="1" sx={{ margin: 0, padding: 0 }}>
      <SubDepartmentList parentDepartment={parentDepartment} />
    </TabPanel>
  );
};
Index.getLayout = (page: ReactElement) => {
  return (
    <UserLayout>
      <CentersLayout value="1" routes={TabRoutesWithId}>
        {page}
      </CentersLayout>
    </UserLayout>
  );
};
Index.acl = {
  action: 'view_department',
  subject: 'department'
};

export default Index;
