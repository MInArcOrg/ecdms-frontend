import type { FormikProps } from 'formik';
import * as yup from 'yup';

import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { RailwaySubBallastDrainageAndWaterManagement } from 'src/types/project/other'; // Updated type import
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
// Updated form component import
import RailwaySubBallastDrainageAndWaterManagementForm from './railway-sub-ballast-drainage-and-water-management-form';
// Removed date utility imports if not needed for the new model's payload conversion
// import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface RailwaySubBallastDrainageAndWaterManagementDrawerProps { // Renamed interface
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySubBallastDrainageAndWaterManagement: RailwaySubBallastDrainageAndWaterManagement; // Updated prop name and type
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySubBallastDrainageAndWaterManagementDrawer = ({ // Renamed component
  open,
  toggle,
  refetch,
  railwaySubBallastDrainageAndWaterManagement, // Updated prop name
  projectId,
  otherSubMenu
}: RailwaySubBallastDrainageAndWaterManagementDrawerProps) => { // Using renamed interface
  const isEdit = Boolean(railwaySubBallastDrainageAndWaterManagement?.id); // Changed to 'id' for edit check

  // Updated validation schema based on RailwaySubBallastDrainageAndWaterManagement model
  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    drainage_condition_assessment: yup.string().nullable().optional(),
    drainage_infrastructure_type: yup.string().nullable().optional(),
    water_management_measures: yup.string().nullable().optional(),
    drainage_infrastructure_length: yup.number().nullable().typeError('Drainage infrastructure length must be a number').optional(),
    remark: yup.string().nullable().optional()
  });

  const createRailwaySubBallastDrainageAndWaterManagement = async (body: IApiPayload<RailwaySubBallastDrainageAndWaterManagement>) => // Renamed function and updated type
    projectOtherApiSecondService<RailwaySubBallastDrainageAndWaterManagement>().create(otherSubMenu?.apiRoute || '', body); // Updated generic type

  const editRailwaySubBallastDrainageAndWaterManagement = async (body: IApiPayload<RailwaySubBallastDrainageAndWaterManagement>) => // Renamed function and updated type
    projectOtherApiSecondService<RailwaySubBallastDrainageAndWaterManagement>().update( // Updated generic type
      otherSubMenu?.apiRoute || '',
      railwaySubBallastDrainageAndWaterManagement.id as string, // Using updated prop name, ensuring id is string
      body
    );

  const getPayload = (values: RailwaySubBallastDrainageAndWaterManagement): IApiPayload<RailwaySubBallastDrainageAndWaterManagement> => ({ // Updated type
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySubBallastDrainageAndWaterManagement>, // Updated type
    payload: IApiPayload<RailwaySubBallastDrainageAndWaterManagement> // Updated type
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      // Updated translation key
      title={`project.other.railway-sub-ballast-drainage-and-water-management.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          // Updated translation key
          title={`project.other.railway-sub-ballast-drainage-and-water-management.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySubBallastDrainageAndWaterManagement, // Using updated prop name
            project_id: railwaySubBallastDrainageAndWaterManagement?.project_id || projectId // Ensure project_id is set
          }}
          createActionFunc={isEdit ? editRailwaySubBallastDrainageAndWaterManagement : createRailwaySubBallastDrainageAndWaterManagement} // Using renamed functions
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySubBallastDrainageAndWaterManagement>) => ( // Updated type
            <RailwaySubBallastDrainageAndWaterManagementForm formik={formik} /> // Updated form component
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySubBallastDrainageAndWaterManagementDrawer; // Renamed export