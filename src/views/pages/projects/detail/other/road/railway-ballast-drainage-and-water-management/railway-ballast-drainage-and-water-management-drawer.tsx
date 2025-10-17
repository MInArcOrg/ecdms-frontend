import type { FormikProps } from 'formik';
import * as yup from 'yup';

import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { RailwayBallastDrainageAndWaterManagement } from 'src/types/project/other'; // Updated type import
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import RailwayBallastDrainageAndWaterManagementForm from './railway-ballast-drainage-and-water-management-form'; // Updated component import

interface RailwayBallastDrainageAndWaterManagementDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayBallastDrainageAndWaterManagement: RailwayBallastDrainageAndWaterManagement; // Updated prop type
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayBallastDrainageAndWaterManagementDrawer = ({
  // Renamed component
  open,
  toggle,
  refetch,
  railwayBallastDrainageAndWaterManagement, // Updated prop name
  projectId,
  otherSubMenu
}: RailwayBallastDrainageAndWaterManagementDrawerProps) => {
  const isEdit = Boolean(railwayBallastDrainageAndWaterManagement?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    drainage_condition_assessment: yup.string().required('Drainage condition assessment is required'),
    drainage_infrastructure_type: yup.string().required('Drainage infrastructure type is required'),
    water_management_measures: yup.string().nullable().optional(),
    drainage_infrastructure_length: yup.number().nullable().typeError('Drainage infrastructure length must be a number').optional(),
    remark: yup.string().nullable().optional()
  });

  const createRailwayBallastDrainageAndWaterManagement = async (
    // Renamed function
    body: IApiPayload<RailwayBallastDrainageAndWaterManagement>
  ) =>
    projectOtherApiSecondService<RailwayBallastDrainageAndWaterManagement>().create(
      // Updated type
      otherSubMenu?.apiRoute || '',
      body
    );

  const editRailwayBallastDrainageAndWaterManagement = async (
    // Renamed function
    body: IApiPayload<RailwayBallastDrainageAndWaterManagement>
  ) =>
    projectOtherApiSecondService<RailwayBallastDrainageAndWaterManagement>().update(
      // Updated type
      otherSubMenu?.apiRoute || '',
      railwayBallastDrainageAndWaterManagement.id,
      body
    );

  const getPayload = (
    values: RailwayBallastDrainageAndWaterManagement // Updated type
  ): IApiPayload<RailwayBallastDrainageAndWaterManagement> => ({
    // Updated type
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayBallastDrainageAndWaterManagement>, // Updated type
    payload: IApiPayload<RailwayBallastDrainageAndWaterManagement> // Updated type
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-ballast-drainage-and-water-management.${isEdit ? 'edit' : 'create'}`} // Updated translation key
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-ballast-drainage-and-water-management.${isEdit ? 'edit' : 'create'}`} // Updated translation key
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayBallastDrainageAndWaterManagement // Updated prop name
          }}
          createActionFunc={
            isEdit ? editRailwayBallastDrainageAndWaterManagement : createRailwayBallastDrainageAndWaterManagement // Updated function names
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayBallastDrainageAndWaterManagement> // Updated type
          ) => (
            <RailwayBallastDrainageAndWaterManagementForm formik={formik} /> // Updated component name
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayBallastDrainageAndWaterManagementDrawer; // Renamed export
