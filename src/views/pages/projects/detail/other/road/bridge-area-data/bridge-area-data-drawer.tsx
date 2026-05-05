import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeAreaDataForm from './bridge-area-data-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BridgeAreaData } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { limitNumberDigits, nullableNumberSchema } from 'src/utils/validator/number';

interface BridgeAreaDataDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  bridgeAreaData: BridgeAreaData;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BridgeAreaDataDrawer = (props: BridgeAreaDataDrawerType) => {
  const { open, toggle, refetch, bridgeAreaData, projectId, otherSubMenu } = props;

  const numberField = nullableNumberSchema();

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    project_id: yup.string().length(36).required('Project is required'),
    bridge_id: yup.string().uuid().required('Bridge Name is Required'),
    river_width: limitNumberDigits(numberField.min(0, 'River width must be greater than or equal to 0'), {
      maxIntegerDigits: 12,
      maxDecimalPlaces: 2
    }),
    highest_water_level: limitNumberDigits(numberField, { maxIntegerDigits: 6, maxDecimalPlaces: 2 }),
    lowest_water_level: limitNumberDigits(numberField, { maxIntegerDigits: 6, maxDecimalPlaces: 2 }),
    area_topography_id: yup.string().uuid().required('Area topography is required'),
    detour_possibility: yup.boolean().nullable(),
    road_alignment: yup.string().max(255).nullable(),
    altitude: limitNumberDigits(numberField, { maxIntegerDigits: 6, maxDecimalPlaces: 2 }),
    load_limit_sign: yup.boolean().nullable()
  });

  const isEdit = Boolean(bridgeAreaData?.id);

  const createBridgeAreaData = async (body: IApiPayload<BridgeAreaData>) =>
    projectOtherApiSecondService<BridgeAreaData>().create(otherSubMenu?.apiRoute || '', body);

  const editBridgeAreaData = async (body: IApiPayload<BridgeAreaData>) =>
    projectOtherApiSecondService<BridgeAreaData>().update(otherSubMenu?.apiRoute || '', bridgeAreaData?.id || '', body);

  const getPayload = (values: BridgeAreaData): IApiPayload<BridgeAreaData> => ({
    data: {
      parent_id: values.parent_id,
      project_id: projectId,
      bridge_id: values.bridge_id,
      river_width: values.river_width,
      highest_water_level: values.highest_water_level,
      lowest_water_level: values.lowest_water_level,
      area_topography_id: values.area_topography_id,
      detour_possibility: values.detour_possibility,
      road_alignment: values.road_alignment,
      altitude: values.altitude,
      load_limit_sign: values.load_limit_sign,
      id: bridgeAreaData?.id,
      created_at: values.created_at,
      updated_at: values.updated_at
    } as BridgeAreaData,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BridgeAreaData>, payload: IApiPayload<BridgeAreaData>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.bridge-area-data.${isEdit ? `edit-bridge-area-data` : `create-bridge-area-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-area-data.${isEdit ? `edit-bridge-area-data` : `create-bridge-area-data`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeAreaData,
            bridge_id: bridgeAreaData?.bridge_id || bridgeAreaData?.bridge?.id || '',
            area_topography_id: bridgeAreaData?.area_topography_id || bridgeAreaData?.areaTopography?.id || '',
            project_id: projectId
          }}
          createActionFunc={isEdit ? editBridgeAreaData : createBridgeAreaData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeAreaData>) => {
            return <BridgeAreaDataForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BridgeAreaDataDrawer;
