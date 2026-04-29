import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BroadcastingNetworkCapacityForm from './broadcasting-network-capacity-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BroadcastingNetworkCapacity } from 'src/types/project/other';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface BroadcastingNetworkCapacityDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  broadcastingNetworkCapacity: BroadcastingNetworkCapacity;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BroadcastingNetworkCapacityDrawer = (props: BroadcastingNetworkCapacityDrawerProps) => {
  const { open, toggle, refetch, broadcastingNetworkCapacity, projectId, otherSubMenu } = props;

  const validationSchema = yup.object().shape({
    broadcasting_infrastructure_id: yup.string().required('Broadcasting infrastructure is required'),
    network_type_id: yup.string().required('Network type is required'),
    total_bandwidth: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    users_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(broadcastingNetworkCapacity?.id);

  const createBroadcastingNetworkCapacity = async (body: IApiPayload<BroadcastingNetworkCapacity>) =>
    projectOtherApiSecondService<BroadcastingNetworkCapacity>().create(otherSubMenu?.apiRoute || '', body);

  const editBroadcastingNetworkCapacity = async (body: IApiPayload<BroadcastingNetworkCapacity>) =>
    projectOtherApiSecondService<BroadcastingNetworkCapacity>().update(
      otherSubMenu?.apiRoute || '',
      broadcastingNetworkCapacity?.id || '',
      body
    );

  const getPayload = (values: BroadcastingNetworkCapacity) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BroadcastingNetworkCapacity>, payload: IApiPayload<BroadcastingNetworkCapacity>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.broadcasting-network-capacity.${isEdit ? `edit-broadcasting-network-capacity` : `create-broadcasting-network-capacity`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          key={broadcastingNetworkCapacity?.id || 'new'}
          edit={isEdit}
          title={`project.other.broadcasting-network-capacity.${isEdit ? `edit-broadcasting-network-capacity` : `create-broadcasting-network-capacity`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...broadcastingNetworkCapacity
          }}
          createActionFunc={isEdit ? editBroadcastingNetworkCapacity : createBroadcastingNetworkCapacity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BroadcastingNetworkCapacity>) => {
            return <BroadcastingNetworkCapacityForm formik={formik} projectId={projectId} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BroadcastingNetworkCapacityDrawer;
