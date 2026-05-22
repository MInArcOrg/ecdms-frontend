import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderCertificateForm from './stakeholder-certificate-form';

import { useState } from 'react';
import stakeholderCertificateApiService from 'src/services/stakeholder/stakeholder-certificate-service';
import { uploadableStakeholderFileTypes, uploadFile } from 'src/services/utils/file-utils';
import { StakeholderCertificate } from 'src/types/stakeholder/stakeholder-certificate';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import { futureDateRule, pastDateRule } from 'src/utils/validator/age';

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

  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    issue_date: pastDateRule().required('Issue date is required'),
    type: yup.string().required('Type is required'),
    scope: yup.string().required('Scope is required'),
    certifying_body: yup.string().required('Certifying body is required'),
    certification_number: yup.string().required('Certification number is required'),
    expire_date: futureDateRule().required('Expire date is required'),
    remark: yup.string().required('Remark is required'),
  });

  const isEdit = Boolean(stakeholderCertificate?.id);

  const createStakeholderCertificate = async (body: IApiPayload<StakeholderCertificate>) => stakeholderCertificateApiService.create(body);

  const editStakeholderCertificate = async (body: IApiPayload<StakeholderCertificate>) =>
    stakeholderCertificateApiService.update(stakeholderCertificate?.id || '', body);

  const getPayload = (values: StakeholderCertificate) => ({
    data: {
      ...values,
      id: stakeholderCertificate?.id,
      stakeholder_id: stakeholderId,
      certification_number: values.certification_number,
      issue_date: convertDateToLocaleDate(values.issue_date),
      expire_date: convertDateToLocaleDate(values.expire_date),
      type: values.type,
      scope: values.scope,
      certifying_body: values.certifying_body,
      remark: values.remark
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderCertificate>, payload: IApiPayload<StakeholderCertificate>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableStakeholderFileTypes.stakeholderCertificate, response.payload.id, '', '');
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
            ...stakeholderCertificate,
            certification_number: stakeholderCertificate?.certification_number || '',
            issue_date: formatInitialDateDate(stakeholderCertificate?.issue_date),
            expire_date: formatInitialDateDate(stakeholderCertificate?.expire_date),
            type: stakeholderCertificate?.type || '',
            scope: stakeholderCertificate?.scope || '',
            certifying_body: stakeholderCertificate?.certifying_body || '',
            remark: stakeholderCertificate?.remark || ''
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
