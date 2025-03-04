import { Fragment } from "react"
import GeneralMasterLayout from "../GeneralLayout"
import DesignTrafficFlowMasterList from "src/views/pages/master/general/Project/design-traffic-flow-master/design-traffic-flow-master-list"

function DesignTrafficFlows() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <DesignTrafficFlowMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default DesignTrafficFlows

