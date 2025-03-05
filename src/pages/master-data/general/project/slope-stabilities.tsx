import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import SlopeStabilityMasterList from 'src/views/pages/master/general/project/slope-stability-master/slope-stability-master-list';

function SLopeStabilityMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <SlopeStabilityMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default SLopeStabilityMasterData;
