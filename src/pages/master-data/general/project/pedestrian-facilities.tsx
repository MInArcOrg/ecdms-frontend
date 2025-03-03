import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import PedestrianFacilityMasterList from 'src/views/pages/master/general/project/pedestrian-facilities-master/pedestrian-facility-master-list';

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
