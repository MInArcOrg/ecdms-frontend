import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import SeverityLevelMasterList from 'src/views/pages/master/general/project/drainage-type-master/drainage-type-master-list';

function SeverityLevels() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <SeverityLevelMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default SeverityLevels;
