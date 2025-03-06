import { Fragment } from 'react';
import SuggestedRepairMasterList from 'src/views/pages/master/general/project/hazard-type-master/hazard-type-master-list';
import GeneralMasterLayout from '../general-master-layout';

function HazardLengthTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <SuggestedRepairMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default HazardLengthTypes;
