import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeSubStructureForm from './bridge-sub-structure-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BridgeSubStructure } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';

interface BridgeSubStructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeSubStructure: BridgeSubStructure;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeSubStructureDrawer = (props: BridgeSubStructureDrawerType) => {
  const { open, toggle, refetch, bridgeSubStructure, projectId, otherSubMenu } = props;

  const numberField = nullableNumberSchema();
  const integerField = nullableIntegerSchema();

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(), // optional reference
    project_id: yup.string().length(36).required('Project is required'),
    bridge_id: yup.string().uuid().required('Bridge Name is Required'),
    abutment_a1_height: limitNumberDigits(numberField.min(0, 'Abutment A1 height must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    abutment_a1_width: limitNumberDigits(numberField.min(0, 'Abutment A1 width must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    abutment_a2_height: limitNumberDigits(numberField.min(0, 'Abutment A2 height must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    abutment_a2_width: limitNumberDigits(numberField.min(0, 'Abutment A2 width must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    wing_wall_length: limitNumberDigits(numberField.min(0, 'Wing wall length must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    pier_type_id: yup.string().uuid().required('Pier type is required'),
    piers_number: limitNumberDigits(integerField.min(0, 'Piers number must be greater than or equal to 0'), { maxIntegerDigits: 9, maxDecimalPlaces: 0 }),
    piers_dimension: yup.string().max(255).nullable(),
    pier1_height: limitNumberDigits(numberField.min(0, 'Pier 1 height must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    pier1_width: limitNumberDigits(numberField.min(0, 'Pier 1 width must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    pier2_height: limitNumberDigits(numberField.min(0, 'Pier 2 height must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    pier2_width: limitNumberDigits(numberField.min(0, 'Pier 2 width must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 })
  });

  const isEdit = Boolean(bridgeSubStructure?.id);

  const createBridgeSubStructure = async (body: IApiPayload<BridgeSubStructure>) =>
    projectOtherApiSecondService<BridgeSubStructure>().create(otherSubMenu?.apiRoute || '', body);

  const editBridgeSubStructure = async (body: IApiPayload<BridgeSubStructure>) =>
    projectOtherApiSecondService<BridgeSubStructure>().update(otherSubMenu?.apiRoute || '', bridgeSubStructure?.id || '', body);

  const getPayload = (values: BridgeSubStructure): IApiPayload<BridgeSubStructure> => ({
    data: {
      parent_id: values.parent_id,
      project_id: projectId,
      bridge_id: values.bridge_id,
      abutment_a1_height: values.abutment_a1_height,
      abutment_a1_width: values.abutment_a1_width,
      abutment_a2_height: values.abutment_a2_height,
      abutment_a2_width: values.abutment_a2_width,
      wing_wall_length: values.wing_wall_length,
      pier_type_id: values.pier_type_id,
      piers_number: values.piers_number,
      piers_dimension: values.piers_dimension,
      pier1_height: values.pier1_height,
      pier1_width: values.pier1_width,
      pier2_height: values.pier2_height,
      pier2_width: values.pier2_width,
      created_at: values.created_at,
      updated_at: values.updated_at,
      id: bridgeSubStructure?.id
    } as BridgeSubStructure,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BridgeSubStructure>, payload: IApiPayload<BridgeSubStructure>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-sub-structure.${isEdit ? `edit-bridge-sub-structure` : `create-bridge-sub-structure`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-sub-structure.${isEdit ? `edit-bridge-sub-structure` : `create-bridge-sub-structure`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeSubStructure,
            bridge_id: bridgeSubStructure?.bridge_id || bridgeSubStructure?.bridge?.id || '',
            pier_type_id: bridgeSubStructure?.pier_type_id || bridgeSubStructure?.pierType?.id || '',
            project_id: projectId
          }}
          createActionFunc={isEdit ? editBridgeSubStructure : createBridgeSubStructure}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeSubStructure>) => {
            return <BridgeSubStructureForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeSubStructureDrawer;
