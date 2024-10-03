import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderRegulationForm from './stakeholder-regulation-form';

import { useState } from 'react';
import stakeholderRegulationApiService from 'src/services/stakeholder/stakeholder-regulation-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderRegulation } from 'src/types/stakeholder/stakeholder-regulation';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface StakeholderRegulationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderRegulation: StakeholderRegulation;
  stakeholderId: string;
}

const StakeholderRegulationDrawer = (props: StakeholderRegulationDrawerType) => {
  const { open, toggle, refetch, stakeholderRegulation, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(stakeholderRegulation?.id);

  const createStakeholderRegulation = async (body: IApiPayload<StakeholderRegulation>) => stakeholderRegulationApiService.create(body);

  const editStakeholderRegulation = async (body: IApiPayload<StakeholderRegulation>) =>
    stakeholderRegulationApiService.update(stakeholderRegulation?.id || '', body);

  const getPayload = (values: StakeholderRegulation) => ({
    data: {
      ...values,
      id: stakeholderRegulation?.id,
      stakeholder_id: stakeholderId,
      effective_start_date: convertDateToLocaleDate(values?.effective_start_date),
      effective_end_date: convertDateToLocaleDate(values?.effective_end_date)
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderRegulation>, payload: IApiPayload<StakeholderRegulation>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-regulation.${isEdit ? `edit-stakeholder-regulation` : `create-stakeholder-regulation`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-regulation.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(stakeholderRegulation as StakeholderRegulation),
            effective_start_date: formatInitialDateDate(stakeholderRegulation?.effective_start_date),
            effective_end_date: formatInitialDateDate(stakeholderRegulation?.effective_end_date)
          }}
          createActionFunc={isEdit ? editStakeholderRegulation : createStakeholderRegulation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderRegulation>) => {
            return <StakeholderRegulationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderRegulationDrawer;
