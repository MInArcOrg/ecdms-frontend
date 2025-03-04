import { Fragment } from "react"
import GeneralMasterLayout from "../GeneralLayout"
import SurfaceTypeMasterList from "src/views/pages/master/general/Project/surface-type-master/surface-type-master-list"

function SurfaceTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <SurfaceTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default SurfaceTypes

