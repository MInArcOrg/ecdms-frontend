import { FormikProps } from 'formik';
import { useState } from 'react';
import { uploadFile } from 'src/services/utils/file-utils';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import AssessmentConditionMasterForm from './assessment-condition-master-form';
import { AssessmentCondition } from 'src/types/general/general-master';
import roadLengthTypeMasterService from 'src/services/general/project/assessment-condition-master-service';

interface AssessmentConditionMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  masterData: AssessmentCondition;
}

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const AssessmentConditionMasterDrawer = (props: AssessmentConditionMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props;

  const isEdit = Boolean(masterData?.id);
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);
  const onFileChange = (file: File | null) => {
    setUploadableFile(file);
  };
  const createAssessmentConditionMaster = async (body: IApiPayload<AssessmentCondition>) => {
    return await roadLengthTypeMasterService.create(body);
  };

  const editAssessmentConditionMaster = async (body: IApiPayload<AssessmentCondition>) => {
    return await roadLengthTypeMasterService.update(masterData?.id || '', body);
  };

  const getPayload = (values: AssessmentCondition) => {
    const payload = {
      data: {
        ...values,
        id: masterData?.id
      },
      files: uploadableFile ? [uploadableFile] : []
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<AssessmentCondition>, payload: IApiPayload<AssessmentCondition>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], `ASSESSMENT_CONDITION`, response.payload.id, '', '');
    }
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? 'edit-assessment-condition' : 'create-assessment-condition'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<AssessmentCondition>
          edit={isEdit}
          title="master-data.general-master.assessment-conditions"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editAssessmentConditionMaster : createAssessmentConditionMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<AssessmentCondition>) => {
            return (
              <>
                <AssessmentConditionMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as AssessmentCondition}
                />
              </>
            );
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default AssessmentConditionMasterDrawer;
