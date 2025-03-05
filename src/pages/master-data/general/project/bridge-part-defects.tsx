import { Fragment } from "react"
import GeneralMasterLayout from "../general-master-layout"
import BridgePartDefectMasterList from "src/views/pages/master/general/project/bridge-part-defect-master/bridge-part-defect-master-list"

function BridgePartDefects() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <BridgePartDefectMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default BridgePartDefects

