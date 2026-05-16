import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import { limitNumberDigits, nullableNumberSchema, nullableIntegerSchema } from 'src/utils/validator/number';
import MobileNetworkComponentAgeForm from './mobile-network-component-age-form';

import { useState } from 'react';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { MobileNetworkComponentAge } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface MobileNetworkComponentAgeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  mobileNetworkComponentAge: MobileNetworkComponentAge;
  projectId: string;
  otherSubMenu?: DetailSubMenuItemChild;
}

const MobileNetworkComponentAgeDrawer = (props: MobileNetworkComponentAgeDrawerType) => {
  const { open, toggle, refetch, mobileNetworkComponentAge, projectId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    parent_id: yup.string().nullable(),
    mobile_network_id: yup.string().required('Mobile network ID is required'),
    cell: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    towers: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    antennas: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    base_stations: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    repeaters: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    switches: limitNumberDigits(nullableNumberSchema(), { maxIntegerDigits: 15, maxDecimalPlaces: 2 }),
    others: yup.string().nullable()
  });

  const isEdit = Boolean(mobileNetworkComponentAge?.id);

  const createMobileNetworkComponentAge = async (body: IApiPayload<MobileNetworkComponentAge>) =>
    projectOtherApiSecondService<MobileNetworkComponentAge>().create(otherSubMenu?.apiRoute || '', body);

  const editMobileNetworkComponentAge = async (body: IApiPayload<MobileNetworkComponentAge>) =>
    projectOtherApiSecondService<MobileNetworkComponentAge>().update(
      otherSubMenu?.apiRoute || '',
      mobileNetworkComponentAge?.id || '',
      body
    );

  const getPayload = (values: MobileNetworkComponentAge) => ({
    data: {
      ...values,
      project_id: projectId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<MobileNetworkComponentAge>, payload: IApiPayload<MobileNetworkComponentAge>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.mobileNetworkComponentAge, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.mobile-network-component-age.${
        isEdit ? `edit-mobile-network-component-age` : `create-mobile-network-component-age`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mobile-network-component-age.${
            isEdit ? `edit-mobile-network-component-age` : `create-mobile-network-component-age`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...mobileNetworkComponentAge
          }}
          createActionFunc={isEdit ? editMobileNetworkComponentAge : createMobileNetworkComponentAge}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MobileNetworkComponentAge>) => {
            return (
              <MobileNetworkComponentAgeForm projectId={projectId} file={uploadableFile} onFileChange={onFileChange} formik={formik} />
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MobileNetworkComponentAgeDrawer;
