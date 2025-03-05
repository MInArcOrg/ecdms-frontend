import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import CountTypeMasterList from 'src/views/pages/master/general/project/count-type-master/count-type-master-list';

function CountTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <CountTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default CountTypes;
