import { Fragment } from "react"
import GeneralMasterLayout from "../general-master-layout"
import EndwallTypeOutletMasterList from "src/views/pages/master/general/project/endwall-type-outlet-master/endwall-type-outlet-master-list"

function EndwallTypeOutlets() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <EndwallTypeOutletMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default EndwallTypeOutlets

