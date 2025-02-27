import { Fragment } from 'react';
import GeneralLayout from '../GeneralLayout';
import PedestrianFacilityMasterList from 'src/views/pages/master/general/project/pedestrian-facilities-master/pedestrian-facility-master-list';

function GeneralProjectMasterData() {
  return (
    <div>
      <GeneralLayout>
        <Fragment>
          <PedestrianFacilityMasterList />
        </Fragment>
      </GeneralLayout>
    </div>
  );
}

export default GeneralProjectMasterData;
