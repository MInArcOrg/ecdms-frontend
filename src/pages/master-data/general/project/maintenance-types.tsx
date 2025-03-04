import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import MaintenanceTypeMasterList from 'src/views/pages/master/general/project/maintenance-type-master/maintenance-type-master-list';

function MaintenanceTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <MaintenanceTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default MaintenanceTypes;
