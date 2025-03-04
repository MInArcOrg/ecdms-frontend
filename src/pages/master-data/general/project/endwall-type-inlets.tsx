import { Fragment } from 'react';
import GeneralMasterLayout from '../GeneralMasterLayout';
import EndwallTypeInletMasterList from 'src/views/pages/master/general/project/endwall-type-inlet-master/endwall-type-inlet-master-list';

function EndWallTypes() {
    return (
        <div>
            <GeneralMasterLayout>
                <Fragment>
                    <EndwallTypeInletMasterList />
                </Fragment>
            </GeneralMasterLayout>
        </div>
    );
}

export default EndWallTypes;
