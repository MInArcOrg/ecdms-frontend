import { Fragment } from "react"
import GeneralMasterLayout from "../general-master-layout"
import PierTypeMasterList from "src/views/pages/master/general/project/pier-type-master/pier-type-master-list"

function PierTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <PierTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default PierTypes

