// ** MUI Imports
import CentersLayout from 'src/views/components/centers/CentersLayout'
import { TabPanel } from '@mui/lab'

import TabsRoute from './tab-routes'
import StructureComponent from 'src/views/components/centers/StructureComponent'
import UserLayout from 'src/layouts/UserLayout'

const SubDepartemnts = ({ parentDepartment }) => {
  return (
    <TabPanel
      value='5'
      sx={{
        backgroundColor: '#EFF2F7'
      }}
    >
      <StructureComponent viewAll={true} parentDepartment={parentDepartment} />
    </TabPanel>
  )
}

SubDepartemnts.getLayout = page => (
  <UserLayout>
    <CentersLayout value='5' routes={TabsRoute}>
      {page}
    </CentersLayout>
  </UserLayout>
)

export default SubDepartemnts
