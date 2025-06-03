import type { FormikProps } from 'formik';
import * as yup from 'yup';

import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { RailwayBallastMaterialSpecification } from 'src/types/project/other';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import RailwayBallastMaterialSpecificationForm from './railway-ballastm-material-specification-form';

interface RailwayBallastMaterialSpecificationDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwayBallastMaterialSpecification: RailwayBallastMaterialSpecification;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayBallastMaterialSpecificationDrawer = ({
  open,
  toggle,
  refetch,
  railwayBallastMaterialSpecification,
  projectId,
  otherSubMenu
}: RailwayBallastMaterialSpecificationDrawerProps) => {
  const isEdit = Boolean(railwayBallastMaterialSpecification?.project_id);

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup
      .string()
      .required('project.other.railway-ballast-material-specification.validation.railway_line_section_name'),
    ballast_material_type_id: yup
      .string()
      .required('project.other.railway-ballast-material-specification.validation.ballast_material_type_id'),
    specific_gravity: yup.number().nullable().typeError('project.other.railway-ballast-material-specification.validation.specific_gravity'),
    porosity: yup.number().nullable().typeError('project.other.railway-ballast-material-specification.validation.porosity'),
    water_absorption: yup.number().nullable().typeError('project.other.railway-ballast-material-specification.validation.water_absorption'),
    shape: yup.string().nullable(),
    average_particle_length: yup
      .number()
      .nullable()
      .typeError('project.other.railway-ballast-material-specification.validation.average_particle_length'),
    remark: yup.string().nullable()
  });

  const createRailwayBallastMaterialSpecification = async (body: IApiPayload<RailwayBallastMaterialSpecification>) =>
    projectOtherApiSecondService<RailwayBallastMaterialSpecification>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwayBallastMaterialSpecification = async (body: IApiPayload<RailwayBallastMaterialSpecification>) =>
    projectOtherApiSecondService<RailwayBallastMaterialSpecification>().update(
      otherSubMenu?.apiRoute || '',
      railwayBallastMaterialSpecification.project_id,
      body
    );

  const getPayload = (values: RailwayBallastMaterialSpecification): IApiPayload<RailwayBallastMaterialSpecification> => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayBallastMaterialSpecification>,
    payload: IApiPayload<RailwayBallastMaterialSpecification>
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-ballast-material-specification.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-ballast-material-specification.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwayBallastMaterialSpecification
          }}
          createActionFunc={isEdit ? editRailwayBallastMaterialSpecification : createRailwayBallastMaterialSpecification}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayBallastMaterialSpecification>) => <RailwayBallastMaterialSpecificationForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayBallastMaterialSpecificationDrawer;
