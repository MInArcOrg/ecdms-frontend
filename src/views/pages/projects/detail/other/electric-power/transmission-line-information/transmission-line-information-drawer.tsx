import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';
import TransmissionLineInformationForm from './transmission-line-information-form';

import { useState } from 'react';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { TransmissionLineInformation } from 'src/types/project/other';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

interface TransmissionLineInformationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  transmissionLineInformation: TransmissionLineInformation;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const TransmissionLineInformationDrawer = (props: TransmissionLineInformationDrawerType) => {
  const { open, toggle, refetch, transmissionLineInformation, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    transmission_voltage: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    transmission_line_route_length: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    circuit_number: nullableIntegerSchema(),
    starting_point_northing: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    starting_point_easting: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    ending_point_northing: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    ending_point_easting: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    lifetime: nullableIntegerSchema(),
    remark: yup.string().nullable()
  });

  const isEdit = Boolean(transmissionLineInformation?.id);

  const initialValues = {
    ...transmissionLineInformation
  };

  const createTransmissionLineInformation = async (body: IApiPayload<TransmissionLineInformation>) =>
    projectOtherApiSecondService<TransmissionLineInformation>().create(otherSubMenu?.apiRoute || '', body);

  const editTransmissionLineInformation = async (body: IApiPayload<TransmissionLineInformation>) =>
    projectOtherApiSecondService<TransmissionLineInformation>().update(
      otherSubMenu?.apiRoute || '',
      transmissionLineInformation?.id || '',
      body
    );

  const getPayload = (values: TransmissionLineInformation) => {
    return {
      data: {
        ...values,
        id: transmissionLineInformation?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<TransmissionLineInformation>,
    payload: IApiPayload<TransmissionLineInformation>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.transmissionLineInformation, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.transmission-line-information.${
        isEdit ? `edit-transmission-line-information` : `create-transmission-line-information`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.transmission-line-information.${
            isEdit ? `edit-transmission-line-information` : `create-transmission-line-information`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={initialValues}
          createActionFunc={isEdit ? editTransmissionLineInformation : createTransmissionLineInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TransmissionLineInformation>) => {
            return <TransmissionLineInformationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default TransmissionLineInformationDrawer;
