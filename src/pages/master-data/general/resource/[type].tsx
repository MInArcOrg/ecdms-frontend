import { Fragment } from 'react';
import GeneralMasterResourceList from 'src/views/pages/master/general/general-resource-master/general-master-resource-list';
import GeneralLayout from '../GeneralLayout';

function GeneralStakeholderMasterData() {
  return (
    <div>
      <GeneralLayout>
        <Fragment>
          <GeneralMasterResourceList />
        </Fragment>
      </GeneralLayout>
    </div>
  );
}

export default GeneralStakeholderMasterData;
