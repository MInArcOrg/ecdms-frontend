import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StudyFieldForm from './study-field-form';

import { useState } from 'react';
import stakeholderOtherApiService from 'src/services/stakeholder/stakeholder-other-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StudyField } from 'src/types/stakeholder/other';

interface StudyFieldDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  studyField: StudyField;
  stakeholderId: string;
  model: string;
}

const StudyFieldDrawer = (props: StudyFieldDrawerType) => {
  const { open, toggle, refetch, studyField, stakeholderId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(studyField?.id);

  const createStudyField = async (body: IApiPayload<StudyField>) =>
    stakeholderOtherApiService<StudyField>().create(model, body);

  const editStudyField = async (body: IApiPayload<StudyField>) =>
    stakeholderOtherApiService<StudyField>().update(model, studyField?.id || '', body);

  const getPayload = (values: StudyField) => {
    return {
      data: {
        ...values,
        id: studyField?.id,
        stakeholder_id: stakeholderId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StudyField>, payload: IApiPayload<StudyField>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableStakeholderFileTypes.other.studyField, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.other.study-field.${isEdit ? `edit-study-field` : `create-study-field`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.other.study-field.${
            isEdit ? `edit-study-field` : `create-study-field`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(studyField as StudyField)
          }}
          createActionFunc={isEdit ? editStudyField : createStudyField}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StudyField>) => {
            return <StudyFieldForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StudyFieldDrawer;
