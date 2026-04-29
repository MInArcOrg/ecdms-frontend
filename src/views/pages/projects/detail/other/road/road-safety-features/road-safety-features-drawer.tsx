'use client';

import type { FormikProps } from 'formik';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { ProjectRoadSafetyFeature } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RoadSafetyFeaturesForm from './road-safety-features-form';

interface RoadSafetyFeaturesDrawerProps {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  roadSafetyFeature: ProjectRoadSafetyFeature;
  projectId: string;
  typeId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RoadSafetyFeaturesDrawer = ({ open, toggle, refetch, roadSafetyFeature, projectId, typeId, otherSubMenu }: RoadSafetyFeaturesDrawerProps) => {
  const validationSchema = yup.object().shape({
    road_segment_id: yup.string().required('Road Segment is required'),
    road_safety_feature_id: yup.string().required('Road Safety Feature is required'),
    safety_feature_condition: yup.string().nullable(),
    description: yup.string().nullable()
  });

  const isEdit = Boolean(roadSafetyFeature?.id);

  const createRoadSafetyFeature = async (body: IApiPayload<ProjectRoadSafetyFeature>) =>
    projectOtherApiSecondService<ProjectRoadSafetyFeature>().create(otherSubMenu?.apiRoute || '', body);

  const editRoadSafetyFeature = async (body: IApiPayload<ProjectRoadSafetyFeature>) =>
    projectOtherApiSecondService<ProjectRoadSafetyFeature>().update(otherSubMenu?.apiRoute || '', roadSafetyFeature?.id || '', body);

  const getPayload = (values: ProjectRoadSafetyFeature): IApiPayload<ProjectRoadSafetyFeature> => ({
    data: {
      project_id: projectId,
      road_segment_id: values.road_segment_id,
      road_safety_feature_id: values.road_safety_feature_id,
      safety_feature_condition: values.safety_feature_condition,
      description: values.description,
      id: roadSafetyFeature?.id,
      created_at: roadSafetyFeature?.created_at,
      updated_at: roadSafetyFeature?.updated_at
    } as ProjectRoadSafetyFeature,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (_response: IApiResponse<ProjectRoadSafetyFeature>, _payload: IApiPayload<ProjectRoadSafetyFeature>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.road-safety-features.${isEdit ? 'edit-road-safety-feature' : 'create-road-safety-feature'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-safety-features.${isEdit ? 'edit-road-safety-feature' : 'create-road-safety-feature'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...roadSafetyFeature
          }}
          createActionFunc={isEdit ? editRoadSafetyFeature : createRoadSafetyFeature}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProjectRoadSafetyFeature>) => {
            return <RoadSafetyFeaturesForm formik={formik} typeId={typeId} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadSafetyFeaturesDrawer;
