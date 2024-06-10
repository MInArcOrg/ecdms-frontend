// ** MUI Imports
import CentersLayout from 'src/views/components/centers/CentersLayout';
import { TabPanel } from '@mui/lab';
import TabsRoute from '../tab-routes';
import SubDepartementTable from 'src/views/components/centers/SubDepartment/SubDepartementTable';
import UserLayout from 'src/layouts/UserLayout';

const Index = ({ parentDepartment }) => {
  return (
    <TabPanel value="1">
      <SubDepartementTable parentDepartment={parentDepartment} />
    </TabPanel>
  );
};
Index.getLayout = (page) => (
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
