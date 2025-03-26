'use client';

import type { FormikProps } from 'formik';
import { useState } from 'react';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { RoadProjectQualityControl } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RoadProjectQualityControlForm from './road-project-quality-control-form';

interface RoadProjectQualityControlDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  roadProjectQualityControl: RoadProjectQualityControl;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const RoadProjectQualityControlDrawer = (props: RoadProjectQualityControlDrawerType) => {
  const { open, toggle, refetch, roadProjectQualityControl, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    project_phase_id: yup.string().required('Project phase is required'),
    inspection_type_id: yup.string().required('Inspection type is required')
  });

  const isEdit = Boolean(roadProjectQualityControl?.id);

  const createRoadProjectQualityControl = async (body: IApiPayload<RoadProjectQualityControl>) =>
    projectOtherApiSecondService<RoadProjectQualityControl>().create(otherSubMenu?.apiRoute || '', body);

  const editRoadProjectQualityControl = async (body: IApiPayload<RoadProjectQualityControl>) =>
    projectOtherApiSecondService<RoadProjectQualityControl>().update(
      otherSubMenu?.apiRoute || '',
      roadProjectQualityControl?.id || '',
      body
    );

  const getPayload = (values: RoadProjectQualityControl) => ({
    data: {
      project_id: projectId,
      name: values.name,
      project_phase_id: values.project_phase_id,
      inspection_type_id: values.inspection_type_id,
      defect_encountered: values.defect_encountered,
      remark: values.remark,
      id: roadProjectQualityControl?.id,
      created_at: roadProjectQualityControl?.created_at,
      updated_at: roadProjectQualityControl?.updated_at
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<RoadProjectQualityControl>, payload: IApiPayload<RoadProjectQualityControl>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.roadProjectQualityControl, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.road-project-quality-control.${
        isEdit ? 'edit-road-project-quality-control' : 'create-road-project-quality-control'
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-project-quality-control.${
            isEdit ? 'edit-road-project-quality-control' : 'create-road-project-quality-control'
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...roadProjectQualityControl
          }}
          createActionFunc={isEdit ? editRoadProjectQualityControl : createRoadProjectQualityControl}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadProjectQualityControl>) => {
            return <RoadProjectQualityControlForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadProjectQualityControlDrawer;
