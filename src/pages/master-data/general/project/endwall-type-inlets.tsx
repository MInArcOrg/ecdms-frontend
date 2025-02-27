import { Fragment } from 'react';
import GeneralLayout from '../GeneralLayout';
import EndwallTypeInletMasterList from 'src/views/pages/master/general/project/endwall-type-inlet-master/endwall-type-inlet-master-list';

function EndWallTypes() {
    return (
        <div>
            <GeneralLayout>
                <Fragment>
                    <EndwallTypeInletMasterList />
                </Fragment>
            </GeneralLayout>
        </div>
    );
}

export default EndWallTypes;
