import { Fragment } from 'react';
import GeneralMasterLayout from '../general-master-layout';
import AssessmentConditionMasterList from 'src/views/pages/master/general/project/assessment-condition-master/assessment-condition-master-list';

function AssessmentConditions() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <AssessmentConditionMasterList />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default AssessmentConditions;
