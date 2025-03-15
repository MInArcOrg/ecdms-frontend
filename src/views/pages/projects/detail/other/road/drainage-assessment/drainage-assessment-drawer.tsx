import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import DrainageAssessmentForm from './drainage-assessment-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DrainageAssessment } from 'src/types/project/other'; // Update import
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface DrainageAssessmentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  drainageAssessment: DrainageAssessment; // Changed from DrainageAssessment
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const DrainageAssessmentDrawer = (props: DrainageAssessmentDrawerType) => {
  const { open, toggle, refetch, drainageAssessment, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(drainageAssessment?.id);

  const createDrainageAssessment = async (body: IApiPayload<DrainageAssessment>) =>
    projectOtherApiSecondService<DrainageAssessment>().create(otherSubMenu?.apiRoute || '', body);

  const editDrainageAssessment = async (body: IApiPayload<DrainageAssessment>) =>
    projectOtherApiSecondService<DrainageAssessment>().update(otherSubMenu?.apiRoute || '', drainageAssessment?.id || '', body);

  const getPayload = (values: DrainageAssessment) => ({
    data: {
      project_id: projectId,
      road_segment: values.road_segment,
      drainage_type_id: values.drainage_type_id,
      drainage_condition_id: values.drainage_condition_id,
      remark: values.remark,
      id: drainageAssessment?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<DrainageAssessment>, payload: IApiPayload<DrainageAssessment>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.drainageAssessment, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.drainage-assessment.${isEdit ? `edit-drainage-assessment` : `create-drainage-assessment`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.drainage-assessment.${isEdit ? `edit-drainage-assessment` : `create-drainage-assessment`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...drainageAssessment
          }}
          createActionFunc={isEdit ? editDrainageAssessment : createDrainageAssessment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DrainageAssessment>) => {
            return <DrainageAssessmentForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DrainageAssessmentDrawer;
