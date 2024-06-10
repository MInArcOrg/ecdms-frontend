// ** MUI Imports
import CentersLayout from 'src/views/components/centers/CentersLayout';
import { TabPanel } from '@mui/lab';
import TabsRoute from './tab-routes';
import ProfessionalTable from 'src/views/components/centers/Professional/ProfessionalTable';
import UserLayout from 'src/layouts/UserLayout';
import { ReactNode } from 'react';
import Department from 'src/types/department/department';

const Professionals = ({ parentDepartment }: { parentDepartment: Department }) => {
  return (
    <TabPanel value="3">
      <ProfessionalTable parentDepartment={parentDepartment} />
    </TabPanel>
  );
};

Professionals.getLayout = (page: ReactNode) => (
  <UserLayout>
    <CentersLayout value="3" routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
);
Professionals.acl = {
  action: 'view_professional',
  subject: 'professional'
};

export default Professionals;
