import type { FormikProps } from 'formik';
import * as yup from 'yup';

import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { RailwaySubBallastConditionAssessment } from 'src/types/project/other';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import RailwaySubBallastConditionAssessmentForm from './railway-sub-ballast-condition-assessment-form';

interface RailwaySubBallastConditionAssessmentDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySubBallastConditionAssessment: RailwaySubBallastConditionAssessment;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySubBallastConditionAssessmentDrawer = ({
  open,
  toggle,
  refetch,
  railwaySubBallastConditionAssessment,
  projectId,
  otherSubMenu
}: RailwaySubBallastConditionAssessmentDrawerProps) => {
  const isEdit = Boolean(railwaySubBallastConditionAssessment?.id);

  const validationSchema = yup.object().shape({
    project_id: yup.string().required('Project ID is required'),
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    sub_ballast_material_type_id: yup.string().required('Sub-ballast material type is required'),
    inspection_dates: yup.string().nullable().optional(),
    sub_ballast_condition_rating: yup.string().nullable().optional(),
    cracking_observations: yup.string().nullable().optional(),
    erosion_issues: yup.string().nullable().optional(),
    unwanted_vegetation_presence: yup.string().nullable().optional(),
    testing_frequency_per_year: yup.number().nullable().optional(),
    sub_ballast_resistance: yup.string().nullable().optional(),
    sub_ballast_degradation_rate: yup.string().nullable().optional(),
    drainage_performance: yup.string().nullable().optional(),
    remark: yup.string().nullable().optional()
  });

  const createRailwaySubBallastConditionAssessment = async (
    body: IApiPayload<RailwaySubBallastConditionAssessment>
  ) =>
    projectOtherApiSecondService<RailwaySubBallastConditionAssessment>().create(
      otherSubMenu?.apiRoute || '',
      body
    );

  const editRailwaySubBallastConditionAssessment = async (
    body: IApiPayload<RailwaySubBallastConditionAssessment>
  ) =>
    projectOtherApiSecondService<RailwaySubBallastConditionAssessment>().update(
      otherSubMenu?.apiRoute || '',
      railwaySubBallastConditionAssessment.id,
      body
    );

  const getPayload = (
    values: RailwaySubBallastConditionAssessment
  ): IApiPayload<RailwaySubBallastConditionAssessment> => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySubBallastConditionAssessment>,
    payload: IApiPayload<RailwaySubBallastConditionAssessment>
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sub-ballast-condition-assessment.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sub-ballast-condition-assessment.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySubBallastConditionAssessment,
            project_id: railwaySubBallastConditionAssessment?.project_id || projectId
          }}
          createActionFunc={
            isEdit ? editRailwaySubBallastConditionAssessment : createRailwaySubBallastConditionAssessment
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwaySubBallastConditionAssessment>
          ) => (
            <RailwaySubBallastConditionAssessmentForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySubBallastConditionAssessmentDrawer;