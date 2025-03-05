import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import EndwallTypeInletMasterList from 'src/views/pages/master/general/project/endwall-type-inlet-master/endwall-type-inlet-master-list';

function EndWallTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <EndwallTypeInletMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default EndWallTypes;
