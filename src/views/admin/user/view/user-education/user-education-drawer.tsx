import type { FormikProps } from 'formik';
import { useState } from 'react';
import userEducationApiService from 'src/services/admin/user-education-service';
import { uploadableUserFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { UserEducation } from 'src/types/admin/user';
import type { IApiPayload, IApiResponse } from 'src/types/requests';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import EducationForm from './user-education-form';

interface EducationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  education: UserEducation;
  userId: string;
}

const EducationDrawer = (props: EducationDrawerType) => {
  const { open, toggle, refetch, education, userId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    school_name: yup.string().max(255).nullable(),
    studylevel_id: yup.string().required('Education level is required'),
    education_level: yup.string().max(255).nullable(),
    study_field_id: yup.string().required('Study field is required'),
    program_type: yup.string().max(255).required('Program type is required'),
    start_date: yup.date().required('Start date is required'),
    end_date: yup.date().required('End date is required'),
    gpa: yup.number().required('GPA is required').min(0, 'GPA must be positive').max(4, 'GPA must be 4 or less')
  });

  const isEdit = Boolean(education?.id);

  // Update the create/edit functions to use proper typing
  const createEducation = async (body: IApiPayload<UserEducation>): Promise<IApiResponse<UserEducation>> => {
    return userEducationApiService.create(body);
  };

  const editEducation = async (body: IApiPayload<UserEducation>): Promise<IApiResponse<UserEducation>> => {
    return userEducationApiService.update(education?.id || '', body);
  };

  const getPayload = (values: UserEducation) => ({
    data: {
      ...values,
      id: education?.id,
      start_date: convertDateToLocaleDate(values.start_date),
      end_date: convertDateToLocaleDate(values.end_date),
      user_id: userId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<UserEducation>, payload: IApiPayload<UserEducation>) => {
    try {
      console.log('API Response:', response); // Debug log
      if (!response.payload?.id) throw new Error('Missing education ID in response');

      const educationId = response.payload.id;

      if (payload.files?.length) {
        console.log('Uploading file for education ID:', educationId); // Debug log
        await uploadFile(payload.files[0], uploadableUserFileTypes.userEducation, educationId, '', '');
      }
      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed:', error);
      // Handle error appropriately
    }
  };

  return (
    <CustomSideDrawer title={`department.user.education.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`department.user.education.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(education as UserEducation),
            studylevel_id: (education as any)?.studylevel_id || (education as any)?.studyField?.studylevel_id || '',
            start_date: formatInitialDateDate(education?.start_date),
            end_date: formatInitialDateDate(education?.end_date)
          }}
          createActionFunc={isEdit ? editEducation : createEducation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<UserEducation>) => <EducationForm formik={formik} file={uploadableFile} onFileChange={setUploadableFile} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default EducationDrawer;
