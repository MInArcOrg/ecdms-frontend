import { useRouter } from "next/router";
import { Fragment } from "react";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import GeneralMasterLayout from "src/views/pages/master/general/general-master/general-master-layout";
import ProjectGeneralMasterList from "src/views/pages/master/general/project/project-general-master/project-general-master-list";

function GeneralResourceMasterData() {
const router = useRouter();
    const { model } = router.query;
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ProjectGeneralMasterList
            projectMasterModel={Object.values(projectMasterModels).find((projectModel) => projectModel.dbModel === model) as any}
          />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralResourceMasterData;
