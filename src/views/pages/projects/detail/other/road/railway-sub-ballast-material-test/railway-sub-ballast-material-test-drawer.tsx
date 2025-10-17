import type { FormikProps } from 'formik';
import * as yup from 'yup';

import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { RailwaySubBallastMaterialTest } from 'src/types/project/other';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import RailwaySubBallastMaterialTestForm from './railway-sub-ballast-material-test-form';

interface RailwaySubBallastMaterialTestDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySubBallastMaterialTest: RailwaySubBallastMaterialTest;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySubBallastMaterialTestDrawer = ({
  open,
  toggle,
  refetch,
  railwaySubBallastMaterialTest,
  projectId,
  otherSubMenu
}: RailwaySubBallastMaterialTestDrawerProps) => {
  const isEdit = Boolean(railwaySubBallastMaterialTest?.id);

  const validationSchema = yup.object().shape({
    project_id: yup.string().required('Project ID is required'),
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    sub_ballast_material_type_id: yup.string().required('Sub-ballast material type is required'),
    testing_method_used: yup.string().nullable().optional(),
    sampling_method: yup.string().nullable().optional(),
    sample_size: yup.number().nullable().optional(),
    material_source: yup.string().nullable().optional(),
    sieve_analysis_results: yup.string().nullable().optional(),
    supplier: yup.string().nullable().optional(),
    remark: yup.string().nullable().optional()
  });

  const createRailwaySubBallastMaterialTest = async (body: IApiPayload<RailwaySubBallastMaterialTest>) =>
    projectOtherApiSecondService<RailwaySubBallastMaterialTest>().create(otherSubMenu?.apiRoute || '', body);

  const editRailwaySubBallastMaterialTest = async (body: IApiPayload<RailwaySubBallastMaterialTest>) =>
    projectOtherApiSecondService<RailwaySubBallastMaterialTest>().update(
      otherSubMenu?.apiRoute || '',
      railwaySubBallastMaterialTest.id,
      body
    );

  const getPayload = (values: RailwaySubBallastMaterialTest): IApiPayload<RailwaySubBallastMaterialTest> => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySubBallastMaterialTest>,
    payload: IApiPayload<RailwaySubBallastMaterialTest>
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sub-ballast-material-test.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sub-ballast-material-test.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySubBallastMaterialTest,
            project_id: railwaySubBallastMaterialTest?.project_id || projectId
          }}
          createActionFunc={isEdit ? editRailwaySubBallastMaterialTest : createRailwaySubBallastMaterialTest}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwaySubBallastMaterialTest>) => <RailwaySubBallastMaterialTestForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySubBallastMaterialTestDrawer;
