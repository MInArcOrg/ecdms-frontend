import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import MembershipForm from './professional-membership-form';
import professionalMembershipApiService from 'src/services/resource/professional-membership-service';
import type { ProfessionalMembership } from 'src/types/resource';
import type { IApiResponse } from 'src/types/requests';
import { uploadFile } from 'src/services/utils/file-utils';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { useState } from 'react';
import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';
import { futureDateRule, pastDateRule } from 'src/utils/validator/age';

interface MembershipDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  membership: ProfessionalMembership;
  professionalId: string;
  otherSubMenu?: DetailSubMenuItem;
}

const MembershipDrawer = (props: MembershipDrawerType) => {
  const { open, toggle, refetch, membership, professionalId, otherSubMenu } = props;
  const [uploadableFile, setUploadableFile] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    association_name: yup.string().required('Association name is required'),
    membership_type: yup.string().required('Membership type is required'),
    description: yup.string().required('Description is required'),
    registration_date: pastDateRule().required('Registration date is required'),
    end_date: futureDateRule().required('End date is required')
  });

  const isEdit = Boolean(membership?.id);

  const createMembership = async (body: IApiPayload<ProfessionalMembership>): Promise<IApiResponse<ProfessionalMembership>> => {
    return professionalMembershipApiService.create(body);
  };

  const editMembership = async (body: IApiPayload<ProfessionalMembership>): Promise<IApiResponse<ProfessionalMembership>> => {
    return professionalMembershipApiService.update(membership?.id || '', body);
  };

  const getPayload = (values: ProfessionalMembership) => ({
    data: {
      ...values,
      id: membership?.id,
      professional_id: professionalId
    },
    files: uploadableFile ? [uploadableFile] : []
  });

  const handleClose = () => {
    toggle();
    setUploadableFile(null);
  };

  const onActionSuccess = async (response: IApiResponse<ProfessionalMembership>, payload: IApiPayload<ProfessionalMembership>) => {
    try {
      if (!response.payload?.id) throw new Error('Missing membership ID in response');
      const membershipId = response.payload.id;

      if (payload.files?.length) {
        await uploadFile(payload.files[0], otherSubMenu?.type?.toString() || '', membershipId, '', '');
      }
      refetch();
      handleClose();
    } catch (error) { }
  };

  return (
    <CustomSideDrawer
      title={`resources.professional.association-membership.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`resources.professional.association-membership.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(membership as ProfessionalMembership),
            registration_date: membership?.registration_date ? membership.registration_date.split('T')[0] : '',
            end_date: membership?.end_date ? membership.end_date.split('T')[0] : ''
          }}
          createActionFunc={isEdit ? editMembership : createMembership}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ProfessionalMembership>) => (
            <MembershipForm formik={formik} file={uploadableFile} onFileChange={setUploadableFile} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default MembershipDrawer;
