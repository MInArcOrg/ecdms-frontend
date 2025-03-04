import { Fragment } from 'react';
import SoilTypeMasterList from 'src/views/pages/master/general/project/soil-type-master/soil-type-master-list';
import GeneralMasterLayout from '../GeneralMasterLayout';

function SoilTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <SoilTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default SoilTypes;
