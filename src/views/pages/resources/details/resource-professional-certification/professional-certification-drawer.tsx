import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import CertificationForm from './professional-certification-form';
import professionalCertificationApiService from 'src/services/resource/professional-certification-service';
import type { ProfessionalCertification } from 'src/types/resource';
import type { IApiResponse } from 'src/types/requests';
import { uploadFile } from 'src/services/utils/file-utils';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { useState } from 'react';

interface CertificationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  certification: ProfessionalCertification;
  professionalId: string;
}

const CertificationDrawer = (props: CertificationDrawerType) => {
  const { open, toggle, refetch, certification, professionalId } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    certificate_title: yup.string().required('Certificate title is required'),
    certifying_body: yup.string().required('Certifying body is required'),
    certification_type: yup.string().required('Certification type is required'),
    issue_date: yup.date().required('Issue date is required')
  });

  const isEdit = Boolean(certification?.id);

  const createCertification = async (body: IApiPayload<ProfessionalCertification>): Promise<IApiResponse<ProfessionalCertification>> => {
    return professionalCertificationApiService.create(body);
  };

  const editCertification = async (body: IApiPayload<ProfessionalCertification>): Promise<IApiResponse<ProfessionalCertification>> => {
    return professionalCertificationApiService.update(certification?.id || '', body);
  };

  const getPayload = (values: ProfessionalCertification) => ({
    data: {
      ...values,
      id: certification?.id,
      professional_id: professionalId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ProfessionalCertification>, payload: IApiPayload<ProfessionalCertification>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing certification ID in response');
      const certificationId = response.payload.id;

      if (payload.files?.length) {
        await uploadFile(payload.files[0], uploadableResourceFileTypes.professionalCertification, certificationId, '', '');
      }
      refetch();
      handleClose();
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  return (
    <CustomSideDrawer title={`resources.professional.certification.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`resources.professional.certification.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(certification as ProfessionalCertification),
            issue_date: certification?.issue_date ? certification.issue_date.split('T')[0] : '',
            expire_date: certification?.expire_date ? certification.expire_date.split('T')[0] : ''
          }}
          createActionFunc={isEdit ? editCertification : createCertification}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProfessionalCertification>) => (
            <CertificationForm formik={formik} file={uploadableFile} onFileChange={setUploadableFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default CertificationDrawer;
