import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BroadcastingNetworkCoverageForm from './broadcasting-network-coverage-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { BroadcastingNetworkCoverage } from 'src/types/project/other';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface BroadcastingNetworkCoverageDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  broadcastingNetworkCoverage: BroadcastingNetworkCoverage;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const BroadcastingNetworkCoverageDrawer = (props: BroadcastingNetworkCoverageDrawerProps) => {
  const { open, toggle, refetch, broadcastingNetworkCoverage, projectId, otherSubMenu } = props;

  const validationSchema = yup.object().shape({
    broadcasting_infrastructure_id: yup.string().required('Broadcasting infrastructure is required'),
    network_infrastructure_type_id: yup.string().required('Network infrastructure type is required'),
    total_coverage_area: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    coverage_population_no: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    active_users_no: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    average_download_speed: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    average_upload_speed: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    signal_strength: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(broadcastingNetworkCoverage?.id);

  const createBroadcastingNetworkCoverage = async (body: IApiPayload<BroadcastingNetworkCoverage>) =>
    projectOtherApiSecondService<BroadcastingNetworkCoverage>().create(otherSubMenu?.apiRoute || '', body);

  const editBroadcastingNetworkCoverage = async (body: IApiPayload<BroadcastingNetworkCoverage>) =>
    projectOtherApiSecondService<BroadcastingNetworkCoverage>().update(
      otherSubMenu?.apiRoute || '',
      broadcastingNetworkCoverage?.id || '',
      body
    );

  const getPayload = (values: BroadcastingNetworkCoverage) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<BroadcastingNetworkCoverage>, payload: IApiPayload<BroadcastingNetworkCoverage>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.broadcasting-network-coverage.${isEdit ? `edit-broadcasting-network-coverage` : `create-broadcasting-network-coverage`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          key={broadcastingNetworkCoverage?.id || 'new'}
          edit={isEdit}
          title={`project.other.broadcasting-network-coverage.${isEdit ? `edit-broadcasting-network-coverage` : `create-broadcasting-network-coverage`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...broadcastingNetworkCoverage
          }}
          createActionFunc={isEdit ? editBroadcastingNetworkCoverage : createBroadcastingNetworkCoverage}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BroadcastingNetworkCoverage>) => {
            return <BroadcastingNetworkCoverageForm formik={formik} projectId={projectId} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BroadcastingNetworkCoverageDrawer;
