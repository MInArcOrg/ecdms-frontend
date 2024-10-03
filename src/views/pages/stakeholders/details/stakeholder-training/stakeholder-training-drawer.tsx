import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderTrainingForm from './stakeholder-training-form';

import { useState } from 'react';
import stakeholderTrainingApiService from 'src/services/stakeholder/stakeholder-training-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderTraining } from 'src/types/stakeholder/stakeholder-training';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface StakeholderTrainingDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderTraining: StakeholderTraining;
  stakeholderId: string;
}

const StakeholderTrainingDrawer = (props: StakeholderTrainingDrawerType) => {
  const { open, toggle, refetch, stakeholderTraining, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(stakeholderTraining?.id);

  const createStakeholderTraining = async (body: IApiPayload<StakeholderTraining>) => stakeholderTrainingApiService.create(body);

  const editStakeholderTraining = async (body: IApiPayload<StakeholderTraining>) =>
    stakeholderTrainingApiService.update(stakeholderTraining?.id || '', body);

  const getPayload = (values: StakeholderTraining) => ({
    data: {
      ...values,
      id: stakeholderTraining?.id,
      stakeholder_id: stakeholderId,
      provision_date: convertDateToLocaleDate(values?.provision_date)
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderTraining>, payload: IApiPayload<StakeholderTraining>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-training.${isEdit ? `edit-stakeholder-training` : `create-stakeholder-training`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-training.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(stakeholderTraining as StakeholderTraining),
            provision_date: formatInitialDateDate(stakeholderTraining?.provision_date)
          }}
          createActionFunc={isEdit ? editStakeholderTraining : createStakeholderTraining}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderTraining>) => {
            return <StakeholderTrainingForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderTrainingDrawer;
