import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TrafficParameterForm from './traffic-parameter-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { TrafficParameter } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface TrafficParameterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  trafficParameter: TrafficParameter;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const TrafficParameterDrawer = (props: TrafficParameterDrawerType) => {
  const { open, toggle, refetch, trafficParameter, projectId, otherSubMenu } = props;

  const validationSchema = yup.object().shape({
    road_segment_id: yup.string().required('Road Segment is required'),
    pedestrian_facility_id: yup.string().required('Pedestrian Facility is required')
  });

  const isEdit = Boolean(trafficParameter?.id);

  const createTrafficParameter = async (body: IApiPayload<TrafficParameter>) =>
    projectOtherApiSecondService<TrafficParameter>().create(otherSubMenu?.apiRoute || '', body);

  const editTrafficParameter = async (body: IApiPayload<TrafficParameter>) =>
    projectOtherApiSecondService<TrafficParameter>().update(otherSubMenu?.apiRoute || '', trafficParameter?.id || '', body);

  const getPayload = (values: TrafficParameter): IApiPayload<TrafficParameter> => ({
    data: {
      ...values,
      project_id: projectId,
      id: trafficParameter?.id
    } as TrafficParameter,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<TrafficParameter>, payload: IApiPayload<TrafficParameter>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.traffic-parameter.${isEdit ? `edit-traffic-parameter` : `create-traffic-parameter`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.traffic-parameter.${isEdit ? `edit-traffic-parameter` : `create-traffic-parameter`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...trafficParameter
          }}
          createActionFunc={isEdit ? editTrafficParameter : createTrafficParameter}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TrafficParameter>) => {
            return <TrafficParameterForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TrafficParameterDrawer;
