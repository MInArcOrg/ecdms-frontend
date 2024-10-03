import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderContactPersonForm from './stakeholder-contact-person-form';

import { useState } from 'react';
import stakeholderContactPersonApiService from 'src/services/stakeholder/stakeholder-contact-person-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderContactPerson } from 'src/types/stakeholder/stakeholder-contact-person';

interface StakeholderContactPersonDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderContactPerson: StakeholderContactPerson;
  stakeholderId: string;
}

const StakeholderContactPersonDrawer = (props: StakeholderContactPersonDrawerType) => {
  const { open, toggle, refetch, stakeholderContactPerson, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(stakeholderContactPerson?.id);

  const createStakeholderContactPerson = async (body: IApiPayload<StakeholderContactPerson>) =>
    stakeholderContactPersonApiService.create(body);

  const editStakeholderContactPerson = async (body: IApiPayload<StakeholderContactPerson>) =>
    stakeholderContactPersonApiService.update(stakeholderContactPerson?.id || '', body);

  const getPayload = (values: StakeholderContactPerson) => ({
    data: {
      ...values,
      id: stakeholderContactPerson?.id,
      stakeholder_id: stakeholderId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderContactPerson>, payload: IApiPayload<StakeholderContactPerson>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-contact-person.${isEdit ? `edit-stakeholder-contact-person` : `create-stakeholder-contact-person`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-contact-person.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(stakeholderContactPerson as StakeholderContactPerson)
          }}
          createActionFunc={isEdit ? editStakeholderContactPerson : createStakeholderContactPerson}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderContactPerson>) => {
            return <StakeholderContactPersonForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderContactPersonDrawer;
