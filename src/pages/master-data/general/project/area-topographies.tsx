import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import AreaTopographyMasterList from 'src/views/pages/master/general/project/area-topography-master/area-topography-master-list';

function GeneralProjectMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <AreaTopographyMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralProjectMasterData;
