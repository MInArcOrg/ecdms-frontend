import { Fragment } from "react";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import ProjectGeneralMasterList from "src/views/pages/master/general/project/project-general-master/project-general-master-list";
import GeneralMasterLayout from "../general-master-layout";

function WeatherConditionDuringIncidentMasterData() {
  return (
    <div>
      <GeneralMasterLayout>
        <Fragment>
          <ProjectGeneralMasterList
            projectMasterModel={
              projectMasterModels.weatherConditionDuringIncident
            }
          />
        </Fragment>
      </GeneralMasterLayout>
    </div>
  );
}

export default WeatherConditionDuringIncidentMasterData;
