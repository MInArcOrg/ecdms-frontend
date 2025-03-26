import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TrafficVolumeForm from './traffic-volume-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { TrafficVolume } from 'src/types/project/other';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface TrafficVolumeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  trafficVolume: TrafficVolume;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const TrafficVolumeDrawer = (props: TrafficVolumeDrawerType) => {
  const { open, toggle, refetch, trafficVolume, projectId, otherSubMenu } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    count_type_id: yup.string().required('Count type is required')
  });

  const isEdit = Boolean(trafficVolume?.id);

  const createTrafficVolume = async (body: IApiPayload<TrafficVolume>) =>
    projectOtherApiSecondService<TrafficVolume>().create(otherSubMenu?.apiRoute || '', body);

  const editTrafficVolume = async (body: IApiPayload<TrafficVolume>) =>
    projectOtherApiSecondService<TrafficVolume>().update(otherSubMenu?.apiRoute || '', trafficVolume?.id || '', body);

  const getPayload = (values: TrafficVolume): IApiPayload<TrafficVolume> => ({
    data: {
      ...values,
      project_id: projectId,
      id: trafficVolume?.id
    } as TrafficVolume,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<TrafficVolume>, payload: IApiPayload<TrafficVolume>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.traffic-volume.${isEdit ? `edit-traffic-volume` : `create-traffic-volume`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.traffic-volume.${isEdit ? `edit-traffic-volume` : `create-traffic-volume`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...trafficVolume
          }}
          createActionFunc={isEdit ? editTrafficVolume : createTrafficVolume}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TrafficVolume>) => {
            return <TrafficVolumeForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TrafficVolumeDrawer;
