import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import ProjectGeneralMasterList from 'src/views/pages/master/general/project/project-general-master/project-general-master-list';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';

function IncidentTimesMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ProjectGeneralMasterList projectMasterModel={projectMasterModels.incidentTime} />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default IncidentTimesMasterData;