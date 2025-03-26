'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import WindResourceForm from './wind-resource-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { WindResource } from 'src/types/project/other';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface WindResourceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  windResource: WindResource;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const WindResourceDrawer = (props: WindResourceDrawerType) => {
  const { open, toggle, refetch, windResource, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    wind_speed_at_hub_height: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    weibull_shape_factor: yup.boolean().nullable(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(windResource?.id);

  const createWindResource = async (body: IApiPayload<WindResource>) =>
    projectOtherApiSecondService<WindResource>().create(otherSubMenu?.apiRoute || '', body);

  const editWindResource = async (body: IApiPayload<WindResource>) =>
    projectOtherApiSecondService<WindResource>().update(otherSubMenu?.apiRoute || '', windResource?.id || '', body);

  const getPayload = (values: WindResource) => ({
    data: {
      project_id: projectId,
      wind_speed_at_hub_height: values.wind_speed_at_hub_height,
      weibull_shape_factor: values.weibull_shape_factor,
      remark: values.remark,
      id: windResource?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<WindResource>, payload: IApiPayload<WindResource>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.windResource, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.wind-resource.${isEdit ? `edit-wind-resource` : `create-wind-resource`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.wind-resource.${isEdit ? `edit-wind-resource` : `create-wind-resource`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...windResource
          }}
          createActionFunc={isEdit ? editWindResource : createWindResource}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<WindResource>) => {
            return <WindResourceForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default WindResourceDrawer;
