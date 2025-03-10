import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import AreaTopographyMasterList from 'src/views/pages/master/general/project/area-topography-master/area-topography-master-list';
import ProjectGeneralMasterList from 'src/views/pages/master/general/project/project-general-master/project-general-master-list';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';

function GeneralProjectMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ProjectGeneralMasterList projectMasterModel={projectMasterModels.abutmentType} />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralProjectMasterData;
