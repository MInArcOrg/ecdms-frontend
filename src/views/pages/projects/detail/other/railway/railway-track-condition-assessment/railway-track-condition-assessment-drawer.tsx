'use client';
import type { FormikProps } from 'formik';
import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayTrackConditionAssessment } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RailwayTrackConditionAssessmentForm from './railway-track-condition-assessment-form';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface RailwayTrackConditionAssessmentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  assessment: RailwayTrackConditionAssessment;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayTrackConditionAssessmentDrawer = (props: RailwayTrackConditionAssessmentDrawerType) => {
  const { open, toggle, refetch, assessment, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const isEdit = Boolean(assessment?.id);

  const createAssessment = async (body: IApiPayload<RailwayTrackConditionAssessment>) =>
    projectOtherApiSecondService<RailwayTrackConditionAssessment>().create(otherSubMenu?.apiRoute || '', body);

  const editAssessment = async (body: IApiPayload<RailwayTrackConditionAssessment>) =>
    projectOtherApiSecondService<RailwayTrackConditionAssessment>().update(otherSubMenu?.apiRoute || '', assessment?.id || '', body);

  const validationSchema = yup.object().shape({
    project_id: yup.string().required(),
    inspection_dates: yup.string().nullable(),
    track_condition_rating_id: yup.string().required(),
    observed_defects_id: yup.string().required(),
    track_settlement_irregularities: yup.string().nullable(),
    remark: yup.string().nullable()
  });

  const getPayload = (values: RailwayTrackConditionAssessment) => ({
    data: {
      project_id: projectId,
      inspection_dates: convertDateToLocaleDate(values.inspection_dates),
      track_condition_rating_id: values.track_condition_rating_id,
      observed_defects_id: values.observed_defects_id,
      track_settlement_irregularities: values.track_settlement_irregularities,
      remark: values.remark,
      id: assessment?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<RailwayTrackConditionAssessment>,
    payload: IApiPayload<RailwayTrackConditionAssessment>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.electric_grid_control_center_data, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.railway-track-condition-assessment.${isEdit ? `edit-railway-track-condition-assessment` : `create-railway-track-condition-assessment`
        }`}
      handleClose={handleClose}
      model="railwaytrackconditionassessment"
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.railway-track-condition-assessment.${isEdit ? `edit-railway-track-condition-assessment` : `create-railway-track-condition-assessment`
            }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...assessment,
            inspection_dates: formatInitialDateDate(assessment?.inspection_dates)

          }}
          createActionFunc={isEdit ? editAssessment : createAssessment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RailwayTrackConditionAssessment>) => {
            return <RailwayTrackConditionAssessmentForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RailwayTrackConditionAssessmentDrawer;
