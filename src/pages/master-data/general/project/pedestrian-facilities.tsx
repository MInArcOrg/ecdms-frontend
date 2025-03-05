import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import PedestrianFacilityMasterList from 'src/views/pages/master/general/project/pedestrian-facilitiy-master/pedestrian-facility-master-list';

function GeneralProjectMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <PedestrianFacilityMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralProjectMasterData;
