import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import GuardRailTypeMasterList from 'src/views/pages/master/general/project/guard-rail-type-master/guard-rail-type-master-list';

function RoadLengthTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <GuardRailTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default RoadLengthTypes;
