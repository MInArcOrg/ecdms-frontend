import { Fragment } from "react"
import GeneralMasterLayout from "../general-master-layout"
import DeckSlabTypeMasterList from "src/views/pages/master/general/project/deck-slab-type-master/deck-slab-type-master-list"

function DeckSlabTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <DeckSlabTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  )
}

export default DeckSlabTypes

