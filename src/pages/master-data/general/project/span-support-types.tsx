import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import SpanSupportTypeMasterList from 'src/views/pages/master/general/project/span-support-type-master/span-support-type-master-list';

function RoadLengthTypes() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <SpanSupportTypeMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default RoadLengthTypes;
