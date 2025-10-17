import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BridgeBasicDataForm from './bridge-basic-data-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BridgeBasicData } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

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

  const validationSchema = yup.object().shape({
    parent_id: yup.string().uuid().nullable(),
    name: yup.string().max(255).required('Name is required'),
    bridge_name: yup.string().max(255).required('Bridge name is required'),
    bridge_number: yup.string().max(255).nullable(),
    bridge_length: yup.number().nullable(),
    bridge_width: yup.number().nullable(),
    construction_year: yup.number().integer().nullable(),
    contractor: yup.string().max(255).nullable(),
    designer: yup.string().max(255).nullable(),
    bridge_cost: yup.number().nullable(),
    land_capacity: yup.number().nullable(),
    average_daily_traffic: yup.number().integer().nullable()
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
      id: bridgeBasicData?.id
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
            ...bridgeBasicData
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
