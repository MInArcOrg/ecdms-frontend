import { Fragment } from "react"
import GeneralMasterLayout from "../GeneralLayout"
import CrossSectionTypeMasterList from "src/views/pages/master/general/Project/cross-section-type-master/cross-section-type-master-list"

function CrossSectionTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <CrossSectionTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default CrossSectionTypes

