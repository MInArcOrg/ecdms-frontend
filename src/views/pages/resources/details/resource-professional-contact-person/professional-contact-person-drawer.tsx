import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ProfessionalContactPersonForm from './professional-contact-person-form';
import professionalContactPersonApiService from 'src/services/resource/professional-contact-person-service';
import type { ProfessionalContactPerson } from 'src/types/resource/professional-contact-person';
import type { IApiResponse } from 'src/types/requests';

interface ProfessionalContactPersonDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  contactPerson: ProfessionalContactPerson | null;
  professionalId: string;
}

const ProfessionalContactPersonDrawer = (props: ProfessionalContactPersonDrawerType) => {
  const { open, toggle, refetch, contactPerson, professionalId } = props;

  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    national_id_no: yup.string().required('National ID number is required'),
    gender: yup.string().required('Gender is required'),
    phone_no: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  });

  const isEdit = Boolean(contactPerson?.id);

  const createContactPerson = async (body: IApiPayload<ProfessionalContactPerson>): Promise<IApiResponse<ProfessionalContactPerson>> => {
    return professionalContactPersonApiService.create(body);
  };

  const editContactPerson = async (body: IApiPayload<ProfessionalContactPerson>): Promise<IApiResponse<ProfessionalContactPerson>> => {
    return professionalContactPersonApiService.update(contactPerson?.id || '', body);
  };

  const getPayload = (values: ProfessionalContactPerson) => ({
    data: {
      ...values,
      id: contactPerson?.id,
      professional_id: professionalId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<ProfessionalContactPerson>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`resources.professional.contact-person.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`resources.professional.contact-person.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            first_name: '',
            middle_name: '',
            last_name: '',
            national_id_no: '',
            gender: '',
            phone_no: '',
            email: '',
            ...(contactPerson as ProfessionalContactPerson)
          }}
          createActionFunc={isEdit ? editContactPerson : createContactPerson}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {(formik: FormikProps<ProfessionalContactPerson>) => <ProfessionalContactPersonForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ProfessionalContactPersonDrawer;
