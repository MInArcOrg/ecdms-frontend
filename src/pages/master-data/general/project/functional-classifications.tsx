import { Fragment } from "react"
import GeneralMasterLayout from "../GeneralLayout"
import FunctionalClassificationMasterList from "src/views/pages/master/general/Project/functional-classification-master/functional-classification-master-list"

function FunctionalClassifications() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <FunctionalClassificationMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default FunctionalClassifications

