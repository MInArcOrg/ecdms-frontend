import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import ProjectGeneralMasterList from 'src/views/pages/master/general/project/project-general-master/project-general-master-list';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';

function IncidentTypesMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ProjectGeneralMasterList projectMasterModel={projectMasterModels.incidentType} />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default IncidentTypesMasterData;
