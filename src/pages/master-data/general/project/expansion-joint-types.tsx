import { Fragment } from "react"
import GeneralMasterLayout from "../general-master-layout"
import ExpansionJointTypeMasterList from "src/views/pages/master/general/project/expansion-joint-type-master/expansion-joint-type-master-list"

function ExpansionJointTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ExpansionJointTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default ExpansionJointTypes

