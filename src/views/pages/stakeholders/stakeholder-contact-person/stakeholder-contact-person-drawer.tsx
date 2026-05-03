import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderContactPersonForm from './stakeholder-contact-person-form';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import stakeholderContactPersonApiService from 'src/services/stakeholder/stakeholder-contact-person-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderContactPerson } from 'src/types/stakeholder/stakeholder-contact-person';
import { nameRule } from 'src/utils/validator/name';
import { phoneRule } from 'src/utils/validator/phone';

interface StakeholderContactPersonDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  stakeholderContactPerson: StakeholderContactPerson;
  stakeholderId: string;
  typeTitle?: string;
}

const StakeholderContactPersonDrawer = (props: StakeholderContactPersonDrawerType) => {
  const { open, toggle, refetch, stakeholderContactPerson, stakeholderId, typeTitle } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const { t } = useTranslation();
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({
    first_name: nameRule.required('First name is required'),
    middle_name: nameRule.required('Middle name is required'),
    last_name: nameRule.required('Last name is required'),
    nationality: yup.string().required('Nationality is required'),
    gender: yup.string().max(255).required('Gender is required'),
    email: yup.string().max(255).email('Invalid email').required('Email is required'),
    phone_number: phoneRule.required('Phone number is required')
  });

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

  const formatTitleWithType = (key: string) => {
    const base = t(key);
    if (!typeTitle) return base;
    if (/\b(Stakeholder|Stakholder)\b/i.test(base)) {
      return base.replace(/\b(Stakeholder|Stakholder)\b/gi, typeTitle);
    }
    if (/^(Add|Edit)\b/i.test(base)) {
      return base.replace(/^(Add|Edit)\b/i, `$1 ${typeTitle}`);
    }
    return `${typeTitle} ${base}`;
  };

  const drawerTitleKey = `stakeholder.stakeholder-contact-person.${isEdit ? `edit-stakeholder-contact-person` : `create-stakeholder-contact-person`}`;
  const translatedDrawerTitle = formatTitleWithType(drawerTitleKey);

  return (
    <CustomSideDrawer
      title={drawerTitleKey}
      translatedTitle={typeTitle ? translatedDrawerTitle : undefined}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-contact-person.title`} // Adjust the title key if necessary
          translatedTitle={typeTitle ? formatTitleWithType('stakeholder.stakeholder-contact-person.title') : undefined}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...stakeholderContactPerson,
            nationality: stakeholderContactPerson?.nationality || ''
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
