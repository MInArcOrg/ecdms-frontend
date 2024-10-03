import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StakeholderStudyFieldForm from './stakeholder-study-field-form';

import { useState } from 'react';
import stakeholderOtherApiService from 'src/services/stakeholder/stakeholder-other-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StakeholderStudyField } from 'src/types/stakeholder/other';

interface StakeholderStudyFieldDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  StakeholderStudyField: StakeholderStudyField;
  stakeholderId: string;
  model: string;
}

const StakeholderStudyFieldDrawer = (props: StakeholderStudyFieldDrawerType) => {
  const { open, toggle, refetch, StakeholderStudyField, stakeholderId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(StakeholderStudyField?.id);

  const createStakeholderStudyField = async (body: IApiPayload<StakeholderStudyField>) =>
    stakeholderOtherApiService<StakeholderStudyField>().create(model, body);

  const editStakeholderStudyField = async (body: IApiPayload<StakeholderStudyField>) =>
    stakeholderOtherApiService<StakeholderStudyField>().update(model, StakeholderStudyField?.id || '', body);

  const getPayload = (values: StakeholderStudyField) => {
    return {
      data: {
        ...values,
        id: StakeholderStudyField?.id,
        stakeholder_id: stakeholderId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StakeholderStudyField>, payload: IApiPayload<StakeholderStudyField>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableStakeholderFileTypes.other.stakeholderStudyField, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.other.stakeholder-study-field.${isEdit ? `edit-stakeholder-study-field` : `create-stakeholder-study-field`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.other.stakeholder-study-field.${isEdit ? `edit-stakeholder-study-field` : `create-stakeholder-study-field`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(StakeholderStudyField as StakeholderStudyField)
          }}
          createActionFunc={isEdit ? editStakeholderStudyField : createStakeholderStudyField}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderStudyField>) => {
            return <StakeholderStudyFieldForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StakeholderStudyFieldDrawer;
