import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeSuperStructureForm from './bridge-super-structure-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BridgeSuperStructure } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';

interface BridgeSuperStructureDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeSuperStructure: BridgeSuperStructure;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeSuperStructureDrawer = (props: BridgeSuperStructureDrawerType) => {
  const { open, toggle, refetch, bridgeSuperStructure, projectId, otherSubMenu } = props;

  const numberField = nullableNumberSchema();
  const integerField = nullableIntegerSchema();

  const validationSchema = yup.object().shape({
    project_id: yup.string().length(36).required('Project is required'),
    bridge_id: yup.string().uuid().required('Bridge Name is Required'),
    bridge_structure_type_id: yup.string().uuid().required('Bridge structure type is required'),
    span_number: limitNumberDigits(integerField.min(0, 'Span number must be greater than or equal to 0'), { maxIntegerDigits: 9, maxDecimalPlaces: 0 }),
    span_composition: yup.string().max(255).nullable(),
    total_span_length: limitNumberDigits(numberField.min(0, 'Total span length must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    carriage_width: limitNumberDigits(numberField.min(0, 'Carriage width must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    side_walk_width: limitNumberDigits(numberField.min(0, 'Side walk width must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    lane_number: limitNumberDigits(integerField.min(0, 'Lane number must be greater than or equal to 0'), { maxIntegerDigits: 9, maxDecimalPlaces: 0 }),
    span_support_type_id: yup.string().uuid().required('Span support type is required'),
    deck_slab_type_id: yup.string().uuid().required('Deck slab type is required'),
    girder_number: limitNumberDigits(integerField.min(0, 'Girder number must be greater than or equal to 0'), { maxIntegerDigits: 9, maxDecimalPlaces: 0 }),
    girder_depth: limitNumberDigits(numberField.min(0, 'Girder depth must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    girder_spacing: limitNumberDigits(numberField.min(0, 'Girder spacing must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 }),
    girder_width: limitNumberDigits(numberField.min(0, 'Girder width must be greater than or equal to 0'), { maxIntegerDigits: 12, maxDecimalPlaces: 2 })
  });

  const isEdit = Boolean(bridgeSuperStructure?.id);

  const createBridgeSuperStructure = async (body: IApiPayload<BridgeSuperStructure>) =>
    projectOtherApiSecondService<BridgeSuperStructure>().create(otherSubMenu?.apiRoute || '', body);

  const editBridgeSuperStructure = async (body: IApiPayload<BridgeSuperStructure>) =>
    projectOtherApiSecondService<BridgeSuperStructure>().update(otherSubMenu?.apiRoute || '', bridgeSuperStructure?.id || '', body);

  const getPayload = (values: BridgeSuperStructure): IApiPayload<BridgeSuperStructure> => ({
    data: {
      project_id: projectId,
      bridge_id: values.bridge_id,
      bridge_structure_type_id: values.bridge_structure_type_id,
      span_number: values.span_number,
      span_composition: values.span_composition,
      total_span_length: values.total_span_length,
      carriage_width: values.carriage_width,
      side_walk_width: values.side_walk_width,
      lane_number: values.lane_number,
      span_support_type_id: values.span_support_type_id,
      deck_slab_type_id: values.deck_slab_type_id,
      girder_number: values.girder_number,
      girder_depth: values.girder_depth,
      girder_spacing: values.girder_spacing,
      girder_width: values.girder_width,
      id: bridgeSuperStructure?.id
    } as BridgeSuperStructure,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BridgeSuperStructure>, payload: IApiPayload<BridgeSuperStructure>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-super-structure.${isEdit ? `edit-bridge-super-structure` : `create-bridge-super-structure`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-super-structure.${isEdit ? `edit-bridge-super-structure` : `create-bridge-super-structure`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeSuperStructure,
            bridge_id: bridgeSuperStructure?.bridge_id || bridgeSuperStructure?.bridge?.id || '',
            bridge_structure_type_id:
              bridgeSuperStructure?.bridge_structure_type_id || bridgeSuperStructure?.bridgeStructureType?.id || '',
            span_support_type_id: bridgeSuperStructure?.span_support_type_id || bridgeSuperStructure?.spanSupportType?.id || '',
            deck_slab_type_id: bridgeSuperStructure?.deck_slab_type_id || bridgeSuperStructure?.deckSlabType?.id || '',
            project_id: projectId
          }}
          createActionFunc={isEdit ? editBridgeSuperStructure : createBridgeSuperStructure}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeSuperStructure>) => {
            return <BridgeSuperStructureForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeSuperStructureDrawer;
