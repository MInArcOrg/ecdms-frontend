import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StudyFieldForm from './study-field-form';

import { useState } from 'react';
import otherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StudyField } from 'src/types/project/other';

interface StudyFieldDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  studyField: StudyField;
  projectId: string;
  model: string;
}

const StudyFieldDrawer = (props: StudyFieldDrawerType) => {
  const { open, toggle, refetch, studyField, projectId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(studyField?.id);

  const createStudyField = async (body: IApiPayload<StudyField>) =>
    otherApiService<StudyField>().create(model, body);

  const editStudyField = async (body: IApiPayload<StudyField>) =>
    otherApiService<StudyField>().update(model, studyField?.id || '', body);

  const getPayload = (values: StudyField) => {
    return {
      data: {
        ...values,
        id: studyField?.id,
        project_id: projectId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StudyField>, payload: IApiPayload<StudyField>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.studyField, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`project.other.building-envelop-material.${isEdit ? `edit-building-envelop-material` : `create-building-envelop-material`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.building-envelop-material.${
            isEdit ? `edit-building-envelop-material` : `create-building-envelop-material`
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
