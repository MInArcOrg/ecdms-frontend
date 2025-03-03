import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import BridgeStructureTypeMasterList from 'src/views/pages/master/general/project/bridge-structure-type-master/bridge-structure-type-master-list';

function BridgeStructureTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <BridgeStructureTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default BridgeStructureTypes;
