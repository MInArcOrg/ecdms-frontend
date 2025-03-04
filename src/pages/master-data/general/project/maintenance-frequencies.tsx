import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import MaintenanceFrequencyMasterList from 'src/views/pages/master/general/project/maintenance-frequency-master/maintenance-frequency-master-list';

function MaintenanceFrequencyMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <MaintenanceFrequencyMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default MaintenanceFrequencyMasterData;
