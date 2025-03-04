import { Fragment } from "react"
import GeneralMasterLayout from "../GeneralLayout"
import IntersectionTypeMasterList from "src/views/pages/master/general/Project/intersection-type-master/intersection-type-master-list"

function IntersectionTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <IntersectionTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default IntersectionTypes

