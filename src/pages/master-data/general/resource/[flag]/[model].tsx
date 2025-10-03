import { useRouter } from "next/router";
import { Fragment } from "react";
import { resourceMasterModels } from "src/constants/master-data/resource-general-master-constants";
import GeneralMasterLayout from "src/views/pages/master/general/general-master/general-master-layout";
import ResourceGeneralMasterList from "src/views/pages/master/general/resource/resource-general-master/resource-general-master-list";

function GeneralResourceMasterData() {
const router = useRouter();
    const { flag, model } = router.query;
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ResourceGeneralMasterList
            resourceMasterModel={Object.values(resourceMasterModels).find((resourceModel) => resourceModel.dbModel === model) as any}
          />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralResourceMasterData;
