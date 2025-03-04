import { Fragment } from "react"
import GeneralMasterLayout from "../general-master-layout"
import AbutmentTypeMasterList from "src/views/pages/master/general/project/abutment-type-master/abutment-type-master-list"

function AbutmentTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <AbutmentTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default AbutmentTypes

