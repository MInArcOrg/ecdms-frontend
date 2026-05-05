import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeFoundationForm from './bridge-foundation-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BridgeFoundation } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';

interface BridgeFoundationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeFoundation: BridgeFoundation;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeFoundationDrawer = (props: BridgeFoundationDrawerType) => {
  const { open, toggle, refetch, bridgeFoundation, projectId, otherSubMenu } = props;

  const numberField = nullableNumberSchema();
  const integerField = nullableIntegerSchema();

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    bridge_id: yup.string().uuid().required('Bridge Name is Required'),

    abutment_type_id: yup.string().uuid().required('Abutment type is required'),
    pier_type_id: yup.string().uuid().required('Pier type is required'),
    abutment_foundation_size: limitNumberDigits(numberField.min(0, 'Abutment foundation size must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    pier_foundation_size: limitNumberDigits(numberField.min(0, 'Pier foundation size must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    abutment_pile_number: limitNumberDigits(integerField.min(0, 'Abutment pile number must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    pier_pile_number: limitNumberDigits(integerField.min(0, 'Pier pile number must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    }),
    abutment_pile_depth: limitNumberDigits(numberField.min(0, 'Abutment pile depth must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    pier_pile_depth: limitNumberDigits(numberField.min(0, 'Pier pile depth must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    soil_type_id: yup.string().uuid().required('Soil type is required')
  });

  const isEdit = Boolean(bridgeFoundation?.id);

  const createBridgeFoundation = async (body: IApiPayload<BridgeFoundation>) =>
    projectOtherApiSecondService<BridgeFoundation>().create(otherSubMenu?.apiRoute || '', body);

  const editBridgeFoundation = async (body: IApiPayload<BridgeFoundation>) =>
    projectOtherApiSecondService<BridgeFoundation>().update(otherSubMenu?.apiRoute || '', bridgeFoundation?.id || '', body);

  const getPayload = (values: BridgeFoundation): IApiPayload<BridgeFoundation> => ({
    data: {
      parent_id: values.parent_id,
      project_id: projectId,
      bridge_id: values.bridge_id,
      abutment_type_id: values.abutment_type_id,
      pier_type_id: values.pier_type_id,
      abutment_foundation_size: values.abutment_foundation_size,
      pier_foundation_size: values.pier_foundation_size,
      abutment_pile_number: values.abutment_pile_number,
      pier_pile_number: values.pier_pile_number,
      abutment_pile_depth: values.abutment_pile_depth,
      pier_pile_depth: values.pier_pile_depth,
      soil_type_id: values.soil_type_id,
      created_at: values.created_at,
      updated_at: values.updated_at,
      id: bridgeFoundation?.id
    } as BridgeFoundation,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BridgeFoundation>, payload: IApiPayload<BridgeFoundation>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-foundation.${isEdit ? `edit-bridge-foundation` : `create-bridge-foundation`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-foundation.${isEdit ? `edit-bridge-foundation` : `create-bridge-foundation`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeFoundation,
            bridge_id: bridgeFoundation?.bridge_id || bridgeFoundation?.bridgeBasicData?.id || '',
            abutment_type_id: bridgeFoundation?.abutment_type_id || bridgeFoundation?.abutmentType?.id || '',
            pier_type_id: bridgeFoundation?.pier_type_id || bridgeFoundation?.pierType?.id || '',
            soil_type_id: bridgeFoundation?.soil_type_id || bridgeFoundation?.soilType?.id || '',
            project_id: projectId
          }}
          createActionFunc={isEdit ? editBridgeFoundation : createBridgeFoundation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeFoundation>) => {
            return <BridgeFoundationForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeFoundationDrawer;
