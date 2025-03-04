import { Fragment } from "react"
import GeneralMasterLayout from "../GeneralLayout"
import DrivewayAccessPointMasterList from "src/views/pages/master/general/Project/driveway-access-point-master/driveway-access-point-master-list"

function DrivewayAccessPoints() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <DrivewayAccessPointMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default DrivewayAccessPoints

