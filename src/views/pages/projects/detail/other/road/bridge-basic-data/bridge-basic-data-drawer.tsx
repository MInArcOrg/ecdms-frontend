import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeBasicDataForm from './bridge-basic-data-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BridgeBasicData } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { limitNumberDigits, nullableIntegerSchema, nullableNumberSchema } from 'src/utils/validator/number';

interface BridgeBasicDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeBasicData: BridgeBasicData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeBasicDataDrawer = (props: BridgeBasicDataDrawerType) => {
  const { open, toggle, refetch, bridgeBasicData, projectId, otherSubMenu } = props;

  const currentYear = new Date().getFullYear();
  const numberField = nullableNumberSchema();
  const integerField = nullableIntegerSchema();

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    project_id: yup.string().length(36).required('Project is required'),
    road_segment_id: yup.string().length(36).required('Road segment is required'),
    name: yup.string().max(255).required('Name is required'),
    bridge_number: yup.string().max(255).nullable(),
    bridge_length: limitNumberDigits(numberField.min(0, 'Bridge length must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    bridge_width: limitNumberDigits(numberField.min(0, 'Bridge width must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    construction_year: limitNumberDigits(
      integerField.min(1900, 'Construction year must be greater than or equal to 1900').max(
        currentYear,
        `Construction year must be less than or equal to ${currentYear}`
      ),
      { maxIntegerDigits: 4, maxDecimalPlaces: 0 }
    ),
    contractor: yup.string().max(255).nullable(),
    designer: yup.string().max(255).nullable(),
    bridge_cost: limitNumberDigits(numberField.min(0, 'Bridge cost must be greater than or equal to 0'), {
      maxIntegerDigits: 15,
      maxDecimalPlaces: 2
    }),
    land_capacity: limitNumberDigits(numberField.min(0, 'Land capacity must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    average_daily_traffic: limitNumberDigits(integerField.min(0, 'Average daily traffic must be greater than or equal to 0'), {
      maxIntegerDigits: 9,
      maxDecimalPlaces: 0
    })
  });

  const isEdit = Boolean(bridgeBasicData?.id);

  const createBridgeBasicData = async (body: IApiPayload<BridgeBasicData>) =>
    projectOtherApiSecondService<BridgeBasicData>().create(otherSubMenu?.apiRoute || '', body);

  const editBridgeBasicData = async (body: IApiPayload<BridgeBasicData>) =>
    projectOtherApiSecondService<BridgeBasicData>().update(otherSubMenu?.apiRoute || '', bridgeBasicData?.id || '', body);

  const getPayload = (values: BridgeBasicData): IApiPayload<BridgeBasicData> => ({
    data: {
      ...values,
      project_id: projectId,
      road_segment_id: values.road_segment_id,
      name: values.name,
      bridge_number: values.bridge_number,
      bridge_length: values.bridge_length,
      bridge_width: values.bridge_width,
      construction_year: values.construction_year,
      contractor: values.contractor,
      designer: values.designer,
      bridge_cost: values.bridge_cost,
      land_capacity: values.land_capacity,
      average_daily_traffic: values.average_daily_traffic,
      id: bridgeBasicData?.id,
      created_at: values.created_at,
      updated_at: values.updated_at
    } as BridgeBasicData,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BridgeBasicData>, payload: IApiPayload<BridgeBasicData>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-basic-data.${isEdit ? `edit-bridge-basic-data` : `create-bridge-basic-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-basic-data.${isEdit ? `edit-bridge-basic-data` : `create-bridge-basic-data`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeBasicData,
            road_segment_id: bridgeBasicData?.road_segment_id || bridgeBasicData?.roadSegment?.id,
            project_id: projectId
          }}
          createActionFunc={isEdit ? editBridgeBasicData : createBridgeBasicData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeBasicData>) => {
            return <BridgeBasicDataForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeBasicDataDrawer;
