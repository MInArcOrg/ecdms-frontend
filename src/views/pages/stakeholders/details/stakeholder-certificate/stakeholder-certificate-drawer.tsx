import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderCertificateForm from './stakeholder-certificate-form';

import { useState } from 'react';
import stakeholderCertificateApiService from 'src/services/stakeholder/stakeholder-certificate-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderCertificate } from 'src/types/stakeholder/stakeholder-certificate';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';

interface StakeholderCertificateDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderCertificate: StakeholderCertificate;
  stakeholderId: string;
}

const StakeholderCertificateDrawer = (props: StakeholderCertificateDrawerType) => {
  const { open, toggle, refetch, stakeholderCertificate, stakeholderId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(stakeholderCertificate?.id);

  const createStakeholderCertificate = async (body: IApiPayload<StakeholderCertificate>) => stakeholderCertificateApiService.create(body);

  const editStakeholderCertificate = async (body: IApiPayload<StakeholderCertificate>) =>
    stakeholderCertificateApiService.update(stakeholderCertificate?.id || '', body);

  const getPayload = (values: StakeholderCertificate) => ({
    data: {
      ...values,
      id: stakeholderCertificate?.id,
      stakeholder_id: stakeholderId,
      expiry_date: convertDateToLocaleDate(values?.expiry_date),
      date_of_issue: convertDateToLocaleDate(values?.date_of_issue),
      initial_certificate_issue_date: convertDateToLocaleDate(values?.initial_certificate_issue_date)
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderCertificate>, payload: IApiPayload<StakeholderCertificate>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.extension_time, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-certificate.${isEdit ? `edit-stakeholder-certificate` : `create-stakeholder-certificate`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-certificate.title`} // Adjust the title key if necessary
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(stakeholderCertificate as StakeholderCertificate),
            expiry_date: formatInitialDateDate(stakeholderCertificate?.expiry_date),
            date_of_issue: formatInitialDateDate(stakeholderCertificate?.date_of_issue),
            initial_certificate_issue_date: formatInitialDateDate(stakeholderCertificate?.initial_certificate_issue_date)
          }}
          createActionFunc={isEdit ? editStakeholderCertificate : createStakeholderCertificate}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderCertificate>) => {
            return <StakeholderCertificateForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderCertificateDrawer;
