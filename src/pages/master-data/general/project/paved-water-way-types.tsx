import { Fragment } from "react"
import GeneralMasterLayout from "../general-master-layout"
import PavedWaterWayTypeMasterList from "src/views/pages/master/general/project/paved-water-way-type-master/paved-water-way-type-master-list"

function PavedWaterWayTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <PavedWaterWayTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default PavedWaterWayTypes

