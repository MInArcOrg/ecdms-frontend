import { Fragment } from "react"
import GeneralMasterLayout from "../GeneralLayout"
import DesignStandardMasterList from "src/views/pages/master/general/Project/design-standard-master/design-standard-master-list"
function DesignStandards() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <DesignStandardMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default DesignStandards

