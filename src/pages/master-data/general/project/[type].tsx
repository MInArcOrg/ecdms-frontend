import { Fragment } from 'react';
import GeneralMasterType from 'src/views/pages/master/general/general-master/general-master-list';
import GeneralLayout from '../GeneralLayout';

function GeneralProjectMasterData() {
  return (
    <div>
      <GeneralLayout>
        <Fragment>
          <GeneralMasterType />
        </Fragment>
      </GeneralLayout>
    </div>
  );
}

export default GeneralProjectMasterData;
