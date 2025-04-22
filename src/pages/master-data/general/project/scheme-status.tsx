import { Fragment } from 'react';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import ProjectGeneralMasterList from 'src/views/pages/master/general/project/project-general-master/project-general-master-list';
import GeneralMasterLayout from '../general-master-layout';

function SchemeStatusMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ProjectGeneralMasterList projectMasterModel={projectMasterModels.schemeStatus} />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default SchemeStatusMasterData;
