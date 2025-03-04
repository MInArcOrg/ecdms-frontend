import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import RoadSafetyFeatureMasterList from 'src/views/pages/master/general/project/road-saftey-feature-master/road-safety-feature-master-list';

function RoadSafetyFeatures() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <RoadSafetyFeatureMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default RoadSafetyFeatures;
