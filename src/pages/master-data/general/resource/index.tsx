import { Fragment } from "react";
import GeneralMasterResourceList from "src/views/pages/master/general/general-resource-master/general-master-resource-list";
import GeneralMasterLayout from "../general-master-layout";

function GeneralStakeholderMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <GeneralMasterResourceList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralStakeholderMasterData;
