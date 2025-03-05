import { Fragment } from 'react';
import RoadLengthTypeMasterList from 'src/views/pages/master/general/project/road-length-type-master/road-length-type-master-list';
import GeneralMasterLayout from '../general-master-layout';

function RoadLengthTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <RoadLengthTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default RoadLengthTypes;
