import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderPhoneForm from './stakeholder-phone-form';

import { useState } from 'react';
import stakeholderPhoneApiService from 'src/services/stakeholder/stakeholder-phone-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderPhone } from 'src/types/stakeholder';

interface StakeholderPhoneDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderPhone: StakeholderPhone;
  stakeholderId: string;
}

const StakeholderPhoneDrawer = (props: StakeholderPhoneDrawerType) => {
  const { open, toggle, refetch, stakeholderPhone, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(stakeholderPhone?.id);

  const createStakeholderPhone = async (body: IApiPayload<StakeholderPhone>) => stakeholderPhoneApiService.create(body);

  const editStakeholderPhone = async (body: IApiPayload<StakeholderPhone>) =>
    stakeholderPhoneApiService.update(stakeholderPhone?.id || '', body);

  const getPayload = (values: StakeholderPhone) => ({
    data: {
      ...values,
      id: stakeholderPhone?.id,
      stakeholder_id: stakeholderId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderPhone>, payload: IApiPayload<StakeholderPhone>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-phone.${isEdit ? `edit-stakeholder-phone` : `create-stakeholder-phone`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-phone.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(stakeholderPhone as StakeholderPhone)
          }}
          createActionFunc={isEdit ? editStakeholderPhone : createStakeholderPhone}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderPhone>) => {
            return <StakeholderPhoneForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderPhoneDrawer;
