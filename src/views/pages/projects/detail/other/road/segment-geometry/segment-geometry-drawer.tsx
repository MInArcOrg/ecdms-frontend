import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import SegmentGeometryForm from './segment-geometry-form';

import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { SegmentGeometry } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface SegmentGeometryDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  segmentGeometry: SegmentGeometry;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const SegmentGeometryDrawer = (props: SegmentGeometryDrawerType) => {
  const { open, toggle, refetch, segmentGeometry, projectId, otherSubMenu } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    cross_section_type_id: yup.string().required('Cross Section Type is required')
  });

  const isEdit = Boolean(segmentGeometry?.id);

  const createSegmentGeometry = async (body: IApiPayload<SegmentGeometry>) =>
    projectOtherApiSecondService<SegmentGeometry>().create(otherSubMenu?.apiRoute || '', body);

  const editSegmentGeometry = async (body: IApiPayload<SegmentGeometry>) =>
    projectOtherApiSecondService<SegmentGeometry>().update(otherSubMenu?.apiRoute || '', segmentGeometry?.id || '', body);

  const getPayload = (values: SegmentGeometry): IApiPayload<SegmentGeometry> => ({
    data: {
      ...values,
      project_id: projectId,
      id: segmentGeometry?.id
    } as SegmentGeometry,
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<SegmentGeometry>, payload: IApiPayload<SegmentGeometry>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.segment-geometry.${isEdit ? `edit-segment-geometry` : `create-segment-geometry`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.segment-geometry.${isEdit ? `edit-segment-geometry` : `create-segment-geometry`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...segmentGeometry
          }}
          createActionFunc={isEdit ? editSegmentGeometry : createSegmentGeometry}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SegmentGeometry>) => {
            return <SegmentGeometryForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SegmentGeometryDrawer;
