import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import DamageConditionMasterList from 'src/views/pages/master/general/project/damage-condition-master/damage-condition-master-list';

function DamageConditions() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <DamageConditionMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default DamageConditions;
