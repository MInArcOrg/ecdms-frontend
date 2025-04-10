import { Fragment } from 'react';
import { resourceMasterModels } from 'src/constants/master-data/resource-general-master-constants';
import ResourceGeneralMasterList from 'src/views/pages/master/general/resource/resource-general-master/resource-general-master-list';
import GeneralMasterLayout from '../general-master-layout';

function GeneralResourceMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ResourceGeneralMasterList resourceMasterModel={resourceMasterModels.quantityMeasurementUnit} />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralResourceMasterData;
