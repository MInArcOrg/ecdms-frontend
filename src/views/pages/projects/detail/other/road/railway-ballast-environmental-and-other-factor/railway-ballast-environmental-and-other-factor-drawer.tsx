import type { FormikProps } from 'formik';
import * as yup from 'yup';

import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { RailwayBallastEnvironmentalAndOtherFactor } from 'src/types/project/other';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import RailwayBallastEnvironmentalAndOtherFactorForm from './railway-ballast-environmental-and-other-factor-form';

interface RailwayBallastEnvironmentalAndOtherFactorDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayBallastEnvironmentalAndOtherFactor: RailwayBallastEnvironmentalAndOtherFactor;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayBallastEnvironmentalAndOtherFactorDrawer = ({
  open,
  toggle,
  refetch,
  railwayBallastEnvironmentalAndOtherFactor,
  projectId,
  otherSubMenu
}: RailwayBallastEnvironmentalAndOtherFactorDrawerProps) => {
  const isEdit = Boolean(railwayBallastEnvironmentalAndOtherFactor?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    environmental_compliance_measures: yup.string().nullable().optional(),
    environmental_impact_assessment: yup.string().nullable().optional(),
    remark: yup.string().nullable().optional()
  });

  const createRailwayBallastEnvironmentalAndOtherFactor = async (
    body: IApiPayload<RailwayBallastEnvironmentalAndOtherFactor>
  ) =>
    projectOtherApiSecondService<RailwayBallastEnvironmentalAndOtherFactor>().create(
      otherSubMenu?.apiRoute || '',
      body
    );

  const editRailwayBallastEnvironmentalAndOtherFactor = async (
    body: IApiPayload<RailwayBallastEnvironmentalAndOtherFactor>
  ) =>
    projectOtherApiSecondService<RailwayBallastEnvironmentalAndOtherFactor>().update(
      otherSubMenu?.apiRoute || '',
      railwayBallastEnvironmentalAndOtherFactor.id,
      body
    );

  const getPayload = (
    values: RailwayBallastEnvironmentalAndOtherFactor
  ): IApiPayload<RailwayBallastEnvironmentalAndOtherFactor> => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayBallastEnvironmentalAndOtherFactor>,
    payload: IApiPayload<RailwayBallastEnvironmentalAndOtherFactor>
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-ballast-environmental-and-other-factor.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-ballast-environmental-and-other-factor.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayBallastEnvironmentalAndOtherFactor,
          }}
          createActionFunc={
            isEdit ? editRailwayBallastEnvironmentalAndOtherFactor : createRailwayBallastEnvironmentalAndOtherFactor
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwayBallastEnvironmentalAndOtherFactor>
          ) => (
            <RailwayBallastEnvironmentalAndOtherFactorForm formik={formik} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayBallastEnvironmentalAndOtherFactorDrawer;