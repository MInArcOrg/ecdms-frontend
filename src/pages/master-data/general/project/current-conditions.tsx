import { Fragment } from 'react';
import CurrentCondtionMasterList from 'src/views/pages/master/general/project/current-condition-master/current-condition-master-list';
import GeneralMasterLayout from '../general-master-layout';

function CurrentCondtions() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <CurrentCondtionMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default CurrentCondtions;
