import type { FormikProps } from 'formik';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';

import type { IApiPayload, IApiResponse } from 'src/types/requests';
import type { RailwaySubBallastMaterial } from 'src/types/project/other'; // Updated import
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import RailwaySubBallastMaterialForm from './railway-sub-ballast-material-form'; // Updated import

interface RailwaySubBallastMaterialDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  railwaySubBallastMaterial: RailwaySubBallastMaterial; // Updated prop name and type
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySubBallastMaterialDrawer = ({
  // Updated component name
  open,
  toggle,
  refetch,
  railwaySubBallastMaterial, // Updated prop name
  projectId,
  otherSubMenu
}: RailwaySubBallastMaterialDrawerProps) => {
  const isEdit = Boolean(railwaySubBallastMaterial?.id); // Changed from project_id to id for edit check

  const validationSchema = yup.object().shape({
    railway_line_section_name: yup.string().required('Railway line section name is required'),
    sub_ballast_material_type_id: yup.string().required('Sub-ballast material type is required'), // New field, assuming it's required
    layer_thickness: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    layer_depth: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    density: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    moisture_content: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    method_used_for_compaction: yup.string().nullable().optional(),
    compaction_density: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    remark: yup.string().nullable().optional()
  });

  const createRailwaySubBallastMaterial = async (
    // Updated function name
    body: IApiPayload<RailwaySubBallastMaterial>
  ) =>
    projectOtherApiSecondService<RailwaySubBallastMaterial>().create(
      // Updated type
      otherSubMenu?.apiRoute || '',
      body
    );

  const editRailwaySubBallastMaterial = async (
    // Updated function name
    body: IApiPayload<RailwaySubBallastMaterial>
  ) =>
    projectOtherApiSecondService<RailwaySubBallastMaterial>().update(
      // Updated type
      otherSubMenu?.apiRoute || '',
      railwaySubBallastMaterial.id, // Updated ID for update
      body
    );

  const getPayload = (
    values: RailwaySubBallastMaterial // Updated type
  ): IApiPayload<RailwaySubBallastMaterial> => ({
    // Updated type
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwaySubBallastMaterial>, // Updated type
    payload: IApiPayload<RailwaySubBallastMaterial> // Updated type
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-sub-ballast-material.${isEdit ? 'edit' : 'create'}`} // Updated translation key
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-sub-ballast-material.${isEdit ? 'edit' : 'create'}`} // Updated translation key
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...railwaySubBallastMaterial // Updated prop name
          }}
          createActionFunc={
            isEdit ? editRailwaySubBallastMaterial : createRailwaySubBallastMaterial // Updated function names
          }
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(
            formik: FormikProps<RailwaySubBallastMaterial> // Updated type
          ) => <RailwaySubBallastMaterialForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwaySubBallastMaterialDrawer; // Updated export name
