import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderEmailForm from './stakeholder-email-form';

import { useState } from 'react';
import stakeholderEmailApiService from 'src/services/stakeholder/stakeholder-email-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderEmail } from 'src/types/stakeholder';

interface StakeholderEmailDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderEmail: StakeholderEmail;
  stakeholderId: string;
}

const StakeholderEmailDrawer = (props: StakeholderEmailDrawerType) => {
  const { open, toggle, refetch, stakeholderEmail, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(stakeholderEmail?.id);

  const createStakeholderEmail = async (body: IApiPayload<StakeholderEmail>) => stakeholderEmailApiService.create(body);

  const editStakeholderEmail = async (body: IApiPayload<StakeholderEmail>) =>
    stakeholderEmailApiService.update(stakeholderEmail?.id || '', body);

  const getPayload = (values: StakeholderEmail) => ({
    data: {
      ...values,
      id: stakeholderEmail?.id,
      stakeholder_id: stakeholderId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderEmail>, payload: IApiPayload<StakeholderEmail>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-email.${isEdit ? `edit-stakeholder-email` : `create-stakeholder-email`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-email.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(stakeholderEmail as StakeholderEmail)
          }}
          createActionFunc={isEdit ? editStakeholderEmail : createStakeholderEmail}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderEmail>) => {
            return <StakeholderEmailForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderEmailDrawer;
