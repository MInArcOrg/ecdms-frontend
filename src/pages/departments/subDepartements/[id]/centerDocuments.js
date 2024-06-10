// ** MUI Imports
import CentersLayout from 'src/views/components/centers/CentersLayout'
import { TabPanel } from '@mui/lab'
import TabRoutesWithId from '../../tab-routes-with-id'
import Document from 'src/views/components/centers/Document'
import UserLayout from 'src/layouts/UserLayout'

const centerDocument = () => {
  return (
    <TabPanel value='4'>
      <Document />
    </TabPanel>
  )
}

centerDocument.getLayout = page => {
  return (
    <UserLayout>
      <CentersLayout value='4' routes={TabRoutesWithId}>
        {page}
      </CentersLayout>
    </UserLayout>
  )
}

export default centerDocument
