import { Fragment } from "react"
import GeneralMasterLayout from "../GeneralLayout"
import DesignClassificationMasterList from "src/views/pages/master/general/Project/design-classification-master/design-classification-master-list"

function DesignClassifications() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <DesignClassificationMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default DesignClassifications

