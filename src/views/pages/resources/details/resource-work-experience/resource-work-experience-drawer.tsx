import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ExperienceForm from './resource-work-experience-form';
import professionalWorkExperienceApiService from 'src/services/resource/professional-work-experience-service';
import type { ProfessionalWorkExperience } from 'src/types/resource';
import type { IApiResponse } from 'src/types/requests';
import { uploadFile } from 'src/services/utils/file-utils';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { useState } from 'react';

interface ExperienceDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  experience: ProfessionalWorkExperience;
  professionalId: string;
}

const ExperienceDrawer = (props: ExperienceDrawerType) => {
  const { open, toggle, refetch, experience, professionalId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    company_name: yup.string().required('Company name is required'),
    position: yup.string().required('Position is required'),
    task_description: yup.string().required('Task description is required'),
    start_date: yup.date().required('Start date is required'),
    end_date: yup.date().required('End date is required')
  });

  const isEdit = Boolean(experience?.id);

  const createExperience = async (body: IApiPayload<ProfessionalWorkExperience>): Promise<IApiResponse<ProfessionalWorkExperience>> => {
    return professionalWorkExperienceApiService.create(body);
  };

  const editExperience = async (body: IApiPayload<ProfessionalWorkExperience>): Promise<IApiResponse<ProfessionalWorkExperience>> => {
    return professionalWorkExperienceApiService.update(experience?.id || '', body);
  };

  const getPayload = (values: ProfessionalWorkExperience) => ({
    data: {
      ...values,
      id: experience?.id,
      professional_id: professionalId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ProfessionalWorkExperience>, payload: IApiPayload<ProfessionalWorkExperience>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing experience ID in response');
      const experienceId = response.payload.id;

      if (payload.files?.length) {
        await uploadFile(payload.files[0], uploadableResourceFileTypes.professionalWorkExperience, experienceId, '', '');
      }
      refetch();
      handleClose();
    } catch (error) {}
  };

  return (
    <CustomSideDrawer title={`professional.work-experience.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`professional.work-experience.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(experience as ProfessionalWorkExperience),
            start_date: experience?.start_date ? experience.start_date.split('T')[0] : '',
            end_date: experience?.end_date ? experience.end_date.split('T')[0] : ''
          }}
          createActionFunc={isEdit ? editExperience : createExperience}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProfessionalWorkExperience>) => (
            <ExperienceForm formik={formik} file={uploadableFile} onFileChange={setUploadableFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ExperienceDrawer;
