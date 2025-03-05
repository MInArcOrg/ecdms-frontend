import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import GroundWaterImpactMasterList from 'src/views/pages/master/general/project/ground-water-impact-master/ground-water-impact-master-list';

function EndWallTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <GroundWaterImpactMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default EndWallTypes;
