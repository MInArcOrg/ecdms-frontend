import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import ProjectGeneralMasterList from 'src/views/pages/master/general/project/project-general-master/project-general-master-list';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';

function RecommendedActionUrgenciesMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ProjectGeneralMasterList projectMasterModel={projectMasterModels.recommendedActionUrgency}/>
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default RecommendedActionUrgenciesMasterData;
