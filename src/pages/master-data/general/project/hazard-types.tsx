import { Fragment } from 'react';
import HazardTypeMasterList from 'src/views/pages/master/general/project/hazard-type-master/hazard-type-master-list';
import GeneralMasterLayout from '../general-master-layout';

function HazardLengthTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <HazardTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default HazardLengthTypes;
