// ** MUI Imports
import CentersLayout from 'src/views/components/centers/CentersLayout'
import { TabPanel } from '@mui/lab'

import StructureComponent from 'src/views/components/centers/StructureComponent'
import UserLayout from 'src/layouts/UserLayout'
import TabRoutesWithId from '../../tab-routes-with-id'

const SubDepartemnts = ({ parentDepartment }) => {
  return (
    <TabPanel
      value='5'
      sx={{
        backgroundColor: '#EFF2F7'
      }}
    >
      <StructureComponent parentDepartment={parentDepartment} />
    </TabPanel>
  )
}

SubDepartemnts.getLayout = page => (
  <UserLayout>
    <CentersLayout value='5' routes={TabRoutesWithId}>
      {page}
    </CentersLayout>
  </UserLayout>
)

export default SubDepartemnts
