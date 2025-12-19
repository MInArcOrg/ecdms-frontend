import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { stakeholderMasterModels } from 'src/constants/master-data/stakeholder-general-master-constants';
import GeneralMasterLayout from 'src/views/pages/master/general/general-master/general-master-layout';
import StakeholderGeneralMasterList from 'src/views/pages/master/general/stakeholder/stakeholder-general-master/stakeholder-general-master-list';

function GeneralStakeholderMasterData() {
  const router = useRouter();
  const { model } = router.query;
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <StakeholderGeneralMasterList
            stakeholderMasterModel={Object.values(stakeholderMasterModels).find((stakeholderModel) => stakeholderModel.dbModel === model) as any}
          />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default GeneralStakeholderMasterData;
