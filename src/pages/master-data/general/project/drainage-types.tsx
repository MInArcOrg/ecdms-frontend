import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import DrainageTypeMasterList from 'src/views/pages/master/general/project/drainage-type-master/drainage-type-master-list';

function DrainageTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <DrainageTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default DrainageTypes;
