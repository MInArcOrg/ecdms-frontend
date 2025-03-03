import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import HydrologyDefectMasterList from 'src/views/pages/master/general/project/hydrology-defect-master/hydrology-defect-master-list';

function HydrologyDefects() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <HydrologyDefectMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default HydrologyDefects;
