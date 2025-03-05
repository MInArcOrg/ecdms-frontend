import { Fragment } from "react"
import GeneralMasterLayout from "../general-master-layout"
import DamageTypeMasterList from "src/views/pages/master/general/project/damage-type-master/damage-type-master-list"

function DamageTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <DamageTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default DamageTypes

