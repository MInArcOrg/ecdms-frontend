import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import EducationForm from './professional-education-form';
import professionalEducationApiService from 'src/services/resource/professional-education-service';
import type { ProfessionalEducation } from 'src/types/resource';
import type { StudyField } from 'src/types/general/general-master';
import type { IApiResponse } from 'src/types/requests';
import { uploadFile } from 'src/services/utils/file-utils';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { useState } from 'react';

interface EducationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  education: ProfessionalEducation;
  professionalId: string;
  studyFields: StudyField[];
}

const EducationDrawer = (props: EducationDrawerType) => {
  const { open, toggle, refetch, education, professionalId, studyFields } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    study_field: yup.string().required('Study field is required'),
    program_type: yup.string().required('Program type is required'),
    start_date: yup.date().required('Start date is required'),
    end_date: yup.date().required('End date is required'),
    gpa: yup.number().required('GPA is required').min(0, 'GPA must be positive').max(4, 'GPA must be 4 or less')
  });

  const isEdit = Boolean(education?.id);

  // Update the create/edit functions to use proper typing
  const createEducation = async (body: IApiPayload<ProfessionalEducation>): Promise<IApiResponse<ProfessionalEducation>> => {
    return professionalEducationApiService.create(body);
  };

  const editEducation = async (body: IApiPayload<ProfessionalEducation>): Promise<IApiResponse<ProfessionalEducation>> => {
    return professionalEducationApiService.update(education?.id || '', body);
  };

  const getPayload = (values: ProfessionalEducation) => ({
    data: {
      ...values,
      id: education?.id,
      professional_id: professionalId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ProfessionalEducation>, payload: IApiPayload<ProfessionalEducation>) => {
    try {
      console.log('API Response:', response); // Debug log
      if (!response.payload?.id) throw new Error('Missing education ID in response');

      const educationId = response.payload.id;

      if (payload.files?.length) {
        console.log('Uploading file for education ID:', educationId); // Debug log
        await uploadFile(payload.files[0], uploadableResourceFileTypes.professionalEducation, educationId, '', '');
      }
      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed:', error);
      // Handle error appropriately
    }
  };

  return (
    <CustomSideDrawer title={`resources.professional.education.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`resources.professional.education.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(education as ProfessionalEducation),
            start_date: education?.start_date ? education.start_date.split('T')[0] : '',
            end_date: education?.end_date ? education.end_date.split('T')[0] : ''
          }}
          createActionFunc={isEdit ? editEducation : createEducation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProfessionalEducation>) => (
            <EducationForm formik={formik} studyFields={studyFields || []} file={uploadableFile} onFileChange={setUploadableFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default EducationDrawer;
