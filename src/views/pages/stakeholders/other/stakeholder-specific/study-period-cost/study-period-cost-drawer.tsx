import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import StudyPeriodCostForm from './study-period-cost-form';

import { useState } from 'react';
import stakeholderOtherApiService from 'src/services/stakeholder/stakeholder-other-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { StudyPeriodCost } from 'src/types/stakeholder/other';

interface StudyPeriodCostDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  studyPeriodCost: StudyPeriodCost;
  stakeholderId: string;
  model: string;
}

const StudyPeriodCostDrawer = (props: StudyPeriodCostDrawerType) => {
  const { open, toggle, refetch, studyPeriodCost, stakeholderId, model } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };

  const validationSchema = yup.object().shape({});

  const isEdit = Boolean(studyPeriodCost?.id);

  const createStudyPeriodCost = async (body: IApiPayload<StudyPeriodCost>) =>
    stakeholderOtherApiService<StudyPeriodCost>().create(model, body);

  const editStudyPeriodCost = async (body: IApiPayload<StudyPeriodCost>) =>
    stakeholderOtherApiService<StudyPeriodCost>().update(model, studyPeriodCost?.id || '', body);

  const getPayload = (values: StudyPeriodCost) => {
    return {
      data: {
        ...values,
        id: studyPeriodCost?.id,
        stakeholder_id: stakeholderId
      },
      files: uploadableFile ? [uploadableFile] : []
    };
  };

  const handleClose = () => toggle();

  const onActionSuccess = async (response: IApiResponse<StudyPeriodCost>, payload: IApiPayload<StudyPeriodCost>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableStakeholderFileTypes.other.studyPeriodCost, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.other.study-period-cost.${isEdit ? `edit-study-period-cost` : `create-study-period-cost`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.other.study-period-cost.${isEdit ? `edit-study-period-cost` : `create-study-period-cost`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(studyPeriodCost as StudyPeriodCost)
          }}
          createActionFunc={isEdit ? editStudyPeriodCost : createStudyPeriodCost}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StudyPeriodCost>) => {
            return <StudyPeriodCostForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default StudyPeriodCostDrawer;
