import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderOperationLocationForm from './stakeholder-operation-location-form';

import { useState } from 'react';
import countriesList from 'src/constants/countries';
import stakeholderOperationLocationApiService from 'src/services/stakeholder/stakeholder-operation-location-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderOperationLocation } from 'src/types/stakeholder/stakeholder-operation-location';

interface StakeholderOperationLocationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderOperationLocation: StakeholderOperationLocation;
  stakeholderId: string;
}

const StakeholderOperationLocationDrawer = (props: StakeholderOperationLocationDrawerType) => {
  const { open, toggle, refetch, stakeholderOperationLocation, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(stakeholderOperationLocation?.id);

  const createStakeholderOperationLocation = async (body: IApiPayload<StakeholderOperationLocation>) =>
    stakeholderOperationLocationApiService.create(body);

  const editStakeholderOperationLocation = async (body: IApiPayload<StakeholderOperationLocation>) =>
    stakeholderOperationLocationApiService.update(stakeholderOperationLocation?.id || '', body);

  const getPayload = (values: StakeholderOperationLocation) => ({
    data: {
      ...values,
      id: stakeholderOperationLocation?.id,
      stakeholder_id: stakeholderId,
      country: typeof values.country === 'object' ? values.country.value : values.country
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (
    response: IApiResponse<StakeholderOperationLocation>,
    payload: IApiPayload<StakeholderOperationLocation>
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-operation-location.${
        isEdit ? `edit-stakeholder-operation-location` : `create-stakeholder-operation-location`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-operation-location.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(stakeholderOperationLocation as StakeholderOperationLocation),
            country: countriesList
              .map((country) => ({
                label: country.title,
                value: country.title
              }))
              .find((country) => country.value === stakeholderOperationLocation.country)
          }}
          createActionFunc={isEdit ? editStakeholderOperationLocation : createStakeholderOperationLocation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderOperationLocation>) => {
            return <StakeholderOperationLocationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderOperationLocationDrawer;
