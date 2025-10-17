'use client';

import type { FormikProps } from 'formik';
import { useState } from 'react';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { RoadDrainage } from 'src/types/project/other';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import RoadDrainageForm from './road-drainage-form';

interface RoadDrainageDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  roadDrainage: RoadDrainage;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RoadDrainageDrawer = (props: RoadDrainageDrawerType) => {
  const { open, toggle, refetch, roadDrainage, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().max(255).required('Name is required'),
    current_condition_id: yup.string().length(36).required('Current condition is required'),
    length: yup.number().nullable().typeError('Length must be a number'),
    height: yup.number().nullable().typeError('Height must be a number'),
    width: yup.number().nullable().typeError('Width must be a number'),
    weight_limit: yup.number().nullable().typeError('Weight limit must be a number'),
    design_life_span: yup.number().integer().nullable().typeError('Design life span must be a number'),
    inspection_frequency: yup.number().integer().nullable().typeError('Inspection frequency must be a number'),
    construction_completion_year: yup.number().integer().nullable().typeError('Construction completion year must be a number'),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(roadDrainage?.id);

  const createRoadDrainage = async (body: IApiPayload<RoadDrainage>) =>
    projectOtherApiSecondService<RoadDrainage>().create(otherSubMenu?.apiRoute || '', body);

  const editRoadDrainage = async (body: IApiPayload<RoadDrainage>) =>
    projectOtherApiSecondService<RoadDrainage>().update(otherSubMenu?.apiRoute || '', roadDrainage?.id || '', body);

  const getPayload = (values: RoadDrainage) => ({
    data: {
      project_id: projectId,
      name: values.name,
      length: values.length,
      height: values.height,
      width: values.width,
      current_condition_id: values.current_condition_id,
      weight_limit: values.weight_limit,
      design_life_span: values.design_life_span,
      inspection_frequency: values.inspection_frequency,
      construction_completion_year: values.construction_completion_year,
      remark: values.remark,
      id: roadDrainage?.id,
      created_at: roadDrainage?.created_at,
      updated_at: roadDrainage?.updated_at
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<RoadDrainage>, payload: IApiPayload<RoadDrainage>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.roadDrainage, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.road-drainage.${isEdit ? 'edit-road-drainage' : 'create-road-drainage'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-drainage.${isEdit ? 'edit-road-drainage' : 'create-road-drainage'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...roadDrainage
          }}
          createActionFunc={isEdit ? editRoadDrainage : createRoadDrainage}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadDrainage>) => {
            return <RoadDrainageForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default RoadDrainageDrawer;
