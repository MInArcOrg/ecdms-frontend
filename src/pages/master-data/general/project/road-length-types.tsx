import { Fragment } from 'react';
import RoadLengthTypeMasterList from 'src/views/pages/master/general/project/road-length-type/road-length-type-master-list';
import GeneralLayout from '../GeneralLayout';

function RoadLengthTypes() {
    return (
        <div>
            <GeneralLayout>
                <Fragment>
                    <RoadLengthTypeMasterList />
                </Fragment>
            </GeneralLayout>
        </div>
    );
}

export default RoadLengthTypes;
