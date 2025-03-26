'use client';

import type { FormikProps } from 'formik';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import TransmissionForm from './transmission-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import type { Transmission } from 'src/types/project/other';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';

interface TransmissionDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  transmission: Transmission;
  projectId: string;
  otherSubMenu?: OtherMenuRoute;
}

const TransmissionDrawer = (props: TransmissionDrawerType) => {
  const { open, toggle, refetch, transmission, projectId, otherSubMenu } = props;

  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    transmission_voltage: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    distance_to_substation: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    transmission_lines_number: yup
      .number()
      .nullable()
      .integer('Must be an integer')
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(transmission?.id);

  const createTransmission = async (body: IApiPayload<Transmission>) =>
    projectOtherApiSecondService<Transmission>().create(otherSubMenu?.apiRoute || '', body);

  const editTransmission = async (body: IApiPayload<Transmission>) =>
    projectOtherApiSecondService<Transmission>().update(otherSubMenu?.apiRoute || '', transmission?.id || '', body);

  const getPayload = (values: Transmission) => ({
    data: {
      project_id: projectId,
      transmission_voltage: values.transmission_voltage,
      distance_to_substation: values.distance_to_substation,
      transmission_lines_number: values.transmission_lines_number,
      remark: values.remark,
      id: transmission?.id
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<Transmission>, payload: IApiPayload<Transmission>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.transmission, response.payload.id, '', '');
    }

    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.transmission.${isEdit ? `edit-transmission` : `create-transmission`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.transmission.${isEdit ? `edit-transmission` : `create-transmission`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...transmission
          }}
          createActionFunc={isEdit ? editTransmission : createTransmission}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Transmission>) => {
            return <TransmissionForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TransmissionDrawer;
