import { Fragment } from 'react';
import GeneralMasterType from 'src/views/pages/master/general/general-master/general-master-list';
import GeneralMasterLayout from '../GeneralMasterLayout';

function GeneralStakeholderMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <GeneralMasterType />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralStakeholderMasterData;
