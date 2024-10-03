import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderServiceForm from './stakeholder-service-form';

import { useState } from 'react';
import stakeholderOtherApiService from 'src/services/stakeholder/stakeholder-other-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderService } from 'src/types/stakeholder/other';

interface StakeholderServiceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderService: StakeholderService;
  stakeholderId: string;
  model: string;
}

const StakeholderServiceDrawer = (props: StakeholderServiceDrawerType) => {
  const { open, toggle, refetch, stakeholderService, stakeholderId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(stakeholderService?.id);

  const createStakeholderService = async (body: IApiPayload<StakeholderService>) =>
    stakeholderOtherApiService<StakeholderService>().create(model, body);

  const editStakeholderService = async (body: IApiPayload<StakeholderService>) =>
    stakeholderOtherApiService<StakeholderService>().update(model, stakeholderService?.id || '', body);

  const getPayload = (values: StakeholderService) => {
    return {
      data: {
        ...values,
        id: stakeholderService?.id,
        stakeholder_id: stakeholderId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderService>, payload: IApiPayload<StakeholderService>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableStakeholderFileTypes.other.stakeholderService, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.other.stakeholder-service.${isEdit ? `edit-stakeholder-service` : `create-stakeholder-service`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.other.stakeholder-service.${isEdit ? `edit-stakeholder-service` : `create-stakeholder-service`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(stakeholderService as StakeholderService)
          }}
          createActionFunc={isEdit ? editStakeholderService : createStakeholderService}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderService>) => {
            return <StakeholderServiceForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderServiceDrawer;
